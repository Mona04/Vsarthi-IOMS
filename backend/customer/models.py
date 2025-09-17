from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class AdminUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_superuser = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

class Customer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=10)
    address = models.TextField()
    isActive = models.BooleanField(default=True)

    def __str__(self):
        return self.name