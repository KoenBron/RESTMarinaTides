from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path("", views.UserListCreate.as_view(), name="user-lc"),
    path("<int:pk>/", views.UserRetrieveUpdateDestroy.as_view(), name="user-rud"),
    path("create_permissions/", views.CreatePermissionsView.as_view(), name="create_permissions")
]

urlpatterns = format_suffix_patterns(urlpatterns)

