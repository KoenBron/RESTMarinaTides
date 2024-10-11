from rest_framework import serializers
from . import models

class CustomerSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(many=True, read_only=True)# Many-to-many, i.e. all user that have acces tot this boat
    
    class Meta:
        model = models.Customer
        fields = ["pk", "users", "first_name", "last_name"]

class BoatSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(many=True, read_only=True)# Many-to-many, i.e. all user that have acces tot this boat
    customer = CustomerSerializer(many=False, read_only=True)# One-to-one, i.e. the customer assigned to this boat

    class Meta:
        model = models.Boat
        fields = ["pk", "name", "description", "users", "customer"]

