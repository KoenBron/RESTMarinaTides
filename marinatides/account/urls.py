from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path("", views.UserListCreate.as_view(), name="user-lc"),
    path("<int:pk>/", views.UserRetrieveUpdateDestroy.as_view(), name="user-rud"),
]

urlpatterns = format_suffix_patterns(urlpatterns)

