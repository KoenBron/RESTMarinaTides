from django.urls import path
from base import views as base_views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
     
    path("boats/", base_views.BoatListCreate.as_view(), name="boat-lc"),
    path("boat/<int:pk>/", base_views.BoatRetrieveUpdateDestroy.as_view(), name="boat-rud"),
    path("customers/", base_views.CustomerListCreate.as_view(), name="customer-lc"),
    path("customer/<int:pk>/", base_views.CustomerRetrieveUpdateDestroy.as_view(), name="customer-rud"),
    path("addboat/<int:pk>/", base_views.AddEmployeesToBoatView.as_view(), name="addemployeestoboat"),
   path("removeboat/<int:pk>/", base_views.RemoveEmployeesFromBoatView.as_view(), name="removeemployeesfromboat"),
    path("linkboat/<int:pk>/", base_views.LinkBoatToCustomer.as_view(), name="linkboat"),
    path("delinkboat/<int:pk>/", base_views.RemoveLinkBoatToCustomer.as_view(), name="delinkboat"),
    path("availablecustomers", base_views.AvailableCustomers.as_view(), name="availablecustomers"),
]

urlpatterns = format_suffix_patterns(urlpatterns)


