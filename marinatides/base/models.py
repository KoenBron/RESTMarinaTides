from django.db import models

from django.contrib.auth.models import User

# Create your models here.
# Temporary Customer model
class Customer(models.Model):
    # All the users that have access to this customer
    users = models.ManyToManyField(User, related_name="customers", blank=True)

    # Customer metadat
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)

    def __str__(self):
        return self.first_name

# Temporary Boat model
class Boat(models.Model):
    # All the users that have access to this boat
    users = models.ManyToManyField(User, related_name="boats", blank=True)

    # Boat metadata
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True)

    # Link boat to one customer
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT, related_name="boats", null=True, blank=True)

    def __str__(self):
        return self.name

