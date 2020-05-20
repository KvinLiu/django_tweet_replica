from django.shortcuts import render, redirect


def tweets_list_view(request):
    return render(request, "tweets/list.html")


def tweets_deatail_view(request, tweet_id):
    return render(request, "tweets/detail.html", context={"tweet_id": tweet_id})
