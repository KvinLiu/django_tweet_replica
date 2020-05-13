#!/usr/bin/env python3

from django.urls import path
from .views import (
    home_view,
    tweet_detail_view,
    tweet_list_view,
    tweet_create_view,
    tweet_delete_view,
)

app_name = "tweets"

urlpatterns = [
    path("", home_view, name="homepage"),
    path("tweets", tweet_list_view, name="tweets"),
    path("tweets/<int:tweet_id>", tweet_detail_view, name="detail"),
    path("api/tweets/<int:tweet_id>/delete", tweet_delete_view, name="delete"),
    path("create-tweet", tweet_create_view, name="create_tweet"),
]
