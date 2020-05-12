#!/usr/bin/env python3
from django.core.exceptions import ValidationError
from django import forms

from .models import Tweet


class TweetForm(forms.ModelForm):
    MAX_TWEET_LENGTH = 240

    class Meta:
        model = Tweet
        fields = ["content"]

    def clean_content(self):
        content = self.cleaned_data.get("content")
        if len(content) > self.MAX_TWEET_LENGTH:
            raise ValidationError("This Tweet is too long")
        return content
