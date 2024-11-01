from django.db import models
from django.contrib.auth.models import User 

# Employee relation model as employee status is one-to-one with users
class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=False, primary_key=True, related_name="user")
    realtor = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, related_name="employees")


