from django.conf import settings
from django.contrib.auth import get_user_model
from django.http import HttpResponse, Http404, JsonResponse
from django.utils.http import is_safe_url
from django.shortcuts import render, redirect

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import Profile

ALLOWED_HOSTS = settings.ALLOWED_HOSTS
User = get_user_model()


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_profile_detail_view(request, username):
    current_user = request.user
    to_follower_user = None
    return Response({}, status=200)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def user_follow_view(request, username):
    me = request.user
    other_user_qs = User.objects.filter(username=username)
    if me.username == username:
        my_followers = me.profile.followers.all()
        return Response({"count": my_followers.count()}, status=200)

    # profile = Profile.objects.filter(user__username=username).first()
    if not other_user_qs.exists():
        return Response({}, status=404)
    other = other_user_qs.first()
    profile = other.profile
    # data = request.data or {}
    data = {}
    try:
        data = request.data
    except:
        pass
    print(data)
    action = data.get("action")
    if action == "follow":
        profile.followers.add(me)
    elif action == "unfollow":
        profile.followers.remove(me)
    else:
        pass
    current_followers_qs = profile.followers.all()
    return Response({"count": current_followers_qs.count()}, status=200)
