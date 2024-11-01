from django.db import models

from django.contrib.auth.models import User

# Create your models here.
# Temporary Customer model
class Customer(models.Model):
  
    LATENT_ACTIVE_CHOICES = [
        ('latent', 'Latent'),
        ('actief', 'Actief'),
    ]
    YES_NO_CHOICES = [
       ('ja', 'Ja'),
        ('nee', 'Nee'),
    ]
    CUSTOMER_STATUS_CHOICES = [
       ('latent', 'Latent'),
        ('potentiele_opdrachtgever', 'Potentiele-Opdrachtgever'),
       ('opdrachtgever', 'Opdrachtgever'),
       ('verkoper', 'Verkoper'),
       ('opzoek', 'Opzoek'),
       ('urgent', 'Urgent'), 
    ]

    # All the users that have access to this customer
    users = models.ManyToManyField(User, related_name="customers", blank=True)

    # Customer metadata
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    status = models.CharField(max_length=10, choices=LATENT_ACTIVE_CHOICES, default='latent')
    registration = models.CharField(max_length=30,blank=True, null=True) 
    salut = models.CharField(max_length=30,blank=True, null=True) 
    referencecode = models.CharField(max_length=30,blank=True, null=True)  
    linked_boat = models.CharField(max_length=30,blank=True, null=True)  #TODO: might need to adjust
    address = models.CharField(max_length=30,blank=True, null=True) 
    mobile_phone = models.CharField(max_length=30,blank=True, null=True) 
    landline_phone = models.CharField(max_length=30,blank=True, null=True)
    fax = models.CharField(max_length=30,blank=True, null=True)
    email = models.CharField(max_length=30,blank=True, null=True)
    newsletter_registration = models.CharField(max_length=20, choices=YES_NO_CHOICES, blank=True, null=True)
    language = models.CharField(max_length=20, blank=True, null=True)
    name_business = models.CharField(max_length=20, blank=True, null=True)
    address_business = models.CharField(max_length=20, blank=True, null=True)
    address_business = models.CharField(max_length=20, blank=True, null=True) 
    btw_id = models.CharField(max_length=20, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    from_reminder_date = models.DateField(blank=True, null=True)
    to_reminder_date = models.DateField(blank=True, null=True) #TODO: herhaald
    document = models.FileField(upload_to='documents/', blank=True, null=True)
    name_option = models.CharField(max_length=20, blank=True, null=True)
    option_list = models.CharField(max_length=30, choices=CUSTOMER_STATUS_CHOICES, blank=True, null=True)
    def __str__(self):
        return self.first_name

# Temporary Boat model
class Boat(models.Model):
    LATENT_ACTIVE_CHOICES = [
        ('latent', 'Latent'),
        ('actief', 'Actief'),
    ]
    
    YACHT_TYPE_CHOICES = [
        ('motor', 'Motor jacht'),
        ('zeil', 'Zeil jacht'),
        ('elektrisch', 'Elektrisch jacht'),
    ]
    
    MERK_CHOICES = [
        ('breedendam', 'Breedendam'),
        ('de_vries_len', 'De Vries Len'),
        ('grand_banks', 'Grand Banks'),
        ('linssen', 'Linssen'),
        ('mulder', 'Mulder'),
        ('sealine', 'Sealine'),
    ]

    GEREGISTREERD_CHOICES = [
        ('ja', 'Ja'),
        ('nee', 'Nee'),
    ]
    YES_NO_CHOICES = [
       ('ja', 'Ja'),
        ('nee', 'Nee'),
    ]

    CE_CHOICES = [
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C'),
        ('D', 'D'),
        ('vrijgesteld', 'Vrijgesteld'),
    ]

    BTW_STATUS_CHOICES = [
        ('BTW betaald', 'BTW betaald'),
        ('BTW niet betaald', 'BTW niet betaald'),
        ('BTW vrijgesteld', 'BTW vrijgesteld'),
        ('BTW onbekend', 'BTW onbekend'),
    ]

    JACHT_CATEGORIE_CHOICES = [
        ('elektrisch_jacht', 'Elektrisch Jacht'),
        ('motor_jacht', 'Motor Jacht'),
        ('zeil_jacht', 'Zeil Jacht'),
        ('overig', 'Overig'),
    ]

    HULL_MATERIAAL_CHOICES = [
        ('aluminium', 'Aluminium'),
        ('composiet', 'Composiet'),
        ('ferro_cement', 'Ferro cement'),
        ('hout', 'Hout'),
        ('polyester', 'Polyester'),
        ('pvc', 'PVC'),
        ('staal', 'Staal'),
        ('anders', 'Anders'),
    ]

    AANDRIJVING_CHOICES = [
        ('stern_drive', 'Stern-drive'),
        ('sail_drive', 'Sail-drive'),
        ('v_drive', 'V-drive'),
        ('jet_drive', 'Jet-drive'),
        ('shaft_drive', 'Shaft-drive'),
        ('surface_drive', 'Surface-drive'),
        ('pod_drive', 'Pod-drive'),
        ('overig', 'Overig'),
    ]

    # All the users that have access to this boat
    users = models.ManyToManyField(User, related_name="boats", blank=True)

    # Boat metadata
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True)

    # Extra metadata added
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    status = models.CharField(max_length=10, choices=LATENT_ACTIVE_CHOICES, default='latent')
    yacht_type = models.CharField(max_length=20, choices=YACHT_TYPE_CHOICES, default='motor')
    cause_sales =  models.CharField(max_length=30,blank=True, null=True) 
    # Input Elements
    crm_registration_name = models.CharField(max_length=120, blank=True, null=True)
    model_name = models.CharField(max_length=120, blank=True, null=True)
    
    merk = models.CharField(max_length=50, choices=MERK_CHOICES, blank=True, null=True)
    model = models.CharField(max_length=120, blank=True, null=True)
    werf = models.CharField(max_length=120, blank=True, null=True)
    
    registered_in_land_registry = models.CharField(max_length=10, choices=GEREGISTREERD_CHOICES, blank=True, null=True)
    win_code = models.CharField(max_length=120, blank=True, null=True)
    
    ce_rating = models.CharField(max_length=20, choices=CE_CHOICES, blank=True, null=True)
    construction_year = models.CharField(max_length=10, blank=True, null=True)
    
    vat_status = models.CharField(max_length=30, choices=BTW_STATUS_CHOICES, blank=True, null=True)
    yacht_category = models.CharField(max_length=30, choices=JACHT_CATEGORIE_CHOICES, blank=True, null=True)
    
    condition = models.CharField(max_length=30, blank=True, null=True)  
    loa = models.DecimalField(max_digits=10, decimal_places=6,  null=True, blank=True)
    lwl = models.DecimalField(max_digits=10, decimal_places=6,  null=True, blank=True)
    width = models.DecimalField(max_digits=10, decimal_places=6,  null=True, blank=True)
    depth = models.DecimalField(max_digits=10, decimal_places=6,  null=True, blank=True)
    height = models.DecimalField(max_digits=10,  decimal_places=6, null=True, blank=True)
    height_of_mast_windshield_down = models.DecimalField(max_digits=10, decimal_places=6,  null=True, blank=True)
    condition = models.CharField(max_length=30, blank=True, null=True)  
    latitude = models.DecimalField(max_digits=20, decimal_places=15, null=True, blank=True)
    longitude = models.DecimalField(max_digits=20, decimal_places=15, null=True, blank=True)
    # Additional Inputs
    construction_number = models.CharField(max_length=10, blank=True, null=True)
    hull_material = models.CharField(max_length=20, choices=HULL_MATERIAAL_CHOICES, blank=True, null=True)
    deck_material = models.CharField(max_length=120, blank=True, null=True)
    deck_construction = models.CharField(max_length=120, blank=True, null=True)
    deck_finish = models.CharField(max_length=120, blank=True, null=True)
    glazing = models.CharField(max_length=120, blank=True, null=True)
    water_displacement = models.CharField(max_length=50, blank=True, null=True)

    # Motor Details (Optional)
    motor_details = models.TextField(blank=True, null=True) 
    motor_controls = models.CharField(max_length=30,blank=True, null=True) 
    power = models.DecimalField(max_digits=10, decimal_places=6, null=True, blank=True)
    cruising_speed = models.DecimalField(max_digits=10, decimal_places=6, null=True, blank=True)
    liter_ph_ks = models.DecimalField(max_digits=10, decimal_places=6, null=True, blank=True)
    maximum_speed = models.DecimalField(max_digits=10, decimal_places=6, null=True, blank=True)
    liter_ph_ms = models.DecimalField(max_digits=10, decimal_places=6, null=True, blank=True)
    gearbox = models.CharField(max_length=30, blank=True, null=True)
    fuel_type = models.CharField(max_length=20, choices=[
        ('diesel', 'Diesel'),
        ('benzine', 'Benzine'),
        ('elektrisch', 'Elektrisch'),
        ('waterstof', 'Waterstof'),
        ('overig', 'Overig'),
    ], blank=True, null=True)
    fuel_tank = models.CharField(max_length=30,blank=True, null=True)
    operating_hours = models.DecimalField(max_digits=10, decimal_places=6, null=True, blank=True)
    propulsion = models.CharField(max_length=20, choices=AANDRIJVING_CHOICES, blank=True, null=True)
    propellor_type = models.CharField(max_length=30,blank=True, null=True)
    cooling = models.CharField(max_length=30,blank=True, null=True)
    propeller_shaft_lubrication = models.CharField(max_length=30,blank=True, null=True)
    emergency_engine = models.CharField(max_length=30,blank=True, null=True)
    bow_thruster = models.CharField(max_length=20, choices=YES_NO_CHOICES, blank=True, null=True)
    fence_screw = models.CharField(max_length=20, choices=YES_NO_CHOICES,
    blank=True, null=True)
    trim_system = models.CharField(max_length=30,blank=True, null=True)
    stabilizers = models.CharField(max_length=30,blank=True, null=True)
    masts = models.CharField(max_length=30,blank=True, null=True)
    verstaging = models.CharField(max_length=30,blank=True, null=True)
    number_of_sails = models.CharField(max_length=30,blank=True, null=True)
    sail_material = models.CharField(max_length=30,blank=True, null=True)
    genoa = models.CharField(max_length=30,blank=True, null=True)
    genoa_reef = models.CharField(max_length=30,blank=True, null=True)
    spinal_field = models.CharField(max_length=30,blank=True, null=True)
    trisail = models.CharField(max_length=30,blank=True, null=True)
    bezaan = models.CharField(max_length=30,blank=True, null=True)
    storm_breeding = models.CharField(max_length=30,blank=True, null=True)
    mainsail = models.CharField(max_length=30,blank=True, null=True)
    liating = models.CharField(max_length=30,blank=True, null=True)
    steering_position = models.CharField(max_length=30,blank=True, null=True)
    extra_steering_position = models.CharField(max_length=30,blank=True, null=True)
    compass = models.CharField(max_length=30,blank=True, null=True)
    log = models.CharField(max_length=30,blank=True, null=True)
    depth_gauge = models.CharField(max_length=30,blank=True, null=True)
    wind_gauge = models.CharField(max_length=30,blank=True, null=True)
    auto_pilot = models.CharField(max_length=30,blank=True, null=True)
    gps = models.CharField(max_length=30,blank=True, null=True)
    gps_plotter = models.CharField(max_length=30,blank=True, null=True)
    radar = models.CharField(max_length=30,blank=True, null=True)
    radar_detector = models.CharField(max_length=30,blank=True, null=True)
    radar_screen = models.CharField(max_length=30,blank=True, null=True)
    vhf = models.CharField(max_length=30,blank=True, null=True)
    ais = models.CharField(max_length=30,blank=True, null=True)
    stir_mounted_pointer = models.CharField(max_length=30,blank=True, null=True)
    speedometer = models.CharField(max_length=30,blank=True, null=True)
    interior_material = models.CharField(max_length=30,blank=True, null=True)
    cabins = models.CharField(max_length=30,blank=True, null=True)
    single_beds = models.CharField(max_length=30,blank=True, null=True)
    double_beds = models.CharField(max_length=30,blank=True, null=True)
    showers = models.CharField(max_length=30,blank=True, null=True)
    toilets = models.CharField(max_length=30,blank=True, null=True)
    bathing = models.CharField(max_length=30,blank=True, null=True)
    grey_water_pump = models.CharField(max_length=30,blank=True, null=True)
    grey_water_tank = models.CharField(max_length=30,blank=True, null=True)
    black_water_pump = models.CharField(max_length=30,blank=True, null=True)
    black_water_tank = models.CharField(max_length=30,blank=True, null=True)
    heating = models.CharField(max_length=30,blank=True, null=True)
    air_conditioning = models.CharField(max_length=30,blank=True, null=True)
    cudly_tube = models.CharField(max_length=3, choices=YES_NO_CHOICES, blank=True, null=True)
    washbasin = models.CharField(max_length=30,blank=True, null=True)
    water_pressure_pump = models.CharField(max_length=30,blank=True, null=True)
    water_maker = models.CharField(max_length=30,blank=True, null=True)
    hot_water_system = models.CharField(max_length=30,blank=True, null=True)
    drinking_water_tank = models.CharField(max_length=30,blank=True, null=True)
    filling_in_liters = models.CharField(max_length=30,blank=True, null=True)
    cooker = models.CharField(max_length=30,blank=True, null=True)
    oven = models.CharField(max_length=30,blank=True, null=True)
    microwave = models.CharField(max_length=30,blank=True, null=True)
    fridge = models.CharField(max_length=30,blank=True, null=True)
    freezer = models.CharField(max_length=30,blank=True, null=True)
    ice_cubes_machine = models.CharField(max_length=30,blank=True, null=True)
    wine_fridge = models.CharField(max_length=30,blank=True, null=True)
    dishwasher = models.CharField(max_length=30,blank=True, null=True)
    washing_machine = models.CharField(max_length=30,blank=True, null=True)
    dryer = models.CharField(max_length=30,blank=True, null=True)
    home_batteries = models.CharField(max_length=30,blank=True, null=True)
    start_up_batteries = models.CharField(max_length=30,blank=True, null=True)
    bow_thruster_battery = models.CharField(max_length=30,blank=True, null=True)
    bold_battery = models.CharField(max_length=30,blank=True, null=True)
    dc_system = models.CharField(max_length=30,blank=True, null=True)
    ac_system = models.CharField(max_length=30,blank=True, null=True)
    battery_charger = models.CharField(max_length=30,blank=True, null=True)
    inverter = models.CharField(max_length=30,blank=True, null=True)
    generator = models.CharField(max_length=30,blank=True, null=True)
    generator_hours = models.CharField(max_length=30,blank=True, null=True)
    lifeboat = models.CharField(max_length=30,blank=True, null=True)
    epirb = models.CharField(max_length=30,blank=True, null=True)
    mob_system = models.CharField(max_length=30,blank=True, null=True)
    fire_extinguisher = models.CharField(max_length=30,blank=True, null=True)
    engine_room_extinguishing_system = models.CharField(max_length=30,blank=True, null=True)
    bilge_pump = models.CharField(max_length=30,blank=True, null=True)
    high_water_alarm = models.CharField(max_length=30,blank=True, null=True)
    fire_alarm = models.CharField(max_length=30,blank=True, null=True)
    gas_alarm = models.CharField(max_length=30,blank=True, null=True)
    search_light = models.CharField(max_length=30,blank=True, null=True)
    anchor = models.CharField(max_length=30,blank=True, null=True)
    fenders = models.CharField(max_length=30,blank=True, null=True)
    gangway = models.CharField(max_length=30,blank=True, null=True)
    dinghy = models.CharField(max_length=30,blank=True, null=True)
    tube_cap = models.CharField(max_length=30,blank=True, null=True)
    bimini = models.CharField(max_length=30,blank=True, null=True)
    #TODO: photos
    cover_photo = models.ImageField(upload_to='photos/', blank=True, null=True)
    gallery_photo = models.ImageField(upload_to='photos/', blank=True, null=True)

    video_url = models.CharField(max_length=30,blank=True, null=True)
    # Link boat to one customer
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT, related_name="boats", null=True, blank=True)

    def __str__(self):
        return self.name

