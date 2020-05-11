#!/usr/bin/env python3

from django.urls import path
from . import views

app_name = "tweets"

urlpatterns = [path("", views.home_view, name="homepage")]
