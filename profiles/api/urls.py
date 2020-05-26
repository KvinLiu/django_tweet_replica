from django.urls import path
from .views import profile_detail_api_view

"""
CLIENT
Base ENDPOINT /api/profiles/
"""
app_name = "profile_api"

urlpatterns = [
    path("<str:username>/", profile_detail_api_view, name="detail"),
    path("<str:username>/follow", profile_detail_api_view, name="follow"),
]
