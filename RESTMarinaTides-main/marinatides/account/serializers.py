from django.contrib.auth.models import User, Group
from rest_framework import serializers
from . import models

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["name"]

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ["pk", "username", "email", "password", "password2"]

    # Validate that the passwords are the same
    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError("Wachtwoorden komen niet overeen")
        return attrs
    
    # Use the create_user() function when creating a user
    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data["username"], password=validated_data["password"])
        return user

class EmployeeSerializer(serializers.ModelSerializer):
    user = serializers.HyperlinkedRelatedField(many=False, read_only=True, view_name="user-rud")
    realtor = serializers.HyperlinkedRelatedField(many=False, read_only=True, view_name="user-rud")
    class Meta:
        model = models.Employee
        fields = ["pk", "user", "realtor"]
