from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    localtion = models.CharField(max_length=220, null=True, blank=True)
    bio = models.TextField(blank=True, null=True)
