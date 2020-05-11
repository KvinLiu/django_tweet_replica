#!/usr/bin/env python3

from django.urls import path
from . import views

app_name = "tweets"

urlpatterns = [
    path("", views.home_view, name="homepage"),
    path("tweets/<int:tweet_id>", views.tweet_detail_view, name="detail"),
]
