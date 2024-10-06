from django.shortcuts import render
from django.contrib.auth.models import User, Group

from .serializers import UserSerializer, EmployeeSerializer
from .models import Employee
from .permissions import IsAdminOrRealtor

from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response

# Accepts get (list all users or all employees) and post(create 1 or more users) requests
class UserListCreate(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsAdminOrRealtor]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request, *args, **kwargs):
        # Admins can view all users
        queryset = self.get_queryset()
        serializer = UserSerializer(queryset, many=True)
        
        # Realtor can only see the users that are his employees
        if not request.user.is_superuser:
            queryset = Employee.objects.filter(realtor=request.user)
            serializer = EmployeeSerializer(queryset, many=True, context={'request': self.request})


        return Response(serializer.data)

    # Customize the create function for users, as realtors can create employee type users
    # and only the admins can create superusers.
    def create(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)

        # Check if the submitted data conforms to the User model format and only admins or realtors can access this view
        if serializer.is_valid() and request.user.has_perm("auth.realtor"):
            user_object = serializer.save()

            # Super user have all permissions, so make sure the user is a realtor
            # Admins can use the admin site to convert users manually
            if not request.user.is_superuser:
                user_object.groups.add(Group.objects.get(name="Employees"))# Give user employee privilidges
                # Create the associating Employee object to register the associated realtor
                employee_object = Employee(user=user_object, realtor=request.user)
                employee_object.save()
                user_object.save()# Addition to employee group needs to be saved

            return Response(data=UserSerializer(user_object).data)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Accepts get (retrieve),  patch/put (update) and delete (destroy) requests for a single user object
class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer
