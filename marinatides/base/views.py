from account.permissions import IsAdminOrRealtor
from .serializers import AddBoatToEmployeeSerializer, BoatSerializer, CustomerSerializer, RemoveEmployeesFromBoatSerializer
from .models import Boat, Customer
from account.models import Employee

from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound, PermissionDenied, NotFound


# Create your views here.
class BoatListCreate(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Boat.objects.all()
    serializer_class = BoatSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Boat.objects.all()
        else:
            return Boat.objects.filter(users=self.request.user)

    # Employees and realtors can create boats, only 
    def create(self, request, *args, **kwargs):
        serializer = BoatSerializer(data=request.data)

        if serializer.is_valid(): 
            # Create the boat
            boat_object = serializer.save()
            boat_object.users.add(request.user)

            # If the user is an employee than also add the realtor associated with that employee
            if request.user.has_perm("auth.employee"):
                realtor = Employee.objects.filter(user=request.user).first().realtor
                boat_object.users.add(realtor)

            # Save updated object to the 
            boat_object.save()
            return Response(data=BoatSerializer(boat_object).data)

        # Bad request data
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BoatRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Boat.objects.all()
    serializer_class = BoatSerializer

    def get_queryset(self):
        return Boat.objects.filter(users=self.request.user)


class CustomerListCreate(generics.ListCreateAPIView):
    permission_classes =[permissions.IsAuthenticated]
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

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
        serializer = CustomerSerializer(data=request.data)

        if serializer.is_valid():
            customer_object = serializer.save()
            customer_object.users.add(request.user)
            
            # If the user is an employee than also add the realtor
            if request.user.has_perm("auth.employee"):
                realtor = Employee.objects.filter(user=request.user).first().realtor
                customer_object.users.add(realtor)

            # Save the object
            customer_object.save()
            return Response(data=CustomerSerializer(customer_object).data)
        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# View for retrieving, updating and destroying customers
class CustomerRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def get_queryset(self):
        return Customer.objects.filter(users=self.request.user)

# View to, as a realtor add one of the realtor's employees to a boat so they can see and alter it 
class AddEmployeesToBoatView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsAdminOrRealtor]
    queryset = Boat.objects.all()
    serializer_class = AddBoatToEmployeeSerializer

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
        return Response(BoatSerializer(boat).data)

    def put(self, request, pk, format=None):
        boat = self.get_object(request, pk)

        # Let the serializer update the boat, update function in serializer is called in save() method because boat instance is present
        serializer = AddBoatToEmployeeSerializer(boat, data=request.data, context={"request": request})

        if serializer.is_valid():
            boat_updated = serializer.save()
            return Response(BoatSerializer(boat_updated).data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RemoveEmployeesFromBoatView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsAdminOrRealtor]
    queryset = Boat.objects.all()
    serializer_class = RemoveEmployeesFromBoatSerializer

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
        return Response(BoatSerializer(boat).data)

    def put(self, request, pk, format=None):
        boat = self.get_object(request, pk)

        # Let the serializer update the boat, update function in serializer is called in save() method because boat instance is present
        serializer = RemoveEmployeesFromBoatSerializer(boat, data=request.data, context={"request": request})

        if serializer.is_valid():
            boat_updated = serializer.save()
            return Response(BoatSerializer(boat_updated).data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
















