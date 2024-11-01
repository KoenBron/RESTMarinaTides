"use client";
import Tabs from "../../components/Tabs";
import Navbar from "../../components/navbar";
import styles from "../mijn-account/page.module.css";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import stylesPage from "../account-gegevens/page.module.css";
import { Fieldset, Input, Label, Legend, Select } from "@headlessui/react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPerson,
  faLayerGroup,
  faUpload,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
const AccountGegevensPage = () => {
  const [country, setNetwork] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const searchParams = useSearchParams();
  const filterByType = isClient ? searchParams.get("filter_by_type") : null;

  // If not on the client yet, don't render
  if (!isClient) {
    return null;
  }
  return (
    <>
      <Head>
        <title>My Custom Tab Name</title>
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <Navbar />
          <Tabs />
          <div className="p-4">
            <div className="flex justify-between">
              {" "}
              <div className="w-3/4">
                {" "}
                <div
                  style={{ marginLeft: "18em", marginRight: "1em" }}
                  className={`card ${styles.cardsAccount}`}
                >
                  <form action="/shipping">
                    <Fieldset>
                      <Legend className="font-semibold mb-2">
                        <div className="flex items-center">
                          <FontAwesomeIcon
                            icon={faPerson}
                            className={`${stylesPage.cardsGraphIcon}`}
                          />
                          <span className={`ml-2 ${styles.cardsAccountTitle}`}>
                            Account gegevens
                          </span>
                        </div>
                      </Legend>
                      <div className="mb-4">
                        <Label className="block font-medium">Voornaam</Label>
                        <Input
                          className="border-b border-gray-300 w-full focus:outline-none focus:border-black-800"
                          name="address"
                        />
                      </div>
                      <div className="mb-4">
                        <Label className="block font-medium">Achternaam</Label>
                        <Input
                          className="border-b border-gray-300 w-full focus:outline-none focus:border-black-800"
                          name="address"
                        />
                      </div>
                      <div className="mb-4">
                        <Label className="block font-medium">Email</Label>
                        <Input
                          className="border-b border-gray-300 w-full focus:outline-none focus:border-black-800"
                          name="address"
                        />
                      </div>
                      <div className="mb-4">
                        <Label className="block font-medium">
                          Display Naam
                        </Label>
                        <Input
                          className="border-b border-gray-300 w-full focus:outline-none focus:border-black-800"
                          name="address"
                        />
                      </div>
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">
                          Verander profiel foto
                        </h3>
                        <hr className="border-t-2 border-gray-300 mb-4" />
                        <div
                          style={{ width: "35%", height: "25vh" }}
                          className="border-2 border-dotted border-gray-300 p-4 flex items-center justify-center rounded-md"
                        >
                          <input
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
                        Maximum bestand grootte: 32 MB.
                      </div>
                      <div className="mb-4">
                        <Label className="block font-medium">Over Jezelf</Label>
                        <Input
                          className="border-b border-gray-300 w-full focus:outline-none focus:border-black-800"
                          name="address"
                        />
                      </div>

                      <div className="mb-4">
                        <Label className="block font-bold font-medium">
                          <strong>Sociale Netwerken</strong>
                        </Label>
                        <Select
                          className="border-b bg-transparent  mb-3 border-gray-300 p-2 w-full"
                          name="country"
                          value={country}
                          onChange={(event) => setNetwork(event.target.value)}
                        >
                          <option value="">Selecteer Netwerk</option>
                          <option>Facebook</option>
                          <option>X</option>
                          <option>Instagram</option>
                          <option>Youtube</option>
                          <option>Snapchat</option>
                          <option>Tumblr</option>
                          <option>Reddit</option>
                          <option>LinkedIn</option>
                          <option>Pinterest</option>
                          <option>DeviantArt</option>
                          <option>VKontakte</option>
                          <option>SoundCloud</option>
                          <option>Website</option>
                          <option>Other</option>
                        </Select>
                        <br />

                        <Input
                          className="border-b border-gray-300 w-full focus:outline-none focus:border-black-800"
                          name="address"
                          placeholder=" Voeg URL Toe..."
                        />
                        <br />
                        <Select
                          className="border-b bg-transparent mt-2 mb-3 border-gray-300 p-2 w-full "
                          name="country"
                          value={country}
                          onChange={(event) => setNetwork(event.target.value)}
                        >
                          <option value="">Selecteer Netwerk</option>
                          <option>Facebook</option>
                          <option>X</option>
                          <option>Instagram</option>
                          <option>Youtube</option>
                          <option>Snapchat</option>
                          <option>Tumblr</option>
                          <option>Reddit</option>
                          <option>LinkedIn</option>
                          <option>Pinterest</option>
                          <option>DeviantArt</option>
                          <option>VKontakte</option>
                          <option>SoundCloud</option>
                          <option>Website</option>
                          <option>Other</option>
                        </Select>

                        <Input
                          className="border-b border-gray-300 w-full  bg-transparent  focus:outline-none focus:border-blue-500"
                          placeHolder=" Voeg URL Toe..."
                          name="address"
                        />
                      </div>
                      <button
                        style={{
                          width: "100%",
                          color: "#242429",
                        }}
                        className="hover:bg-[#f2f2f2] mb-3 text-white p-2 rounded-md"
                      >
                        Toevoegen
                      </button>
                      <br />
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">
                          Wachtwoord veranderen
                        </h3>
                        <hr className="border-t-2 border-gray-300 mb-4" />
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="border-b  border-gray-300 p-2 w-full  focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Huidig wachtwoord (laat dit leeg om het ongewijzigd te laten)"
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-2 top-2 text-gray-500"
                          >
                            <FontAwesomeIcon
                              icon={showPassword ? faEyeSlash : faEye}
                            />
                          </button>
                        </div>
                        <div className=" mt-3 relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="border-b  border-gray-300 p-2 w-full  focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nieuw wachtwoord (laat dit leeg om het ongewijzigd te laten)"
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-2 top-2 text-gray-500"
                          >
                            <FontAwesomeIcon
                              icon={showPassword ? faEyeSlash : faEye}
                            />
                          </button>
                        </div>
                        <div className=" mt-3 relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="border-b  border-gray-300 p-2 w-full  focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Wachwoord bevestigen"
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-2 top-2 text-gray-500"
                          >
                            <FontAwesomeIcon
                              icon={showPassword ? faEyeSlash : faEye}
                            />
                          </button>
                        </div>
                      </div>

                      <button
                        style={{ backgroundColor: "#123159", width: "100%" }}
                        className=" font-bold hover:bg-[#2a466a] text-white p-2 rounded-md"
                      >
                        Bevestig veranderingen
                      </button>
                    </Fieldset>
                  </form>
                </div>
              </div>
              {/* Card Section */}
              <div className="w-2/5">
                {" "}
                {/* Adjust width as needed */}
                <div className={`card ${stylesPage.cardsAccountType}`}>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faLayerGroup}
                      className={`${styles.cardsAccountIcon}`}
                    />
                    <span className={`ml-2 ${styles.cardsAccountTitle}`}>
                      Account type
                    </span>
                  </div>
                  <p className="mb-4">
                    Uw huidige account type is{" "}
                    <strong>Hoofd Account Gebruiker.</strong>
                  </p>
                  <button
                    style={{ backgroundColor: "#f2f2f2" }}
                    className="text-black p-2 rounded-md"
                  >
                    <strong>
                      Verander naar Sub Account Gebruiker - Werknemer
                    </strong>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default AccountGegevensPage;
