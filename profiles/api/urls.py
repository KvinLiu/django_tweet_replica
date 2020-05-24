from django.urls import path
from .views import user_follow_view, profile_detail_api_view

"""
CLIENT
Base ENDPOINT /api/profiles/
"""
app_name = "profile_api"

urlpatterns = [
    path("<str:username>/", profile_detail_api_view, name="detail"),
    path("<str:username>/follow", user_follow_view, name="follow"),
]
