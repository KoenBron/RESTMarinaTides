from account.permissions import IsAdminOrRealtor
from . import serializers
from .models import Boat, Customer
from account.models import Employee

from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed, NotFound, PermissionDenied, NotFound


# Create your views here.
class BoatListCreate(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Boat.objects.all()
    serializer_class = serializers.BoatSerializer

    # Sending all detail when listing is too much data, so the GetBoatSerializer retrieves only essential info
    def get_serializer_class(self):
        if self.request.method == "POST":
            return serializers.BoatSerializer
        return serializers.GetBoatSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Boat.objects.all()
        else:
            return Boat.objects.filter(users=self.request.user)

    # Employees and realtors can create boats, only 
    def create(self, request, *args, **kwargs):
        serializer = serializers.BoatSerializer(data=request.data)

        if serializer.is_valid(): 
            # Create the boat
            boat_object = serializer.save()
            # Superusers require no checking on the users associated with the boat
            if not request.user.is_superuser:
                boat_object.users.add(request.user)

                # If the user is an employee than also add the realtor associated with that employee
                if request.user.has_perm("auth.employee"):
                    try:
                        realtor = Employee.objects.filter(user=request.user).first().realtor

                    except:
                        raise AuthenticationFailed(detail="This account is not registered as a known employee account.")

                    boat_object.users.add(realtor)

                # Save updated object to the 
                boat_object.save()

            return Response(data=serializers.BoatSerializer(boat_object).data)

        # Bad request data
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BoatRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Boat.objects.all()
    serializer_class = serializers.BoatSerializer

    def get_queryset(self):
        return Boat.objects.filter(users=self.request.user)


class CustomerListCreate(generics.ListCreateAPIView):
    permission_classes =[permissions.IsAuthenticated]
    queryset = Customer.objects.all()
    serializer_class = serializers.CustomerSerializer

    # Sending all detail when listing is too much data, so the GetCustomerSerializer retrieves only essential info
    def get_serializer_class(self):
        if self.request.method == "POST": 
            return serializers.CustomerSerializer
        else:
            return serializers.GetCustomerSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Customer.objects.all()

        # Customers of the realtor are listed 
        else:
            filter_user = self.request.user
            # If user is an employee, list all the customers related to the realtor
            if self.request.user.has_perm("auth.employee"):
                filter_user = Employee.objects.filter(user=self.request.user).first().realtor

            return Customer.objects.filter(users=filter_user)

    def create(self, request, *args, **kwargs):
        serializer = serializers.CustomerSerializer(data=request.data)

        if serializer.is_valid():
            customer_object = serializer.save()

            if not request.user.is_superuser:
                customer_object.users.add(request.user)
                
                # If the user is an employee than also add the realtor
                if request.user.has_perm("auth.employee"):
                    try: 
                        realtor = Employee.objects.filter(user=request.user).first().realtor
                    except:
                        raise AuthenticationFailed(detail="This account is not registered as a known employee account.")
                    customer_object.users.add(realtor)

                # Save the object
            customer_object.save()
            return Response(data=serializers.CustomerSerializer(customer_object).data)
        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# View for retrieving, updating and destroying customers
class CustomerRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Customer.objects.all()
    serializer_class = serializers.CustomerSerializer

    def get_queryset(self):
        return Customer.objects.filter(users=self.request.user)

# View to, as a realtor add one of the realtor's employees to a boat so they can see and alter it 
class AddEmployeesToBoatView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsAdminOrRealtor]
    queryset = Boat.objects.all()
    serializer_class = serializers.AddBoatToEmployeeSerializer

    def get_queryset(self):
        return Boat.objects.filter(users=self.request.user)

    def get_object(self, request, pk):#TODO add safeguards to not update other users boats
        # Make sure the boat exists
        try:
            boat = Boat.objects.get(pk=pk)
        except Boat.DoesNotExist:
            raise NotFound

        # Make sure the user has access to this boat
        if boat.users.filter(pk=request.user.pk).exists():
            return boat
            
        else:
              print(f"User {request.user.pk} does not have access to boat {pk}.")
        raise PermissionDenied

    def get(self, request, pk, *args, **kwargs):
        boat = self.get_object(request, pk)
        return Response(serializers.BoatSerializer(boat).data)

    def put(self, request, pk, format=None):
        boat = self.get_object(request, pk)

        # Let the serializer update the boat, update function in serializer is called in save() method because boat instance is present
        serializer = serializers.AddBoatToEmployeeSerializer(boat, data=request.data, context={"request": request})

        if serializer.is_valid():
            boat_updated = serializer.save()
            return Response(serializers.BoatSerializer(boat_updated).data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RemoveEmployeesFromBoatView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsAdminOrRealtor]
    queryset = Boat.objects.all()
    serializer_class = serializers.RemoveEmployeesFromBoatSerializer

    def get_queryset(self):
        return Boat.objects.filter(users=self.request.user)

    def get_object(self, request, pk):#TODO add safeguards to not update other users boats
        # Make sure the boat exists
        try:
            boat = Boat.objects.get(pk=pk)
        except Boat.DoesNotExist:
            raise NotFound

        # Make sure the user has access to this boat
        if boat.users.filter(pk=request.user.pk).exists():
            return boat
            
        else:
            raise PermissionDenied

    def get(self, request, pk, *args, **kwargs):
        boat = self.get_object(request, pk)
        return Response(serializers.BoatSerializer(boat).data)

    def put(self, request, pk, format=None):
        boat = self.get_object(request, pk)

        # Let the serializer update the boat, update function in serializer is called in save() method because boat instance is present
        serializer = serializers.RemoveEmployeesFromBoatSerializer(boat, data=request.data, context={"request": request})

        if serializer.is_valid():
            boat_updated = serializer.save()
            return Response(serializers.BoatSerializer(boat_updated).data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LinkBoatToCustomer(APIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Boat.objects.all()
    serializer_class = serializers.LinkBoatToCustomerSerializer

    def get_object(self, request, pk):
        # Make sure the boat exists
        try:
            boat = Boat.objects.get(pk=pk)
        except Boat.DoesNotExist:
            raise NotFound

        # Make sure the user has access to this boat
        if boat.users.filter(pk=request.user.pk).exists():
            return boat
            
        else:
            raise PermissionDenied

    def put(self, request, pk, format=None):
        boat = self.get_object(request, pk)
        serializer = serializers.LinkBoatToCustomerSerializer(boat, data=request.data, context={"request": request})

        if serializer.is_valid():
            boat_updated = serializer.save()
            return Response(serializers.BoatSerializer(boat_updated).data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RemoveLinkBoatToCustomer(APIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Boat.objects.all()
    serializer_class = serializers.RemoveLinkBoatToCustomerSerializer

    def get_object(self, request, pk):
        # Make sure the boat exists
        try:
            boat = Boat.objects.get(pk=pk)
        except Boat.DoesNotExist:
            raise NotFound

        # Make sure the user has access to this boat
        if boat.users.filter(pk=request.user.pk).exists():
            return boat
            
        else:
            raise PermissionDenied

    def put(self, request, pk, format=None):
        boat = self.get_object(request, pk)
        serializer = serializers.RemoveLinkBoatToCustomerSerializer(boat, data=request.data, context={"request": request})

        if serializer.is_valid():
            boat_updated = serializer.save()
            return Response(serializers.BoatSerializer(boat_updated).data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AvailableCustomers(APIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Customer.objects.all()
    serializer_class = serializers.AvailableCustomerSerializer

    def get(self, request, format=None):
        if request.user.is_superuser:
            return Response(serializers.CustomerSerializer(Customer.objects.all(), many=True).data)
        
        else:
            filter_user = request.user# User to search available customers for

            # If employee, get all the customers of the realtor they are associated with
            if request.user.has_perm("auth.employee"):
                # Find the realtor objects and filter based on that
                try:
                    filter_user = Employee.objects.filter(user=request.user).first().realtor
                except:
                    raise AuthenticationFailed(detail="Medewerkeers account niet gevonden!")

            available_customers = Customer.objects.filter(users=filter_user)
            return Response(serializers.AvailableCustomerSerializer(available_customers, many=True).data)
