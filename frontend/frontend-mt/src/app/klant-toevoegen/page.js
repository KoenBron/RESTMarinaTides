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
export default function KlantPage() {
  const [activeSection, setActiveSection] = useState("");
  const sectionRefs = useRef([]);

  const sections = [
    { id: "section1", title: "Algemeen" },
    { id: "section2", title: "Klant (basisgegevens)" },
    { id: "section3", title: "Bedrijfsgegevens klant" },
    { id: "section4", title: "Intern Gebruik" },
    { id: "section5", title: "Optie voor Klant" },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
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
  const token = localStorage.getItem("token");
  const [status, setStatus] = useState("");
  const [registration, setRegistration] = useState("");
  const [salut, setSalut] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [referencecode, setReferencecode] = useState("");
  const [linked_boat, setLinkedBoat] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState("");
  const [mobile_phone, setMobilePhone] = useState("");
  const [landline_phone, setLandlinePhone] = useState("");
  const [fax, setFax] = useState("");
  const [email, setEmail] = useState("");
  const [newsletter_registration, setNewsletterRegistration] = useState("");
  const [language, setLanguage] = useState("");
  const [name_business, setNameBusiness] = useState("");
  const [address_business, setAddressBusiness] = useState("");
  const [btw_id, setBtwId] = useState("");
  const [notes, setNotes] = useState("");
  const [from_reminder_date, setFromReminderDate] = useState("");
  const [to_reminder_date, setToReminderDate] = useState("");
  const [document, setDocument] = useState("");
  const [name_option, setNameOption] = useState("");
  const [option_list, setOptionList] = useState("");


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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerData = {
      first_name: firstname,
      last_name: lastname,
      status: status,
      registration: registration,
      salut: salut,
      referencecode: referencecode,
      address: address,
      mobile_phone: mobile_phone,
      landline_phone: landline_phone,
      fax: fax,
      email: email,
      newsletter_registration: newsletter_registration,
      language: language,
      name_business: name_business,
      address_business: address_business,
      btw_id: btw_id,
      notes: notes,
      from_reminder_date: from_reminder_date,
      to_reminder_date: to_reminder_date,
      document: document,
      name_option: name_option,
      option_list: option_list,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/base/customers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`,
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        throw new Error("Failed to add customer");
      }

      const data = await response.json();
      console.log("Customer added successfully:", data);
    } catch (error) {
      console.error("Error adding customer:", error);
    }
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
              style={{ top: "16em", marginLeft: "1.5em", color: "gray" }}
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
              {/* Content */}
              <div style={{ width: "120%" }} className="space-y-14 p-8">
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
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Type Klant
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
                                Is de klant latent of actief?
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
                          Klantenregistratie
                        </span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                placeholder="Vul je zoekterm in voor de klant; Bijvoorbeeld: Dhr. Smit, systeem zoekt op Smit."
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={registration} onChange={(e) => setRegistration(e.target.value)}
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
                            icon={faPencil}
                            className={`${styles.cardsSectionIcon}`}
                          />
                          <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                            {section.title}
                          </span>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Aanhef
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={salut} onChange={(e) => setSalut(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Voornaam
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={firstname} onChange={(e) => setFirstname(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Achternaam
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={lastname} onChange={(e) => setLastname(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Referentiecode
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>

                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={referencecode} onChange={(e) => setReferencecode(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />



                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Adres
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>

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
                                placeholder="Voer je adres in"
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={address} onChange={(e) => setAddress(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
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
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Telefoonnummer Mobiel
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>

                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={mobile_phone} onChange={(e) => setMobilePhone(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Telefoonnummer Vast
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>

                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={landline_phone} onChange={(e) => setLandlinePhone(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Fax
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>

                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={fax} onChange={(e) => setFax(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Contact Email
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>

                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Inschrijving Nieuwsbrief{" "}
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <FontAwesomeIcon className="mt-4 " icon={faGripLines} />
                          <div style={{ width: "100%" }} className="relative">
                            <Select value={newsletter_registration} onChange={(e) => setNewsletterRegistration(e.target.value)}
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
                          Taal
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <FontAwesomeIcon className="mt-4 " icon={faGripLines} />
                          <div style={{ width: "100%" }} className="relative">
                            <Select value={language} onChange={(e) => setLanguage(e.target.value)}
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

                              <option value="nederlands">Nederlands</option>
                              <option value="engels">Engels</option>
                              <option value="duits">Duits</option>
                            </Select>
                          </div>
                          <FontAwesomeIcon
                            className="mt-4 mr-2"
                            icon={faChevronDown}
                          />
                        </div>
                      </div>
                    )}
                    {section.id === "section3" && (
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
                          Naam bedrijf
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={name_business} onChange={(e) => setNameBusiness(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Adres
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={address_business} onChange={(e) => setAddressBusiness(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          BTW-ID
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={btw_id} onChange={(e) => setBtwId(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />
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
                          Notities
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                                rows="4"
                                className="border p-1 w-full mb-2"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}> TODO: calender?
                          Reminder TODO: calender?
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={from_reminder_date} onChange={(e) => setFromReminderDate(e.target.value)}
                              />
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={to_reminder_date} onChange={(e) => setToReminderDate(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          style={{
                            width: "100%",
                            color: "#242429",
                          }}
                          className="hover:bg-[#f2f2f2] bg-[rgba(0,0,0,.03)]  mb-3 text-white p-2 rounded-md"
                        >
                          Voeg datum toe
                        </button>
                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Documenten
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div className="mb-6 text-sm text-gray-500">
                              <div
                                style={{ width: "35%", height: "25vh" }}
                                className="border-2 border-dotted border-gray-300 p-4 flex items-center justify-center rounded-md"
                              >
                                <input value={document} onChange={(e) => setDocument(e.target.value)}
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
                              Maximum bestand grootte: 32 MB. Tot en met 100
                              bestanden toegestaan.
                            </div>
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
                          Naam optie:
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <div style={{ width: "100%" }} className="relative">
                            <div class="mb-4">
                              <Input
                                className="border-b text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                                value={name_option} onChange={(e) => setNameOption(e.target.value)}
                                placeholder="Klant status"
                              />
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: "17px -20px 20px" }} />

                        <span className={`ml-2  ${styles.cardsSectionTitle}`}>
                          Optie lijst
                        </span>
                        <span className={`ml-2  text-gray-500`}>(optioneel)</span>
                        <div className="flex items-left">
                          <FontAwesomeIcon className="mt-4 " icon={faGripLines} />
                          <div style={{ width: "100%" }} className="relative">
                            <Select value={option_list} onChange={(e) => setOptionList(e.target.value)}
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

                              <option value="latent">Latent</option>
                              <option value="opdrachtgever">
                                Potentiele opdrachtgever
                              </option>
                              <option value="p-opdrachtgever">
                                Opdrachtegever
                              </option>
                              <option value="verkoper">Verkoper</option>
                              <option value="opzoek">Opzoek</option>
                              <option value="urgent">Urgent</option>
                            </Select>
                          </div>
                          <FontAwesomeIcon
                            className="mt-4 mr-2"
                            icon={faChevronDown}
                          />
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
