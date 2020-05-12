from django.http import HttpResponse, Http404, JsonResponse

from django.shortcuts import render

from .models import Tweet

import random


def home_view(request, *args, **kwargs):
    # return HttpResponse("<h1>This is home page</h1>")
    return render(request, "pages/home.html", context={}, status=200)


def tweet_list_view(request, *args, **kwargs):
    qs = Tweet.objects.all()
    tweets_list = [
        {"id": x.id, "content": x.content, "likes": random.randint(0, 10000)}
        for x in qs
    ]
    data = {"isUser": False, "response": tweets_list}
    return JsonResponse(data)


def tweet_detail_view(request, tweet_id):
    """
    REST API VIEW
    Consume by JavaScript or Java/Swift/IOS/Android
    return json data
    """
    data = {"id": tweet_id}
    status = 200
    try:
        obj = Tweet.objects.get(id=tweet_id)
        data["content"] = obj.content
    except:
        data["message"] = "Not Found"
        status = 404
    return JsonResponse(data, status=status)
