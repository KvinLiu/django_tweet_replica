from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from django.utils.http import is_safe_url
from django.shortcuts import render, redirect

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..forms import TweetForm
from ..models import Tweet
from ..serializers import TweetSerializer, TweetActionSerializer, TweetCreateSerializer

import random

ALLOWED_HOSTS = settings.ALLOWED_HOSTS


@api_view(["POST"])  # http method the client == POST
@permission_classes([IsAuthenticated])
def tweet_create_view(request, *args, **kwargs):
    """
    REST API Create View -> DRF
    """
    serializer = TweetCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def tweet_feed_view(request, *args, **kwargs):
    user = request.user
    qs = Tweet.objects.feed(user)
    serializer = TweetSerializer(qs, many=True)
    return Response(serializer.data, status=200)


@api_view(["GET"])
def tweet_list_view(request, *args, **kwargs):
    qs = Tweet.objects.all()
    username = request.GET.get("username")  # ?username=justin
    if username != None:
        qs = qs.by_username(username)
    serializer = TweetSerializer(qs, many=True)
    return Response(serializer.data, status=200)


@api_view(["GET"])
def tweet_detail_view(request, tweet_id):
    qs = Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = TweetSerializer(obj)
    return Response(serializer.data)


@api_view(["DELETE", "POST"])
@permission_classes([IsAuthenticated])
def tweet_delete_view(request, tweet_id):
    qs = Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({"message": "You can not delete this tweet"}, status=401)
    obj = qs.first()
    obj.delete()
    return Response({"message": "Tweet Removed"}, status=200)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def tweet_action_view(request):
    """
    id is required
    Action options are: like, unlike, retweet
    """
    serializer = TweetActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        tweet_id = data.get("id")
        action = data.get("action")
        content = data.get("content")
        qs = Tweet.objects.filter(id=tweet_id)
        if not qs.exists():
            return Response({}, status=404)
        obj = qs.first()
        if action == "like":
            obj.likes.add(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "unlike":
            obj.likes.remove(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "retweet":
            new_tweet = Tweet.objects.create(
                parent=obj, user=request.user, content=content
            )
            serializer = TweetSerializer(new_tweet)
            return Response(serializer.data, status=201)
    return Response({"message": "Tweet Removed"}, status=200)
