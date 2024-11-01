from rest_framework import permissions

class IsAdminOrRealtor(permissions.BasePermission):
    '''
    Grants access if the request user is a superuser.
    Grants access if the request user is a realtor.
    '''
    def has_permission(self, request, view):
        if request.user.is_superuser or request.user.has_perm("auth.realtor"):
            return True
        return False
