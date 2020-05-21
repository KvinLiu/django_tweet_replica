from django.urls import path

from .views import profile_detail_view, profile_update_view

app_name = "profiles"

urlpatterns = [
    path("edit", profile_update_view, name="profile_edit"),
    path("<str:username>", profile_detail_view, name="profile_detail"),
]
