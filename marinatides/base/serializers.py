from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied

from .models import Boat, Customer
from account.models import Employee
from account.serializers import EmployeeSerializer

class CustomerSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(many=True, read_only=True)# Many-to-many, i.e. all user that have acces tot this boat
    
    class Meta:
        model = Customer
        fields = ["pk", "users", "first_name", "last_name"]

class BoatSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(many=True, read_only=True)# Many-to-many, i.e. all user that have acces tot this boat
    customer = CustomerSerializer(many=False, read_only=True)# One-to-one, i.e. the customer assigned to this boat

    class Meta:
        model = Boat
        fields = ["pk", "name", "description", "users", "customer"]

class AddBoatToEmployeeSerializer(serializers.ModelSerializer):
    employees = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), many=True, write_only=True)

    # This serializer essentially updates the employee update, with the value
    def update(self, instance, validated_data, *args, **kwargs):
        employees = validated_data.pop("employees")
        request = self.context.get("request")

        for employee in employees:
            # Only add employee to boat instance if superuser or user is the realtor of employee
            if request.user.is_superuser or request.user.pk == employee.realtor.pk:
                instance.users.add(employee.user)

            # Not allowed to link to boats that do now belong to you
            else:
                raise PermissionDenied

        instance.save()
        return instance

    class Meta:
        model = Boat 
        fields = ["employees"]

class RemoveEmployeesFromBoatSerializer(serializers.ModelSerializer):

    employees = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), many=True, write_only=True)

    # This serializer essentially updates the employee update, with the value
    def update(self, instance, validated_data, *args, **kwargs):
        employees = validated_data.pop("employees")
        request = self.context.get("request")

        for employee in employees:
            # Only add employee to boat instance if superuser or user is the realtor of employee
            if request.user.is_superuser or request.user.pk == employee.realtor.pk:
                instance.users.remove(employee.user)

            # Not allowed to link to boats that do now belong to you
            else:
                raise PermissionDenied

        instance.save()
        return instance

    class Meta:
        model = Boat 
        fields = ["employees"]
