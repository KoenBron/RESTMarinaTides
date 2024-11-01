from django.contrib import admin

# Register your models here.
from .models import Customer
from .models import Boat

admin.site.register(Boat)

admin.site.register(Customer)