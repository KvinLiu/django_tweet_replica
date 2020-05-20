#!/usr/bin/env python3

from django.urls import path

from .views import (
    tweets_list_view,
    tweets_deatail_view,
)

app_name = "tweets"

urlpatterns = [
    path("", tweets_list_view, name="list"),
    path("<int:tweet_id>", tweets_deatail_view, name="detail"),
]
