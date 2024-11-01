"use client";
import {
  faSearch,
  faGripLines,
  faChevronDown,
  faStreetView,
  faArrowRight,
  faArrowLeft,
  faHeart,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Description, Field, Label, Select, Input } from "@headlessui/react";
import clsx from "clsx";
import styles from "../new-categorie-klanten/page.module.css";
import KlantBG from "../../img/klantcardbg.png";
import Jacht from "../../img/jachtcardbg.png";
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


const handlePreviousPage = () => {
  //todo: nicky
};

const handleNextPage = () => {
  //todo: nicky
};
export default function NewCategorieJachten() {

  const [boats, setBoats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/base/boats/", {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Authentication failed or not authorized");
        }
        return response.json();
      })
      .then((data) => {
        setBoats(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message); // Set error if any occurs
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  // Show loading state
  if (loading) {
    return <div>Loading boats...</div>;
  }

  // Show error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (

    <div>
      <Navbar />
      <div className="flex h-screen">
        {/* First Section */}
        <div
          className="flex-none border overflow-auto card w-1/4 p-4 "
          style={{
            maxHeight: "calc(100vh - 20px)",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <h1 className="text-xl text-center text-black font-bold">
            Waar ben je naar op zoek?
          </h1>
          <div className=" mt-4">
            <span className={`ml-2  ${styles.cardsSectionTitle}`}>
              Sorteer op
            </span>
            <div className="flex items-left">
              <div style={{ width: "100%" }} className="relative">
                <Select
                  style={{ backgroundColor: "transparent", fontWeight: "bold" }}
                  className={clsx(
                    "block w-full  appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",

                    "*:text-black",
                  )}
                >
                  <option value="az">A-Z</option>
                  <option value="onlangstoegevoegd">Onlangs toegevoegd</option>
                  <option value="indebuurt">In de buurt</option>
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
            <span className={`ml-2  ${styles.cardsSectionTitle}`}>
              Vind u (Zeil)jacht
            </span>
            <div className="flex items-left">
              <div style={{ width: "100%" }} className="relative">
                <div class="mb-4">
                  <Input
                    className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                    name="address"
                  />
                </div>
              </div>
            </div>
            <hr style={{ margin: "17px 4px 20px" }} />
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
                  <option value="placeholder">Latent of Actief</option>
                  <option value="latent">Latent</option>
                  <option value="actief">Actief</option>
                </Select>
              </div>
              <FontAwesomeIcon
                style={{ color: "gray" }}
                className="mt-4 mr-2"
                icon={faChevronDown}
              />
            </div>
            <hr style={{ margin: "17px 4px 20px" }} />
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
                  <option> Jacht type</option>
                  <option value="elektrisch">Elektrisch</option>
                  <option value="motor">Motor</option>
                  <option value="zeil">Zeil</option>
                </Select>
              </div>
              <FontAwesomeIcon
                style={{ color: "gray" }}
                className="mt-4 mr-2"
                icon={faChevronDown}
              />
            </div>
            <hr style={{ margin: "17px 4px 20px" }} />
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
                  <option value="placeholder">(Zeil)jacht Merk</option>
                  <option value="sturier">Sturier</option>
                  <option value="selene">Selene</option>
                  <option value="sealine">Sealine</option>
                  <option value="mulder">Mulder</option>
                  <option value="linssen">Linssen</option>
                  <option value="grandbanks">Grand Banks</option>
                  <option value="devrieslen">De Vries Len</option>
                  <option value="breedendam">Breedendam</option>
                </Select>
              </div>
              <FontAwesomeIcon
                style={{ color: "gray" }}
                className="mt-4 mr-2"
                icon={faChevronDown}
              />
            </div>
            <hr style={{ margin: "17px 4px 20px" }} />
            <span className={`ml-2  ${styles.cardsSectionTitle}`}>Prijs</span>
            <p className={`ml-2  ${styles.cardsSectionTitle}`}>
              <strong>0€ — 0€</strong>
            </p>
            <div className="flex items-left">
              <div style={{ width: "100%" }} className="relative">
                <div class="mb-4">
                  <Input type="range" />
                </div>
              </div>
            </div>
            <div className="flex items-left">
              <div style={{ width: "100%" }} className="relative mb-5">
                <Input
                  className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                  name="address"
                  placeholder="Zoek op locatie"
                />
              </div>
              <FontAwesomeIcon
                style={{ color: "gray" }}
                className=" mr-2"
                icon={faStreetView}
              />
            </div>
            <div className="sticky bottom-0 bg-white p-4">
              <button
                style={{ backgroundColor: "#123159", width: "100%" }}
                className="text-white p-2 rounded mb-2"
              >
                <FontAwesomeIcon icon={faSearch} className="button-icon" />{" "}
                Search
              </button>
              <a className="text-black mt-2 block text-center">
                ↻ Reset Filter
              </a>
            </div>
          </div>
        </div>

        {/* JACHT LISTING GET */}
        <div
          style={{
            backgroundColor: "#fafafa",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;",
          }}
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
            {boats.length > 0 ? (
              boats.map((boat) => (
                <Link
                  href={`/listing?nameYacht=${boat.pk}`}
                  key={boat.pk}
                >
                  <div
                    style={{
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                    }}
                    className="card"
                  >
                    <div
                      className="border p-4 rounded shadow h-48"
                      style={{
                        backgroundColor: "#123159",
                        backgroundImage: `url(${KlantBG.src})`,
                      }}
                    >
                      <div className={`${styles.pricetag}`}>€ {boat.price}</div> {/* todo: Update price */}
                      <div
                        style={{ marginTop: "5em" }}
                        className="flex items-center mt-16"
                      >
                        <div style={{ width: "3.125em", height: "3.125em" }} className="rounded-full overflow-hidden bg-white">
                          <Image src={Jacht} alt="Icon" />
                        </div>
                        <span className="ml-2 text-white font-bold">{boat.name}</span>

                      </div>
                    </div>
                    <div
                      style={{ gap: "1em" }}
                      className="flex justify-center pt-2 pb-2 items-center"
                    >
                      <button style={{ color: "gray" }}>
                        <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
                        <span
                          className="absolute bottom-full mb-2 w-auto text-xs bg-gray-200 text-black px-2 py-1 rounded opacity-0 hover:opacity-100"
                          style={{ left: "50%", transform: "translateX(-50%)" }}
                        >

                        </span>
                      </button>
                      <button style={{ color: "gray" }}>
                        <FontAwesomeIcon icon={faHeart} className="button-icon" />
                        <span
                          className="absolute bottom-full mb-2 w-auto text-xs bg-gray-200 text-black px-2 py-1 rounded opacity-0 hover:opacity-100"
                          style={{ left: "50%", transform: "translateX(-50%)" }}
                        >

                        </span>
                      </button>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div>No boats available</div>
            )}
          </div>
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
          </div>
        </div>

        <div
          style={{ width: "41%" }}
          className="flex-none w-1/3 p-4  flex items-center justify-center"
        >
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
              {boats.map((boat) => {
                // Parse and check if latitude and longitude are valid numbers
                const lat = parseFloat(boat.latitude);
                const lng = parseFloat(boat.longitude);
                if (!isNaN(lat) && !isNaN(lng)) {
                  return (
                    <Marker
                      key={boat.pk}
                      position={{ lat, lng }}
                      title={boat.name}
                    />
                  );
                }
                return null;
              })}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
}
