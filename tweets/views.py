from django.shortcuts import render, redirect


def home_view(request, *args, **kwargs):
    # print(request.user)
    # return HttpResponse("<h1>This is home page</h1>")
    return render(request, "pages/home.html", context={}, status=200)


def tweets_list_view(request):
    return render(request, "tweets/list.html")


def tweets_deatail_view(request, tweet_id):
    return render(request, "tweets/detail.html", context={"tweet_id": tweet_id})


def tweets_profie_view(request, username):
    return render(
        request, "tweets/profile.html", context={"profile_username": username}
    )
