from .serializers import BoatSerializer, CustomerSerializer
from .models import Boat, Customer
from account.models import Employee

from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

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
class AddUserToEmployeeView(APIView):
    def post(self, request, format=None):
        pass













