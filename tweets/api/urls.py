from django.urls import path
from .views import (
    tweet_detail_view,
    tweet_feed_view,
    tweet_list_view,
    tweet_create_view,
    tweet_delete_view,
    tweet_action_view,
)

"""
CLIENT
Base ENDPOINT /api/tweets/
"""
app_name = "tweets_api"

urlpatterns = [
    path("", tweet_list_view, name="tweets"),
    path("feed/", tweet_feed_view, name="feeds"),
    path("action/", tweet_action_view, name="action"),
    path("create/", tweet_create_view, name="create"),
    path("<int:tweet_id>/", tweet_detail_view, name="detail"),
    path("<int:tweet_id>/delete/", tweet_delete_view, name="delete"),
]
