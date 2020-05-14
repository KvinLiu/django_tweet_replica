from django.contrib.auth import get_user_model
from django.test import TestCase

from rest_framework.test import APIClient

from .models import Tweet

# Create your tests here.
User = get_user_model()


class TweetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="kl", password="somepassword")
        self.user_two = User.objects.create_user(
            username="kl-1", password="somepassword"
        )
        Tweet.objects.create(content="my first tweet", user=self.user)
        Tweet.objects.create(content="my second tweet", user=self.user)
        Tweet.objects.create(content="my third tweet", user=self.user_two)
        self.current_count = Tweet.objects.all().count()

    def test_user_created(self):
        self.assertEqual(self.user.username, "kl")

    def test_tweet_created(self):
        tweet = Tweet.objects.create(content="my fourth tweet", user=self.user)
        self.assertEqual(tweet.id, 4)
        self.assertEqual(tweet.user, self.user)

    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password="somepassword")
        return client

    def test_api_login(self):
        client = self.get_client()
        response = client.get("/api/tweets/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_action_like(self):
        client = self.get_client()
        response = client.post("/api/tweets/action/", {"id": 1, "action": "like"})
        self.assertEqual(response.status_code, 200)
        like_count = response.json().get("likes")
        self.assertEqual(like_count, 1)

    def test_action_unlike(self):
        client = self.get_client()
        response = client.post("/api/tweets/action/", {"id": 2, "action": "like"})
        self.assertEqual(response.status_code, 200)
        response = client.post("/api/tweets/action/", {"id": 2, "action": "unlike"})
        like_count = response.json().get("likes")
        self.assertEqual(like_count, 0)

    def test_action_retweet(self):
        client = self.get_client()
        response = client.post("/api/tweets/action/", {"id": 3, "action": "retweet"})
        data = response.json()
        new_tweet_id = data.get("id")
        self.assertEqual(response.status_code, 201)
        self.assertNotEqual(new_tweet_id, 3)
        self.assertEqual(self.current_count + 1, new_tweet_id)

    def test_tweet_create_api_view(self):
        client = self.get_client()
        request_data = {"content": "my Test tweet"}
        response_data = client.post("/api/tweets/create/", request_data)
        self.assertEqual(response_data.status_code, 201)
        self.assertEqual(self.current_count + 1, response_data.json().get("id"))

    def test_tweet_detail_api_view(self):
        client = self.get_client()
        response = client.get("/api/tweets/1/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get("id"), 1)

    def test_tweet_delete_api_view(self):
        client = self.get_client()
        response = client.delete("/api/tweets/1/delete/")
        self.assertEqual(response.status_code, 200)
        response = client.delete("/api/tweets/1/delete/")
        self.assertEqual(response.status_code, 404)
        response_incorrect_owner = client.delete("/api/tweets/3/delete/")
        self.assertEqual(response_incorrect_owner.status_code, 401)
