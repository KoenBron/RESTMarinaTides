from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied

from .models import Boat, Customer
from account.models import Employee
from account.serializers import EmployeeSerializer

class CustomerSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(many=True, read_only=True)# Many-to-many, i.e. all user that have acces tot this boat
    
    class Meta:
        model = Customer
        fields = ["pk", "users", "first_name", "last_name", "status", "registration", "salut", "referencecode",'linked_boat', 
'address', 
'mobile_phone', 
'landline_phone', 
'fax', 
'email', 
'newsletter_registration', 
'language', 
'name_business', 
'address_business', 
'btw_id', 
'notes', 
'from_reminder_date', 
'to_reminder_date', 
'document', 
'name_option', 
'option_list']

class BoatSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(many=True, read_only=True)# Many-to-many, i.e. all user that have acces tot this boat
    customer = CustomerSerializer(many=False, read_only=True)# One-to-one, i.e. the customer assigned to this boat

    class Meta:
        model = Boat
        fields = ["pk", "name", "description", "price", 'status', 
            'yacht_type', 'cause_sales',
            'crm_registration_name', 
            'model_name', 
            'merk', 
            'model', 
            'werf', 
            'registered_in_land_registry', 
            'win_code', 
            'ce_rating', 
            'construction_year', 
            'vat_status', 
            'yacht_category', 
            'condition', 
            'loa',
             'lwl',
             'width',
             'depth',
             'height',
              'height_of_mast_windshield_down',
             'latitude',
             'longitude',
            'construction_number', 
            'hull_material', 
            'deck_material', 
            'deck_construction', 
            'deck_finish', 
            'glazing', 
            'water_displacement', 
            'motor_details', 
             'motor_controls',
            'power',
            'cruising_speed',
            'liter_ph_ks',
            'maximum_speed',
    'liter_ph_ms',
     'gearbox',
            'fuel_type', 
            'fuel_tank',
    'operating_hours',
            'propulsion', 
            'propellor_type',
    'cooling',
    'propeller_shaft_lubrication',
    'emergency_engine',
    'bow_thruster',
    'fence_screw',
    'trim_system',
    'stabilizers',
    'masts',
    'verstaging',
    'number_of_sails',
    'sail_material',
    'genoa',
    'genoa_reef',
    'spinal_field',
    'trisail',
    'bezaan',
    'storm_breeding',
    'mainsail',
    'liating',
    'steering_position',
    'extra_steering_position',
    'compass',
    'log',
    'depth_gauge',
    'wind_gauge',
    'auto_pilot',
    'gps',
    'gps_plotter',
    'radar',
    'radar_detector',
    'radar_screen',
    'vhf',
    'ais',
    'stir_mounted_pointer',
    'speedometer',
    'interior_material',
    'cabins',
    'single_beds',
    'double_beds',
    'showers',
    'toilets',
    'bathing',
    'grey_water_pump',
    'grey_water_tank',
    'black_water_pump',
    'black_water_tank',
    'heating',
    'air_conditioning',
    'cudly_tube',
    'washbasin', 'water_pressure_pump',
    'water_maker',
    'hot_water_system',
    'drinking_water_tank',
    'cooker',
    'oven',
    'microwave',
    'fridge',
    'freezer',
    'ice_cubes_machine',
    'wine_fridge',
    'dishwasher',
    'washing_machine',
    'dryer',
    'home_batteries',
    'start_up_batteries',
    'bow_thruster_battery',
    'bold_battery',
    'dc_system',
    'ac_system',
    'battery_charger',
    'inverter',
    'generator',
    'generator_hours',
    'lifeboat',
    'epirb',
    'mob_system',
    'fire_extinguisher',
    'engine_room_extinguishing_system',
    'bilge_pump',
    'high_water_alarm',
    'fire_alarm',
    'gas_alarm',
    'search_light',
    'anchor',
    'fenders',
    'gangway',
    'dinghy',
    'tube_cap',
    'bimini', "cover_photo", "gallery_photo", "video_url",
 "users", "customer"]

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

class LinkBoatToCustomerSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all(), many=False, write_only=True)

    def update(self, instance, validated_data, *args, **kwargs):
        customer = validated_data.pop["customer"]
        request = self.context.get("request")

        # Update the customer related to the boat, but check if the boat is accessible to the request user
        # Admins can get around this restriction
        if request.user.is_superuser or customer.users.filter(pk=request.user.pk).exists():
            instance.customer = customer

        else:
            raise PermissionDenied

        instance.save()
        return instance


    class Meta:
        model = Boat
        fields = ["customer"]
         
class RemoveLinkBoatToCustomerSerializer(serializers.ModelSerializer):

    def update(self, instance, validated_data, *args, **kwargs):
        customer = validated_data.pop["customer"]
        request = self.context.get("request")

        # Update the customer related to the boat, but check if the boat is accessible to the request user
        # Admins can get around this restriction
        if request.user.is_superuser or customer.users.filter(pk=request.user.pk).exists():
            instance.customer = None

        else:
            raise PermissionDenied

        instance.save()
        return instance


    class Meta:
        model = Boat
        fields = ["customer"]


class AvailableCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ["pk", "first_name", "last_name"]

