from django.http import HttpResponse, Http404, JsonResponse

from django.shortcuts import render

from .models import Tweet


def home_view(request, *args, **kwargs):
    return HttpResponse("<h1>This is home page</h1>")


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
