import React, { useState } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"; // For making API requests

const LocationInput = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [streetName, setStreetName] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Your Google Maps API Key
  });

  // Function to fetch user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });

          // Fetch street name using Google Geocoding API
          const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

          const response = await axios.get(geocodeUrl);
          const address = response.data.results[0].formatted_address;
          setStreetName(address);
        },
        (error) => {
          console.error(error);
        },
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="border rounded p-2"
          placeholder="Street Name"
          value={streetName}
          onChange={(e) => setStreetName(e.target.value)}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={getCurrentLocation}
        >
          <FontAwesomeIcon
            icon={faLocationCrosshairs}
            className="mr-2 dropdown-icon"
          />
        </button>
      </div>

      {/* Google Maps Display */}
      <div className="mt-4">
        {isLoaded && location.lat && (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={location}
            zoom={15}
          >
            <Marker position={location} />
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default LocationInput;
