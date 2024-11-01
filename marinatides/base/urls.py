from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path("boats/", views.BoatListCreate.as_view(), name="boat-lc"),
    path("boat/<int:pk>/", views.BoatRetrieveUpdateDestroy.as_view(), name="boat-rud"),
    path("customers/", views.CustomerListCreate.as_view(), name="customer-lc"),
    path("customer/<int:pk>/", views.CustomerRetrieveUpdateDestroy.as_view(), name="customer-rud"),
    path("addboat/<int:pk>/", views.AddEmployeesToBoatView.as_view(), name="addemployeestoboat"),
    path("removeboat/<int:pk>/", views.RemoveEmployeesFromBoatView.as_view(), name="removeemployeesfromboat"),
    path("linkboat/<int:pk>/", views.LinkBoatToCustomer.as_view(), name="linkboat"),
    path("delinkboat/<int:pk>/", views.RemoveLinkBoatToCustomer.as_view(), name="delinkboat"),
]

urlpatterns = format_suffix_patterns(urlpatterns)


