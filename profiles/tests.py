from django.test import TestCase
from django.contrib.auth import get_user_model

from .models import Profile

# Create your tests here.

User = get_user_model()


class ProfileTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="kl", password="somepassword")
        self.user_b = User.objects.create_user(username="kl-1", password="somepassword")

    def test_profile_created_via_signal(self):
        qs = Profile.objects.all()
        self.assertEqual(qs.count(), 2)

    def test_following(self):
        first = self.user
        second = self.user_b
        first.profile.followers.add(second)  # added a follower
        first_user_following_no_one = (
            first.following.all()
        )  # check new user is not following anyone
        second_user_following_whom = second.following.all()
        qs = second_user_following_whom.filter(
            user=first
        )  # from a user, check other user is being followed.
        self.assertFalse(first_user_following_no_one.exists())
        self.assertTrue(qs.exists())
