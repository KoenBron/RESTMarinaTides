"use client";
import Navbar from "../../components/navbar";
import styles from "../klant-toevoegen/page.module.css";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faGripLines,
  faChevronDown,
  faUpload,
  faPaperPlane,
  faEye,
  faFloppyDisk,
  faShip,
  faEuroSign,
} from "@fortawesome/free-solid-svg-icons";
import { Description, Field, Label, Select, Input } from "@headlessui/react";
import clsx from "clsx";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 52.0907, // Latitude for Utrecht, Netherlands
  lng: 5.1214,  // Longitude for Utrecht, Netherlands
};
export default function ListingPage() {
  const [activeSection, setActiveSection] = useState("");
  const sectionRefs = useRef([]);
  const sections = [
    { id: "section1", title: "Algemeen" },
    { id: "section2", title: "(Zeil)jacht" },
    { id: "section3", title: "Prijs (Zeil)jacht" },
    { id: "section4", title: "Basisgegevens" },
    { id: "section5", title: "Bouw van het jacht" },
    { id: "section6", title: "Motorisatie" },
    { id: "section7", title: "Tuigage" },
    { id: "section8", title: "Navigatie" },
    { id: "section9", title: "Accomodatie" },
    { id: "section10", title: "Elektra" },
    { id: "section11", title: "Uitrusting en veiligheid" },
    { id: "section12", title: "Afbeeldingen en Media (Zeil)jacht" },
  ];
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  //post api

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [yachtType, setYachtType] = useState("");
  const [crmRegistrationName, setCrmRegistrationName] = useState("");
  const [modelName, setModelName] = useState("");
  const [merk, setMerk] = useState("");
  const [werf, setWerf] = useState(null);
  const [registeredInLandRegistry, setRegisteredInLandRegistry] = useState(null);
  const [winCode, setWinCode] = useState(null);
  const [ceRating, setCeRating] = useState(null);
  const [constructionYear, setConstructionYear] = useState(null);
  const [vatStatus, setVatStatus] = useState(null);
  const [yachtCategory, setYachtCategory] = useState(null);
  const [condition, setCondition] = useState(null);
  const [loa, setLoa] = useState(null);
  const [lwl, setLwl] = useState(null);
  const [width, setWidth] = useState(null);
  const [depth, setDepth] = useState(null);
  const [height, setHeight] = useState(null);
  const [heightOfMast, setHeightOfMast] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [constructionNumber, setConstructionNumber] = useState(null);
  const [hullMaterial, setHullMaterial] = useState(null);
  const [deckMaterial, setDeckMaterial] = useState(null);
  const [deckConstruction, setDeckConstruction] = useState(null);
  const [deckFinish, setDeckFinish] = useState(null);
  const [glazing, setGlazing] = useState(null);
  const [waterDisplacement, setWaterDisplacement] = useState(null);
  const [motorDetails, setMotorDetails] = useState(null);
  const [motorControls, setMotorControls] = useState(null);
  const [power, setPower] = useState(null);
  const [cruisingSpeed, setCruisingSpeed] = useState(null);
  const [literPhKs, setLiterPhKs] = useState(null);
  const [maximumSpeed, setMaximumSpeed] = useState(null);
  const [literPhMs, setLiterPhMs] = useState(null);
  const [gearbox, setGearbox] = useState(null);
  const [fuelType, setFuelType] = useState(null);
  const [fuelTank, setFuelTank] = useState(null);
  const [operatingHours, setOperatingHours] = useState(null);
  const [propulsion, setPropulsion] = useState(null);
  const [propellorType, setPropellorType] = useState(null);
  const [cooling, setCooling] = useState(null);
  const [propellerShaftLubrication, setPropellerShaftLubrication] = useState(null);
  const [emergencyEngine, setEmergencyEngine] = useState(null);
  const [bowThruster, setBowThruster] = useState(null);
  const [fenceScrew, setFenceScrew] = useState(null);
  const [trimSystem, setTrimSystem] = useState(null);
  const [stabilizers, setStabilizers] = useState(null);
  const [masts, setMasts] = useState(null);
  const [verstaging, setVerstaging] = useState(null);
  const [numberOfSails, setNumberOfSails] = useState(null);
  const [sailMaterial, setSailMaterial] = useState(null);
  const [genoa, setGenoa] = useState(null);
  const [genoaReef, setGenoaReef] = useState(null);
  const [spinalField, setSpinalField] = useState(null);
  const [trisail, setTrisail] = useState(null);
  const [bezaan, setBezaan] = useState(null);
  const [stormBreeding, setStormBreeding] = useState(null);
  const [mainsail, setMainsail] = useState(null);
  const [liating, setLiating] = useState(null);
  const [steeringPosition, setSteeringPosition] = useState(null);
  const [extraSteeringPosition, setExtraSteeringPosition] = useState(null);
  const [compass, setCompass] = useState(null);
  const [log, setLog] = useState(null);
  const [depthGauge, setDepthGauge] = useState(null);
  const [windGauge, setWindGauge] = useState(null);
  const [autoPilot, setAutoPilot] = useState(null);
  const [gps, setGps] = useState(null);
  const [gpsPlotter, setGpsPlotter] = useState(null);
  const [radar, setRadar] = useState(null);
  const [radarDetector, setRadarDetector] = useState(null);
  const [radarScreen, setRadarScreen] = useState(null);
  const [vhf, setVhf] = useState(null);
  const [ais, setAis] = useState(null);
  const [stirMountedPointer, setStirMountedPointer] = useState(null);
  const [speedometer, setSpeedometer] = useState(null);
  const [interiorMaterial, setInteriorMaterial] = useState(null);
  const [cabins, setCabins] = useState(null);
  const [singleBeds, setSingleBeds] = useState(null);
  const [doubleBeds, setDoubleBeds] = useState(null);
  const [showers, setShowers] = useState(null);
  const [toilets, setToilets] = useState(null);
  const [bathing, setBathing] = useState(null);
  const [greyWaterPump, setGreyWaterPump] = useState(null);
  const [greyWaterTank, setGreyWaterTank] = useState(null);
  const [blackWaterPump, setBlackWaterPump] = useState(null);
  const [blackWaterTank, setBlackWaterTank] = useState(null);
  const [heating, setHeating] = useState(null);
  const [airConditioning, setAirConditioning] = useState(null);
  const [cudlyTube, setCudlyTube] = useState(null);
  const [washbasin, setWashbasin] = useState(null);
  const [waterPressurePump, setWaterPressurePump] = useState(null);
  const [waterMaker, setWaterMaker] = useState(null);
  const [hotWaterSystem, setHotWaterSystem] = useState(null);
  const [drinkingWaterTank, setDrinkingWaterTank] = useState(null);
  const [cooker, setCooker] = useState(null);
  const [oven, setOven] = useState(null);
  const [microwave, setMicrowave] = useState(null);
  const [fridge, setFridge] = useState(null);
  const [freezer, setFreezer] = useState(null);
  const [iceCubesMachine, setIceCubesMachine] = useState(null);
  const [wineFridge, setWineFridge] = useState(null);
  const [dishwasher, setDishwasher] = useState(null);
  const [washingMachine, setWashingMachine] = useState(null);
  const [dryer, setDryer] = useState(null);
  const [homeBatteries, setHomeBatteries] = useState(null);
  const [startUpBatteries, setStartUpBatteries] = useState(null);
  const [bowThrusterBattery, setBowThrusterBattery] = useState(null);
  const [boldBattery, setBoldBattery] = useState(null);
  const [dcSystem, setDcSystem] = useState(null);
  const [acSystem, setAcSystem] = useState(null);
  const [batteryCharger, setBatteryCharger] = useState(null);
  const [inverter, setInverter] = useState(null);
  const [generator, setGenerator] = useState(null);
  const [generatorHours, setGeneratorHours] = useState(null);
  const [lifeboat, setLifeboat] = useState(null);
  const [epirb, setEpirb] = useState(null);
  const [mobSystem, setMobSystem] = useState(null);
  const [fireExtinguisher, setFireExtinguisher] = useState(null);
  const [engineRoomExtinguishingSystem, setEngineRoomExtinguishingSystem] = useState(null);
  const [bilgePump, setBilgePump] = useState(null);
  const [highWaterAlarm, setHighWaterAlarm] = useState(null);
  const [fireAlarm, setFireAlarm] = useState(null);
  const [gasAlarm, setGasAlarm] = useState(null);
  const [searchLight, setSearchLight] = useState(null);
  const [anchor, setAnchor] = useState(null);
  const [fenders, setFenders] = useState(null);
  const [gangway, setGangway] = useState(null);
  const [dinghy, setDinghy] = useState(null);
  const [tubeCap, setTubeCap] = useState(null);
  const [bimini, setBimini] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [galleryPhoto, setGalleryPhoto] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [address, setAddress] = useState("");
  const [marker, setMarker] = useState(null);
  const handleMapClick = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();

    // Set new marker and fetch address
    setMarker({ lat: newLat, lng: newLng });
    getAddressFromLatLng(newLat, newLng);
  };
  const getAddressFromLatLng = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        const formattedAddress = data.results[0].formatted_address;

        setLatitude(lat);
        setLongitude(lng);
        setAddress(formattedAddress);
      } else {
        console.error("Geocoding API error:", data.status);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  useEffect(() => {
    // Fetch token from localStorage on the client side
    const fetchedToken = localStorage.getItem("token");
    setToken(fetchedToken);
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    if (token) {
      const fetchCustomers = async () => {
        try {
          const response = await fetch("http://127.0.0.1:8000/base/customers/", {
            headers: {
              'Authorization': `Token ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setCustomers(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Error fetching customers:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCustomers();
    } else {
      setLoading(false); // If token is not available, set loading to false
    }
  }, [token]); // Run this effect when token changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const boatData = {
      name,
      description,
      price,
      status,
      yacht_type: yachtType,
      crm_registration_name: crmRegistrationName,
      model_name: modelName,
      merk,
      werf,
      registered_in_land_registry: registeredInLandRegistry,
      win_code: winCode,
      ce_rating: ceRating,
      construction_year: constructionYear,
      vat_status: vatStatus,
      yacht_category: yachtCategory,
      condition,
      loa,
      lwl,
      width,
      depth,
      height,
      height_of_mast: heightOfMast,
      latitude,
      longitude,
      construction_number: constructionNumber,
      hull_material: hullMaterial,
      deck_material: deckMaterial,
      deck_construction: deckConstruction,
      deck_finish: deckFinish,
      glazing,
      water_displacement: waterDisplacement,
      motor_details: motorDetails,
      motor_controls: motorControls,
      power,
      cruising_speed: cruisingSpeed,
      liter_ph_ks: literPhKs,
      maximum_speed: maximumSpeed,
      liter_ph_ms: literPhMs,
      gearbox,
      fuel_type: fuelType,
      fuel_tank: fuelTank,
      operating_hours: operatingHours,
      propulsion,
      propellor_type: propellorType,
      cooling,
      propeller_shaft_lubrication: propellerShaftLubrication,
      emergency_engine: emergencyEngine,
      bow_thruster: bowThruster,
      fence_screw: fenceScrew,
      trim_system: trimSystem,
      stabilizers,
      masts,
      verstaging,
      number_of_sails: numberOfSails,
      sail_material: sailMaterial,
      genoa,
      genoa_reef: genoaReef,
      spinal_field: spinalField,
      trisail,
      bezaan,
      storm_breeding: stormBreeding,
      mainsail,
      liating,
      steering_position: steeringPosition,
      extra_steering_position: extraSteeringPosition,
      compass,
      log,
      depth_gauge: depthGauge,
      wind_gauge: windGauge,
      auto_pilot: autoPilot,
      gps,
      gps_plotter: gpsPlotter,
      radar,
      radar_detector: radarDetector,
      radar_screen: radarScreen,
      vhf,
      ais,
      stir_mounted_pointer: stirMountedPointer,
      speedometer,
      interior_material: interiorMaterial,
      cabins,
      single_beds: singleBeds,
      double_beds: doubleBeds,
      showers,
      toilets,
      bathing,
      grey_water_pump: greyWaterPump,
      grey_water_tank: greyWaterTank,
      black_water_pump: blackWaterPump,
      black_water_tank: blackWaterTank,
      heating,
      air_conditioning: airConditioning,
      cudly_tube: cudlyTube,
      washbasin,
      water_pressure_pump: waterPressurePump,
      water_maker: waterMaker,
      hot_water_system: hotWaterSystem,
      drinking_water_tank: drinkingWaterTank,
      cooker,
      oven,
      microwave,
      fridge,
      freezer,
      ice_cubes_machine: iceCubesMachine,
      wine_fridge: wineFridge,
      dishwasher,
      washing_machine: washingMachine,
      dryer,
      home_batteries: homeBatteries,
      start_up_batteries: startUpBatteries,
      bow_thruster_battery: bowThrusterBattery,
      bold_battery: boldBattery,
      dc_system: dcSystem,
      ac_system: acSystem,
      battery_charger: batteryCharger,
      inverter,
      generator,
      generator_hours: generatorHours,
      lifeboat,
      epirb,
      mob_system: mobSystem,
      fire_extinguisher: fireExtinguisher,
      engine_room_extinguishing_system: engineRoomExtinguishingSystem,
      bilge_pump: bilgePump,
      high_water_alarm: highWaterAlarm,
      fire_alarm: fireAlarm,
      gas_alarm: gasAlarm,
      search_light: searchLight,
      anchor,
      fenders,
      gangway,
      dinghy,
      tube_cap: tubeCap,
      bimini,
      cover_photo: coverPhoto,
      gallery_photo: galleryPhoto,
      video_url: videoUrl,
      customer: customer,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/base/boats/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`,
        },
        body: JSON.stringify(boatData),
      });

      if (!response.ok) {
        throw new Error("Failed to add boat");
      }

      const data = await response.json();
      console.log("Boat added successfully:", data);
    } catch (error) {
      console.error("Error adding boat:", error);
    }
  };
  const handleChange = (e) => {

    setCustomer(e.target.value);
    console.log("cusotmernew:" + customer);
  };

  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl font-bold text-center title-page">
            Uw vermeldingsgegevens
          </h1>
          <div className="flex flex-1">
            <nav
              style={{ top: "8em", marginLeft: "1.5em", color: "gray" }}
              className="w-1/4 sticky h-screen bg-transparent"
            >
              <ul className="list-disc text-grey space-y-4 p-4">
                {sections.map(({ id, title }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={`scroll-spy-link ${activeSection === id ? "text-black font-bold" : ""}`}
                    >
                      <span>{title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <form onSubmit={handleSubmit}>
              <div style={{ width: "150%" }} className=" space-y-13 p-8">

                {sections.map((section, index) => (

                  <div
                    key={section.id}
                    id={section.id}
                    ref={(el) => (sectionRefs.current[index] = el)}
                    className={`p-8 ${index % 2 === 0 ? styles.cardsSection : styles.cardsSection
                      }`}
                  >
                    {section.id === "section1" && (
                      <div>
                        <div className="flex items-left">
                          <FontAwesomeIcon
                            icon={faPencil}
                            className={`${styles.cardsSectionIcon}`}
                          />
                          <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                            {section.title}
                          </span>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2 mb-2 ${styles.cardsSectionTitle}`}>
                          Beschrijving
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                onChange={(e) => setDescription(e.target.value)}
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={description}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {section.id === "section2" && (
                      <div>

                        <div className="flex items-left">
                          <FontAwesomeIcon
                            icon={faShip}
                            className={`${styles.cardsSectionIcon}`}
                          />
                          <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                            {section.title}
                          </span>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Latent of Actief
                        </span>
                        <div className="flex items-left">
                          <FontAwesomeIcon className="mt-4 " icon={faGripLines} />
                          <div style={{ width: "100%" }} className="relative">
                            <Select value={status} onChange={(e) => setStatus(e.target.value)}
                              style={{ backgroundColor: "transparent" }}
                              className={clsx(
                                "mt-3 block w-full ml-2 appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                "*:text-black",
                              )}
                            >
                              <option value="placeholder">
                                Is de boot latent of actief?
                              </option>
                              <option value="latent">Latent</option>
                              <option value="actief">Actief</option>
                            </Select>
                          </div>
                          <FontAwesomeIcon
                            className="mt-4 mr-2"
                            icon={faChevronDown}
                          />
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Jacht type
                        </span>
                        <div className="flex items-left">
                          <FontAwesomeIcon className="mt-4 " icon={faGripLines} />
                          <div style={{ width: "100%" }} className="relative">
                            <Select value={yachtType} onChange={(e) => setYachtType(e.target.value)}
                              style={{ backgroundColor: "transparent" }}
                              className={clsx(
                                "mt-3 block w-full ml-2 appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                "*:text-black",
                              )}
                            >
                              <option value="placeholder">
                                Selecteer een optie
                              </option>
                              <option value="motor">Motor jacht</option>
                              <option value="zeil">Zeil jacht</option>
                              <option value="elektrisch">Elektrisch jacht</option>
                            </Select>
                          </div>
                          <FontAwesomeIcon
                            className="mt-4 mr-2"
                            icon={faChevronDown}
                          />
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Naam CRM registratie
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input value={crmRegistrationName} onChange={(e) => setCrmRegistrationName(e.target.value)}
                                placeholder="Relatie / Eigen bedrijf"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                        {/* <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Model / Type / Naam
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input value={modelName} onChange={(e) => setModelName(e.target.value)}
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                              />
                            </div>
                          </div>
                        </div>*/}
                      </div>
                    )}
                    {section.id === "section3" && (
                      <div>
                        <div className="flex items-left">
                          <FontAwesomeIcon
                            icon={faEuroSign}
                            className={`${styles.cardsEuroIcon}`}
                          />
                          <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                            {section.title}
                          </span>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Prijs
                        </span>

                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input onChange={(e) => setPrice(e.target.value)}
                                placeholder="Prijs jacht"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={price}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {section.id === "section4" && (
                      <div>
                        <div className="flex items-left">
                          <FontAwesomeIcon
                            icon={faPencil}
                            className={`${styles.cardsSectionIcon}`}
                          />
                          <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                            {section.title}
                          </span>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Specifieke Merk
                        </span>
                        <div className="flex items-left">
                          <FontAwesomeIcon className="mt-4 " icon={faGripLines} />
                          <div style={{ width: "100%" }} className="relative">
                            <Select value={merk}
                              style={{ backgroundColor: "transparent" }} onChange={(e) => setMerk(e.target.value)}
                              className={clsx(
                                "mt-3 block w-full ml-2 appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                "*:text-black",
                              )}
                            >
                              <option value="placeholder">
                                Selecteer een optie
                              </option>
                              <option value="breedendam">Breedendam</option>
                              <option value="de_vries_len">De Vries Len</option>
                              <option value="grand_banks">Grand Banks</option>
                              <option value="linssen">Linssen</option>
                              <option value="mulder">Mulder</option>
                              <option value="sealine">Sealine</option>
                            </Select>
                          </div>
                          <FontAwesomeIcon
                            className="mt-4 mr-2"
                            icon={faChevronDown}
                          />
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Model
                        </span>

                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={modelName} onChange={(e) => setModelName(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Naam
                        </span>

                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input onChange={(e) => setName(e.target.value)}
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={name}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Werf
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input value={werf} onChange={(e) => setWerf(e.target.value)}
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"

                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Geregistreerd in kadaster
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <FontAwesomeIcon className="mt-4 " icon={faGripLines} />
                          <div style={{ width: "100%" }} className="relative">
                            <Select value={registeredInLandRegistry} onChange={(e) => setRegisteredInLandRegistry(e.target.value)}
                              style={{ backgroundColor: "transparent" }}
                              className={clsx(
                                "mt-3 block w-full ml-2 appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                "*:text-black",
                              )}
                            >
                              <option value="placeholder">
                                Selecteer een optie
                              </option>
                              <option value="ja">Ja</option>
                              <option value="nee">Nee</option>
                            </Select>
                          </div>
                          <FontAwesomeIcon
                            className="mt-4 mr-2"
                            icon={faChevronDown}
                          />
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          WIN-code
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={winCode} onChange={(e) => setWinCode(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          CE
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <FontAwesomeIcon className="mt-4 " icon={faGripLines} />
                          <div style={{ width: "100%" }} className="relative">
                            <Select value={ceRating} onChange={(e) => setCeRating(e.target.value)}
                              style={{ backgroundColor: "transparent" }}
                              className={clsx(
                                "mt-3 block w-full ml-2 appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                "*:text-black",
                              )}
                            >
                              <option value="placeholder">
                                Selecteer een optie
                              </option>
                              <option value="a">A</option>
                              <option value="b">B</option>
                              <option value="c">C</option>
                              <option value="d">D</option>
                              <option value="vrijgesteld">Vrijgesteld</option>
                            </Select>
                          </div>
                          <FontAwesomeIcon
                            className="mt-4 mr-2"
                            icon={faChevronDown}
                          />
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Bouwjaar
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={constructionYear} onChange={(e) => setConstructionYear(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          BTW-Status
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <FontAwesomeIcon className="mt-4 " icon={faGripLines} />
                          <div style={{ width: "100%" }} className="relative">
                            <Select value={vatStatus} onChange={(e) => setVatStatus(e.target.value)}
                              style={{ backgroundColor: "transparent" }}
                              className={clsx(
                                "mt-3 block w-full ml-2 appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                "*:text-black",
                              )}
                            >
                              <option value="placeholder">
                                Selecteer een optie
                              </option>
                              <option value="betaald">BTW betaald</option>
                              <option value="nietbetaald">
                                BTW niet betaald
                              </option>
                              <option value="vrijgesteld">BTW vrijgesteld</option>
                              <option value="onbekend">BTW onbekend</option>
                            </Select>
                          </div>
                          <FontAwesomeIcon
                            className="mt-4 mr-2"
                            icon={faChevronDown}
                          />
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Jacht Categorie
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <FontAwesomeIcon className="mt-4 " icon={faGripLines} />
                          <div style={{ width: "100%" }} className="relative">
                            <Select value={yachtCategory} onChange={(e) => setYachtCategory(e.target.value)}
                              style={{ backgroundColor: "transparent" }}
                              className={clsx(
                                "mt-3 block w-full ml-2 appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                "*:text-black",
                              )}
                            >
                              <option value="placeholder">
                                Selecteer een optie
                              </option>
                              <option value="elektrisch">Elektrisch Jacht</option>
                              <option value="motor">Motor Jacht</option>
                              <option value="zeil">Zeil Jacht</option>
                              <option value="overig">Overig</option>
                            </Select>
                          </div>
                          <FontAwesomeIcon
                            className="mt-4 mr-2"
                            icon={faChevronDown}
                          />
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Conditie
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <FontAwesomeIcon className="mt-4 " icon={faGripLines} />
                          <div style={{ width: "100%" }} className="relative">
                            <Select value={condition} onChange={(e) => setCondition(e.target.value)}
                              style={{ backgroundColor: "transparent" }}
                              className={clsx(
                                "mt-3 block w-full ml-2 appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                "*:text-black",
                              )}
                            >
                              <option value="placeholder">
                                Selecteer een optie
                              </option>
                              <option value="nieuw">Nieuw</option>
                              <option value="gebruikt">Gebruikt</option>
                            </Select>
                          </div>
                          <FontAwesomeIcon
                            className="mt-4 mr-2"
                            icon={faChevronDown}
                          />
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          LOA (Length Over All)
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                placeholder="In te vullen in cm"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={loa} onChange={(e) => setLoa(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          LWL (Length Water Line)
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                placeholder="In te vullen in cm"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={lwl} onChange={(e) => setLwl(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Breedte
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                placeholder="in te vullen in cm"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={width} onChange={(e) => setWidth(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Diepgang
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                placeholder="In te vullen in cm"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={depth} onChange={(e) => setDepth(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Hoogte
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                placeholder="In te vullen in cm"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={height} onChange={(e) => setHeight(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Hoogte Mast / windshield down
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                placeholder="In te vullen in cm"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={heightOfMast} onChange={(e) => setHeightOfMast(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2 ${styles.cardsSectionTitle}`}>
                          Koppel een Klant
                        </span>
                        <span className="ml-2 text-gray-500">(optioneel)</span>
                        <div className="flex items-left">
                          <FontAwesomeIcon className="mt-4" icon={faGripLines} />
                          <div style={{ width: "100%" }} className="relative">
                            <Select
                              value={customer}
                              onChange={handleChange}
                              style={{ backgroundColor: "transparent" }}
                              className={clsx(
                                "mt-3 block w-full ml-2 appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                "*:text-black"
                              )}
                            >
                              <option value="" disabled>
                                Select a Customer
                              </option>
                              {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                  {customer.first_name} {customer.last_name}
                                </option>
                              ))}
                            </Select>
                          </div>
                          <FontAwesomeIcon className="mt-4 mr-2" icon={faChevronDown} />
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Locatie
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <span
                          style={{ float: "right" }}
                          className={`text-gray-500`}
                        >
                          {/* (U kunt maximaal 3 adressen invullen) */}
                        </span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                hidden
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={latitude} onChange={(e) => setLatitude(e.target.value)}
                              />
                              <Input
                                hidden
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={longitude} onChange={(e) => setLongitude(e.target.value)}
                              />
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Address will appear here when you click on the map"
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div style={{ height: "50vh" }} class="mb-4"><LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                              <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={10}
                                onClick={handleMapClick} // Add onClick handler here
                              >
                                {marker && <Marker position={marker} />} {/* Render single marker */}
                              </GoogleMap>
                            </LoadScript></div>
                          </div>
                        </div>
                      </div>
                    )}
                    {section.id === "section5" && (
                      <div>
                        <div className="flex items-left">
                          <FontAwesomeIcon
                            icon={faPencil}
                            className={`${styles.cardsSectionIcon}`}
                          />
                          <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                            {section.title}
                          </span>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Bouwnummer
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input value={constructionNumber} onChange={(e) => setConstructionNumber(e.target.value)}
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"

                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Hull materiaal
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <FontAwesomeIcon className="mt-4 " icon={faGripLines} />
                          <div style={{ width: "100%" }} className="relative">
                            <Select value={hullMaterial} onChange={(e) => setHullMaterial(e.target.value)}
                              style={{ backgroundColor: "transparent" }}
                              className={clsx(
                                "mt-3 block w-full ml-2 appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                "*:text-black",
                              )}
                            >
                              <option
                                style={{ fontWeight: "bold" }}
                                value="placeholder"
                              >
                                Selecteer een optie
                              </option>

                              <option value="aluminium">Aluminium</option>
                              <option value="composiet">Composiet</option>
                              <option value="ferrocement">Ferro cement</option>
                              <option value="hout">Hout</option>
                              <option value="polyester">Polyester</option>
                              <option value="pvc">PVC</option>
                              <option value="staal">Staal</option>
                              <option value="anders">Anders</option>
                            </Select>
                          </div>
                          <FontAwesomeIcon
                            className="mt-4 mr-2"
                            icon={faChevronDown}
                          />
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Dek materiaal
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={deckMaterial} onChange={(e) => setDeckMaterial(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Dek opbouw
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={deckConstruction} onChange={(e) => setDeckConstruction(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Dek afwerking
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={deckFinish} onChange={(e) => setDeckFinish(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Beglazing
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={glazing} onChange={(e) => setGlazing(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Waterverplaatsing
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                placeholder="In te vullen in tonnage (t)"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={waterDisplacement} onChange={(e) => setWaterDisplacement(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {section.id === "section6" && (
                      <div>
                        <div className="flex items-left">
                          <FontAwesomeIcon
                            icon={faPencil}
                            className={`${styles.cardsSectionIcon}`}
                          />
                          <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                            {section.title}
                          </span>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Motor(en)
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={motorDetails} onChange={(e) => setMotorDetails(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Motorbediening
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={motorControls} onChange={(e) => setMotorControls(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Vermogen
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={power} onChange={(e) => setPower(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Kruissnelheid
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                placeholder="In te vullen in knopen (kn)"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={cruisingSpeed} onChange={(e) => setCruisingSpeed(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Liter per uur K.S
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                placeholder="In te vullen in L/H"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={literPhKs} onChange={(e) => setLiterPhKs(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Maximale snelheid
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                placeholder="In te vullen in Knopen (kn)"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={maximumSpeed} onChange={(e) => setMaximumSpeed(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Liter per uur M.S
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={literPhMs} onChange={(e) => setLiterPhMs(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Versnellingsbak
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={gearbox} onChange={(e) => setGearbox(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Brandstof
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <FontAwesomeIcon className="mt-4 " icon={faGripLines} />
                          <div style={{ width: "100%" }} className="relative">
                            <Select value={fuelType} onChange={(e) => setFuelType(e.target.value)}
                              style={{ backgroundColor: "transparent" }}
                              className={clsx(
                                "mt-3 block w-full ml-2 appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                "*:text-black",
                              )}
                            >
                              <option
                                style={{ fontWeight: "bold" }}
                                value="placeholder"
                              >
                                Selecteer een optie
                              </option>

                              <option value="diesel">Diesel</option>
                              <option value="benzine">Benzine</option>
                              <option value="elektrisch">Elektrisch</option>
                              <option value="waterstof">Waterstof</option>
                              <option value="overig">Overig</option>
                            </Select>
                          </div>
                          <FontAwesomeIcon
                            className="mt-4 mr-2"
                            icon={faChevronDown}
                          />
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Brandstoftank
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                placeholder="In te vullen in liter (L)"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={fuelTank} onChange={(e) => setFuelTank(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Draai uren
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={operatingHours} onChange={(e) => setOperatingHours(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Aandrijving
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <FontAwesomeIcon className="mt-4 " icon={faGripLines} />
                          <div style={{ width: "100%" }} className="relative">
                            <Select value={propulsion} onChange={(e) => setPropulsion(e.target.value)}
                              style={{ backgroundColor: "transparent" }}
                              className={clsx(
                                "mt-3 block w-full ml-2 appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                "*:text-black",
                              )}
                            >
                              <option
                                style={{ fontWeight: "bold" }}
                                value="placeholder"
                              >
                                Selecteer een optie
                              </option>

                              <option value="sterndrive">Stern-drive</option>
                              <option value="saildrive">Sail-drive</option>
                              <option value="vdrive">V-drive</option>
                              <option value="jetdrive">Jet-drive</option>
                              <option value="shaftdrive">Shaft-drive</option>
                              <option value="surfacedrive">Surface-drive</option>
                              <option value="poddrive">Pod-drive</option>
                              <option value="overig">Overig</option>
                            </Select>
                          </div>
                          <FontAwesomeIcon
                            className="mt-4 mr-2"
                            icon={faChevronDown}
                          />
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Propellor type
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                placeholder="In te vullen in Blads"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={propellorType} onChange={(e) => setPropellorType(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Koeling
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={cooling} onChange={(e) => setCooling(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          (Schroefas) smering
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={propellerShaftLubrication} onChange={(e) => setPropellerShaftLubrication(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Noodmotor
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={emergencyEngine} onChange={(e) => setEmergencyEngine(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Boegschroef
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <FontAwesomeIcon className="mt-4 " icon={faGripLines} />
                          <div style={{ width: "100%" }} className="relative">
                            <Select value={bowThruster} onChange={(e) => setBowThruster(e.target.value)}
                              style={{ backgroundColor: "transparent" }}
                              className={clsx(
                                "mt-3 block w-full ml-2 appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                "*:text-black",
                              )}
                            >
                              <option
                                style={{ fontWeight: "bold" }}
                                value="placeholder"
                              >
                                Selecteer een optie
                              </option>

                              <option value="ja">Ja</option>
                              <option value="nee">Nee</option>
                            </Select>
                          </div>
                          <FontAwesomeIcon
                            className="mt-4 mr-2"
                            icon={faChevronDown}
                          />
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Hekschroef
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <FontAwesomeIcon className="mt-4 " icon={faGripLines} />
                          <div style={{ width: "100%" }} className="relative">
                            <Select value={fenceScrew} onChange={(e) => setFenceScrew(e.target.value)}
                              style={{ backgroundColor: "transparent" }}
                              className={clsx(
                                "mt-3 block w-full ml-2 appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                "*:text-black",
                              )}
                            >
                              <option
                                style={{ fontWeight: "bold" }}
                                value="placeholder"
                              >
                                Selecteer een optie
                              </option>

                              <option value="Ja">Ja</option>
                              <option value="nee">Nee</option>
                            </Select>
                          </div>
                          <FontAwesomeIcon
                            className="mt-4 mr-2"
                            icon={faChevronDown}
                          />
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Trimsysteem
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input value={trimSystem} onChange={(e) => setTrimSystem(e.target.value)}
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"

                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Stabilisatoren
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={stabilizers} onChange={(e) => setStabilizers(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {section.id === "section7" && (
                      <div>
                        <div className="flex items-left">
                          <FontAwesomeIcon
                            icon={faPencil}
                            className={`${styles.cardsSectionIcon}`}
                          />
                          <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                            {section.title}
                          </span>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Masten
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={masts} onChange={(e) => setMasts(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Verstaging
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={verstaging} onChange={(e) => setVerstaging(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Aantal zeilen
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={numberOfSails} onChange={(e) => setNumberOfSails(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Zeil materiaal
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={sailMaterial} onChange={(e) => setSailMaterial(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Genua
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={genoa} onChange={(e) => setGenoa(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Genuareef
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={genoaReef} onChange={(e) => setGenoaReef(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Spinakker
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={spinalField} onChange={(e) => setSpinalField(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Trisail
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={trisail} onChange={(e) => setTrisail(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Bezaan
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={bezaan} onChange={(e) => setBezaan(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Stormfork
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={stormBreeding} onChange={(e) => setStormBreeding(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Grootzeil
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={mainsail} onChange={(e) => setMainsail(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Lieren
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={liating} onChange={(e) => setLiating(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {section.id === "section8" && (
                      <div>
                        <div className="flex items-left">
                          <FontAwesomeIcon
                            icon={faPencil}
                            className={`${styles.cardsSectionIcon}`}
                          />
                          <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                            {section.title}
                          </span>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Stuurpositie
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={steeringPosition} onChange={(e) => setSteeringPosition(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Extra stuurpositie
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={extraSteeringPosition} onChange={(e) => setExtraSteeringPosition(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Kompas
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={compass} onChange={(e) => setCompass(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Log
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={log} onChange={(e) => setLog(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Dieptemeter
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={depthGauge} onChange={(e) => setDepthGauge(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Windmeter
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={windGauge} onChange={(e) => setWindGauge(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Autopiloot
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={autoPilot} onChange={(e) => setAutoPilot(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          GPS
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={gps} onChange={(e) => setGps(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          GPS-plotter
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={gpsPlotter} onChange={(e) => setGpsPlotter(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Radar
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={radar} onChange={(e) => setRadar(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Radardetector
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={radarDetector} onChange={(e) => setRadarDetector(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Radarscherm
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={radarScreen} onChange={(e) => setRadarScreen(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          VHF
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={vhf} onChange={(e) => setVhf(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          AIS
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={ais} onChange={(e) => setAis(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Roeraanwijzer
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={stirMountedPointer} onChange={(e) => setStirMountedPointer(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Snelheidsmeter
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={speedometer} onChange={(e) => setSpeedometer(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {section.id === "section9" && (
                      <div>
                        <div className="flex items-left">
                          <FontAwesomeIcon
                            icon={faPencil}
                            className={`${styles.cardsSectionIcon}`}
                          />
                          <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                            {section.title}
                          </span>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Interieurmateriaal
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={interiorMaterial} onChange={(e) => setInteriorMaterial(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Hutten
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={cabins} onChange={(e) => setCabins(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Eenpersoonsbedden
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={singleBeds} onChange={(e) => setSingleBeds(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Tweepersoonsbedden
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={doubleBeds} onChange={(e) => setDoubleBeds(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Douches
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={showers} onChange={(e) => setShowers(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Toiletten
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={toilets} onChange={(e) => setToilets(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Baden
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={bathing} onChange={(e) => setBathing(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Grijswaterpomp
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={greyWaterPump} onChange={(e) => setGreyWaterPump(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Grijswatertank
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={greyWaterTank} onChange={(e) => setGreyWaterTank(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Zwartwaterpomp
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={blackWaterPump} onChange={(e) => setBlackWaterPump(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Zwartwatertank
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={blackWaterTank} onChange={(e) => setBlackWaterTank(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Verwarming
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={heating} onChange={(e) => setHeating(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Airconditioning
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={airConditioning} onChange={(e) => setAirConditioning(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Kombuis
                        </span>
                        <div className="flex items-left">
                          <FontAwesomeIcon className="mt-4 " icon={faGripLines} />
                          <div style={{ width: "100%" }} className="relative">
                            <Select value={cudlyTube} onChange={(e) => setCudlyTube(e.target.value)}
                              style={{ backgroundColor: "transparent" }}
                              className={clsx(
                                "mt-3 block w-full ml-2 appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                "*:text-black",
                              )}
                            >
                              <option value="placeholder">
                                Selecteer een optie
                              </option>
                              <option value="ja">Ja</option>
                              <option value="nee">Nee</option>
                            </Select>
                          </div>
                          <FontAwesomeIcon
                            className="mt-4 mr-2"
                            icon={faChevronDown}
                          />
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Wasbak
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={washbasin} onChange={(e) => setWashbasin(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Waterdrukpomp
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={waterPressurePump} onChange={(e) => setWaterPressurePump(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Watermaker
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={waterMaker} onChange={(e) => setWaterMaker(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Heetwatersysteem
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={hotWaterSystem} onChange={(e) => setHotWaterSystem(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Drinkwatertank
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <span
                          style={{ float: "right" }}
                          className={`text-gray-500`}
                        >
                          In te vullen in liter (L)
                        </span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={drinkingWaterTank} onChange={(e) => setDrinkingWaterTank(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Kooktoestel
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={cooker} onChange={(e) => setCooker(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Oven
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={oven} onChange={(e) => setOven(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Magnetron
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={microwave} onChange={(e) => setMicrowave(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Koelkast
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={fridge} onChange={(e) => setFridge(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Vriezer
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={freezer} onChange={(e) => setFreezer(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Ijsblokjes machine
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={iceCubesMachine} onChange={(e) => setIceCubesMachine(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Wijnkoelkast
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={wineFridge} onChange={(e) => setWineFridge(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Vaatwasser
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={dishwasher} onChange={(e) => setDishwasher(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Wasmachine
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={washingMachine} onChange={(e) => setWashingMachine(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Droger
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={dryer} onChange={(e) => setDryer(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {section.id === "section10" && (
                      <div>
                        <div className="flex items-left">
                          <FontAwesomeIcon
                            icon={faPencil}
                            className={`${styles.cardsSectionIcon}`}
                          />
                          <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                            {section.title}
                          </span>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Huisaccu's
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                placeholder="In te vullen in Amp / V"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={homeBatteries} onChange={(e) => setHomeBatteries(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={'ml-2  ${styles.cardsSectionTitle}'}>
                          Startaccu's
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                placeholder="In te vullen in Amp / V"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={startUpBatteries} onChange={(e) => setStartUpBatteries(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Boegschroefaccu
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                placeholder="In te vullen in Amp / V"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={bowThrusterBattery} onChange={(e) => setBowThrusterBattery(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Hekschroefaccu
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                placeholder="In te vullen in Amp / V"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={boldBattery} onChange={(e) => setBoldBattery(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          DC-systeem
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                placeholder="In te vullen in Volt (V)"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={dcSystem} onChange={(e) => setDcSystem(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          AC-systeem
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                placeholder="In te vullen in Volt (V)"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={acSystem} onChange={(e) => setAcSystem(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Acculader
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                placeholder="In te vullen in Volt (V) / Wafage (W) / Amp"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={batteryCharger} onChange={(e) => setBatteryCharger(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Omvormer
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                placeholder="In te vullen in Volt (V) / Wafage (W) / Amp"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={inverter} onChange={(e) => setInverter(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Generator
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={generator} onChange={(e) => setGenerator(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Generator uren
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                placeholder="In te vullen in Uur"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={generatorHours} onChange={(e) => setGeneratorHours(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {section.id === "section11" && (
                      <div>
                        <div className="flex items-left">
                          <FontAwesomeIcon
                            icon={faPencil}
                            className={`${styles.cardsSectionIcon}`}
                          />
                          <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                            {section.title}
                          </span>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Reddingsboot
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={lifeboat} onChange={(e) => setLifeboat(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          EPIRB
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={epirb} onChange={(e) => setEpirb(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          MOB-Systeem
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={mobSystem} onChange={(e) => setMobSystem(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Brandblusser
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={fireExtinguisher} onChange={(e) => setFireExtinguisher(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Machinekamer blussysteem
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={engineRoomExtinguishingSystem} onChange={(e) => setEngineRoomExtinguishingSystem(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Bilgepomp
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={bilgePump} onChange={(e) => setBilgePump(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Hoogwateralarm
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={highWaterAlarm} onChange={(e) => setHighWaterAlarm(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Brandalarm
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={fireAlarm} onChange={(e) => setFireAlarm(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Gasalarm
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={gasAlarm} onChange={(e) => setGasAlarm(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Zoeklicht
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={searchLight} onChange={(e) => setSearchLight(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Anker
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={anchor} onChange={(e) => setAnchor(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Fenders
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={fenders} onChange={(e) => setFenders(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Gangway
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={gangway} onChange={(e) => setGangway(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Bijboot
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={dinghy} onChange={(e) => setDinghy(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Buiskap
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={tubeCap} onChange={(e) => setTubeCap(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Bimini
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={bimini} onChange={(e) => setBimini(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {section.id === "section12" && (
                      <div>
                        <div className="flex items-left">
                          <FontAwesomeIcon
                            icon={faPencil}
                            className={`${styles.cardsSectionIcon}`}
                          />
                          <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                            {section.title}
                          </span>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2 ${styles.cardsSectionTitle}`}>
                          Cover Foto
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div className="mb-6 mt-3 text-sm text-gray-500">
                              <div
                                style={{ width: "35%", height: "25vh" }}
                                className="border-2 border-dotted border-gray-300 p-4 flex items-center justify-center rounded-md"
                              >
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  id="upload-photo"
                                  value={coverPhoto} onChange={(e) => setCoverPhoto(e.target.value)}
                                />
                                <label
                                  htmlFor="upload-photo"
                                  className="flex items-center justify-center cursor-pointer text-gray-500"
                                >
                                  <FontAwesomeIcon
                                    icon={faUpload}
                                    className="text-gray-500 mr-2"
                                  />
                                </label>
                              </div>
                              <br />
                              Maximum bestand grootte: 32 MB.
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2 ${styles.cardsSectionTitle}`}>
                          Gallerij
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div className="mb-6 mt-3 text-sm text-gray-500">
                              <div
                                style={{ width: "35%", height: "25vh" }}
                                className="border-2 border-dotted border-gray-300 p-4 flex items-center justify-center rounded-md"
                              >
                                <input value={galleryPhoto} onChange={(e) => setGalleryPhoto(e.target.value)}
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  id="upload-photo"
                                />
                                <label
                                  htmlFor="upload-photo"
                                  className="flex items-center justify-center cursor-pointer text-gray-500"
                                >
                                  <FontAwesomeIcon
                                    icon={faUpload}
                                    className="text-gray-500 mr-2"
                                  />
                                </label>
                              </div>
                              <br />
                              Maximum bestand grootte: 32 MB. Tot en met 20 files
                              toegestaan
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Eventuele Video URL
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                ))}
                <div>
                  <button type="submit"
                    style={{ backgroundColor: "#2a466a", width: "100%" }}
                    className="bg-blue-500 text-white p-2 rounded-md"
                  >
                    <FontAwesomeIcon className="mr-1" icon={faPaperPlane} />
                    Voeg toe
                  </button>
                  <div className="grid grid-cols-12 gap-4 mt-4">
                    {/* First card taking 6 columns (half width) */}
                    <div className="col-span-6">
                      <div className={`card ${styles.cardsAccount}`}>
                        <button
                          style={{
                            backgroundColor: "rgba(0,0,0,.03)",
                            width: "100%",
                            color: "#242429",
                            fontWeight: "bold",
                          }}
                          className="bg-blue-500 text-white p-2 rounded-md"
                        >
                          <FontAwesomeIcon className="mr-1" icon={faEye} />
                          Preview
                        </button>
                      </div>
                    </div>

                    {/* Second card taking 6 columns (half width) */}
                    <div className="col-span-6">
                      <div className={`card ${styles.cardsAccount}`}>
                        <button
                          style={{
                            backgroundColor: "rgba(0,0,0,.03)",
                            width: "100%",
                            color: "#242429",
                            fontWeight: "bold",
                          }}
                          className="bg-blue-500 text-white p-2 rounded-md"
                        >
                          <FontAwesomeIcon className="mr-1" icon={faFloppyDisk} />
                          Sla op als draft
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
