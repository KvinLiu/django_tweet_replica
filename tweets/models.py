from django.db import models
from django.conf import settings

import random

# Create your models here.

User = settings.AUTH_USER_MODEL


class TweetLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class Tweet(models.Model):
    # Maps to SQL data
    # id = models.AutoField(primary_key=True)
    parent = models.ForeignKey("self", null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="tweets"
    )  # many users can have many tweets
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to="images/", blank=True, null=True)
    likes = models.ManyToManyField(
        User, related_name="tweet_user", blank=True, through=TweetLike
    )
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-id"]

    @property
    def is_retweet(self):
        return self.parent != None

    def serialize(self):
        """
        feel free to delete
        """
        return {"id": self.id, "content": self.content, "likes": random.randint(0, 299)}

    # def __str__(self):
    #     return self.content
