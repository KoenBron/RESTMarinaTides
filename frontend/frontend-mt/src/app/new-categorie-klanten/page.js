"use client";
import {
  faSearch,
  faGripLines,
  faChevronDown,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/navbar";
import Image from "next/image";
import { Description, Field, Label, Select, Input } from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../new-categorie-klanten/page.module.css";
import KlantBG from "../../img/klantcardbg.png";
import Klant from "../../img/klanten.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 52.0907, // Latitude for Utrecht, Netherlands
  lng: 5.1214,  // Longitude for Utrecht, Netherlands
};
const getCoordinatesFromAddress = async (address) => {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
  const data = await response.json();

  if (data.results.length > 0) {
    const { lat, lng } = data.results[0].geometry.location;
    return { lat, lng };
  } else {
    throw new Error("No results found for the given address.");
  }
};
const handlePreviousPage = () => {
  //todo: nicky
};

const handleNextPage = () => {
  //todo: nicky
};

export default function NewCategorieKlanten() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/base/customers/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Authentication failed or not authorized");
        }
        return response.json();
      })
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    const fetchCoordinates = async () => {
      const coords = [];
      for (const customer of customers) {
        try {
          const customerCoords = await getCoordinatesFromAddress(customer.address_business); // Replace with the actual address field
          coords.push({ ...customerCoords, id: customer.pk });
        } catch (error) {
          console.error(`Error fetching coordinates for ${customer.name}:`, error.message);
        }
      }
      setCoordinates(coords);
    };

    if (customers.length) {
      fetchCoordinates();
    }
  }, [customers]);
  if (loading) {
    return <div>Loading customers...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        <div className="flex-none border card w-1/4 p-4 ">
          <h1 className="text-xl text-center text-black font-bold">
            Waar ben je naar op zoek?
          </h1>
          <div className="space-y-4 mt-4">
            <span className={`ml-2  ${styles.cardsSectionTitle}`}>
              Sorteer op
            </span>
            <div className="flex items-left">
              <div style={{ width: "100%" }} className="relative">
                <Select
                  style={{ backgroundColor: "transparent" }}
                  className={clsx(
                    "block w-full  appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",

                    "*:text-black",
                  )}
                >
                  <option value="meestrecent">Meest recent</option>
                  <option value="hoogstgewaardeerd">Hoogst gewaardeerd</option>
                  <option value="random">Random</option>
                </Select>
              </div>
              <FontAwesomeIcon
                style={{ color: "gray" }}
                className="mt-4 mr-2"
                icon={faChevronDown}
              />
            </div>
            <hr style={{ margin: "17px 4px 20px" }} />
            <input
              type="text"
              style={{
                outline: "0",
                border: "none",
                borderBottom: "1px solid #1890ff",
                borderWidth: "0 0 2px",
                borderColor: "black",
                marginLeft: "0.5em",
                width: "96%",
              }}
              placeholder="Zoek klant"
              className=" text-black  p-2 w-full"
            />
            <div className="flex items-left">
              <div style={{ width: "100%" }} className="relative">
                <Select
                  style={{ backgroundColor: "transparent" }}
                  className={clsx(
                    "block w-full  appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",

                    "*:text-black",
                  )}
                >
                  <option value="placeholder">Type klant</option>
                  <option value="actief">Actief</option>
                  <option value="latent">Latent</option>
                </Select>
              </div>
              <FontAwesomeIcon
                style={{ color: "gray" }}
                className="mt-4 mr-2"
                icon={faChevronDown}
              />
            </div>
            <hr style={{ margin: "17px 4px 20px" }} />
            <div className="justify-center">
              <button
                style={{ backgroundColor: "#123159", width: "100%" }}
                className="text-white p-2 rounded"
              >
                <FontAwesomeIcon icon={faSearch} className="button-icon" />{" "}
                Search
              </button>
              <a
                style={{ display: "flex", justifyContent: "center" }}
                className="text-gray-600 mt-2"
              >
                ↻ Reset Filters
              </a>
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div
          style={{ backgroundColor: "#fafafa" }}
          className="flex-none w-1/3 p-4 bg-white overflow-auto"
        >
          <div className="flex text-black justify-between items-center mb-4">
            <button
              className="p-2 text-lg"
              onClick={handlePreviousPage}
              aria-label="Previous Page"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="button-icon" />
            </button>

            <span>
              Showing <strong>1-20</strong> out of <strong>30</strong> results
            </span>

            <button
              className="p-2 text-lg"
              onClick={handleNextPage}
              aria-label="Next Page"
            >
              <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
            </button>
          </div>

          {/* Cards Display */}
          <div className="flex flex-col gap-4">
            {customers.map((customer) => (
              <Link
                href={`/listing?name=${encodeURIComponent(customer.first_name)} ${encodeURIComponent(customer.last_name)}`}
                key={customer.pk}
              >
                <div
                  key={customer.pk}
                  className="border p-4 rounded shadow h-48"
                  style={{
                    backgroundColor: "#123159",
                    backgroundImage: `url(${KlantBG.src})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div
                    style={{ marginTop: "7em" }}
                    className="flex items-center mt-16"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white">
                      <Image src={Klant} alt="Customer Icon" />
                    </div>
                    <span className="ml-2 text-white font-bold">
                      {customer.first_name} {customer.last_name}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Buttons */}
          <div className="flex mt-2 space-x-2">
            <button
              className={`p-2 w-10 h-10 rounded-full ${styles.pageination}`}
            >
              1
            </button>
            <button
              className={`p-2 w-10 h-10 rounded-full ${styles.pageination}`}
            >
              2
            </button>
            {/* Add more buttons as needed */}
          </div>
        </div>

        {/* Third  <span className={`ml-2  ${styles.cardsSectionTitle}`}> Section */}
        <div style={{ width: "41%" }}
          className="flex-none w-1/3 p-4  flex items-center justify-center">
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
              {coordinates.map((coord) => (
                <Marker
                  key={coord.id}
                  position={{ lat: coord.lat, lng: coord.lng }}
                  title={customers.find(c => c.pk === coord.id).name} // Get name from original customers array
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
}
