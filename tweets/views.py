from django.http import HttpResponse, Http404
from django.shortcuts import render

from .models import Tweet


def home_view(request, *args, **kwargs):
    return HttpResponse("<h1>This is home page</h1>")


def tweet_detail_view(request, tweet_id):
    try:
        obj = Tweet.objects.get(id=tweet_id)
    except:
        raise Http404
    return HttpResponse(f"<h1>This is No. {tweet_id} -- {obj.content}</h1>")
