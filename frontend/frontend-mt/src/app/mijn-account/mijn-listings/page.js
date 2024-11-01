"use client";
import Tabs from "../../../components/Tabs";
import Navbar from "../../../components/navbar";
import styles from "../page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faList,
  faPencil,
  faTrashCan,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "next/navigation";
import axios from 'axios';
import { Suspense, useEffect, useState } from "react";
import Jacht from "../../../img/jachtcardbg.png";
import Klant from "../../../img/klanten.png";
import Image from "next/image";
import {
  Input,
  Button,
  Dialog,
  DialogPanel,
} from "@headlessui/react";
const MijnListings = () => {
  const [isClient, setIsClient] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/base/api/hello/`)
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const searchParams = useSearchParams();
  const filterByType = isClient ? searchParams.get("filter_by_type") : null;

  if (!isClient) {
    return null;
  }
  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Navbar />
        <Tabs />
        <div className="container mx-auto px-4">
          <h2 className={`text-left mb-7 ${styles.welcomeText}`}>
            Uw Relaties

          </h2>
          <div style={{ color: "#383838" }} className="text-right">
            <Input
              className="border-b border-gray-300  focus:outline-none focus:border-gray-500"
              placeholder="Search your listings"
              name="address"
              style={{ fontSize: "14px", marginRight: "25%" }}
            />
          </div>
          <div style={{ margin: "5em" }} className="grid grid-cols-1 gap-4">
            {/* First Row: Blue card */}
            <div className={`col-span-6 ${styles.blueCards}`}>
              <div className="card text-white text-2xl flex justify-between items-center">
                <div>
                  196
                  <div className="card-body text-sm my-0.5">Gepubliceerd</div>
                </div>
                <FontAwesomeIcon
                  icon={faList}
                  className={`text-5xl ${styles.cardsIcon}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 col-span-6">
              <div
                style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", height: "20em" }}
                className="card p-4  text-black relative"
              >
                <div
                  style={{ borderRadius: "16px" }}
                  className="absolute m-3 top-0 left-0 bg-orange-500 text-white px-2 py-1 rounded"
                >
                  Vind uw (Zeil)jacht
                </div>

                <div className="flex flex-col items-center mt-8">
                  <Image
                    src={Jacht.src}
                    alt="Icon"
                    width={12}
                    height={12}
                    className="w-12 h-12 mb-2"
                  />
                  <h3
                    style={{ color: "#123159", fontSize: "0.875em" }}
                    className="text-xl font-bold"
                  >
                    Jannetje
                  </h3>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <button
                    onClick={open}
                    style={{ color: "#123159" }}
                    className="  px-3 py-1 rounded flex flex-col items-center"
                  >
                    <FontAwesomeIcon
                      icon={faBolt}
                      className={`text-lg ${styles.cardsListingIcon}`}
                    />
                    Promoten
                  </button>
                  <button
                    style={{ color: "#123159" }}
                    className=" px-4 py-1 rounded flex flex-col items-center"
                  >
                    <FontAwesomeIcon
                      icon={faPencil}
                      className={`text-lg ${styles.cardsListingIcon}`}
                    />
                    Bewerken
                  </button>

                  <button
                    style={{
                      color: "#123159",
                    }}
                    className="  whitespace-nowrap px-4 py-1 rounded flex flex-col items-center"
                  >
                    <FontAwesomeIcon
                      icon={faPause}
                      className={`text-lg ${styles.cardsListingIcon}`}
                    />
                    Offline halen
                  </button>
                </div>

                <div className="mt-2 mb-2">
                  <button
                    style={{
                      color: "#123159",

                      paddingRight: "1rem",
                      marginTop: "1em",
                    }}
                    className=" px-3 py-1 rounded flex flex-col items-center"
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className={`text-lg ${styles.cardsListingIcon}`}
                    />
                    Verwijderen
                  </button>
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    color: "#123159",
                    fontWeight: "400",
                    bottom: "2em",
                  }}
                  className="absolute h-2 bottom-0 left-1/2 transform -translate-x-1/2 "
                >
                  Gemaakt op: september 27, 2024
                </span>
              </div>

              {/* <div
                style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", height: "20em" }}
                className="card p-4  text-black relative"
              >
                <div
                  style={{ borderRadius: "16px" }}
                  className=" m-3 absolute top-0 left-0 bg-orange-500 text-white px-2 py-1 rounded"
                >
                  Vind uw (Zeil)jacht
                </div>

                <div className="flex flex-col items-center mt-8">
                  <Image
                    src={Jacht.src}
                    alt="Icon"
                    width={12}
                    height={12}
                    className="w-12 h-12 mb-2"
                  />
                  <div
                    style={{ color: "#484848", fontSize: "0.875em" }}
                    className="flex items-center"
                  >
                    <h3 className=" font-bold">Jannetje</h3>
                    <span className="ml-2 ">(Offline gehaald)</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <button
                    style={{ color: "#123159" }}
                    className=" flex flex-col items-center px-3 py-1 rounded"
                  >
                    <FontAwesomeIcon
                      icon={faPlay}
                      className={`text-lg ${styles.cardsListingIcon}`}
                    />
                    Publiceren
                  </button>
                  <button
                    style={{ color: "#123159" }}
                    className=" px-4 py-1 rounded"
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className={`text-lg ${styles.cardsListingIcon}`}
                    />
                    Verwijderen
                  </button>
                </div>

                <span
                  style={{
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    color: "#123159",
                    fontWeight: "400",
                    bottom: "2em",
                  }}
                  className="absolute h-2 left-1/2 transform -translate-x-1/2 "
                >
                  Gemaakt op: september 27, 2024
                </span>
              </div> */}

              <div
                style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", height: "20em" }}
                className="card p-4  text-black relative"
              >
                <div
                  style={{
                    borderRadius: "16px",
                  }}
                  className=" m-3 absolute top-0 left-0 bg-orange-500 text-white px-2 py-1 rounded"
                >
                  Vind uw (Zeil)jacht
                </div>

                <div className="flex flex-col items-center mt-8">
                  <Image
                    src={Klant.src}
                    alt="Icon"
                    width={12}
                    height={12}
                    className="w-12 h-12 mb-2"
                  />
                  <h5
                    style={{ color: "#123159", fontSize: "0.875em" }}
                    className="text-xl font-bold"
                  >
                    MT000080
                  </h5>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Button
                    onClick={open}
                    style={{ color: "#123159" }}
                    className=" flex flex-col items-center px-3 py-1 rounded"
                  >
                    <FontAwesomeIcon
                      icon={faBolt}
                      className={`text-lg ${styles.cardsListingIcon}`}
                    />
                    Promoten
                  </Button>
                  <button
                    style={{ color: "#123159" }}
                    className=" flex flex-col items-center px-4 py-1 rounded"
                  >
                    <FontAwesomeIcon
                      icon={faPencil}
                      className={`text-lg ${styles.cardsListingIcon}`}
                    />
                    Bewerken
                  </button>
                  <button
                    style={{
                      color: "#123159",
                    }}
                    className="  whitespace-nowrap  px-4 py-1 rounded flex flex-col items-center"
                  >
                    <FontAwesomeIcon
                      icon={faPause}
                      className={`text-lg ${styles.cardsListingIcon}`}
                    />
                    Offline halen
                  </button>
                </div>

                <div className="mt-2">
                  <button
                    style={{
                      color: "#123159",

                      paddingRight: "1rem",
                      marginTop: "1em",
                    }}
                    className=" px-3 py-1 rounded flex flex-col items-center"
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className={`text-lg ${styles.cardsListingIcon}`}
                    />
                    Verwijderen
                  </button>
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    color: "#123159",
                    fontWeight: "400",
                    bottom: "2em",
                  }}
                  className="absolute h-2  left-1/2 transform -translate-x-1/2 "
                >
                  Gemaakt op: september 27, 2024
                </span>
              </div>
            </div>
            <div className="flex mt-2 space-x-2">
              <button
                style={{ background: "#123159", color: "#fff" }}
                className={`p-2 w-10 h-10 rounded-full ${styles.pageination}`}
              >
                1
              </button>
              <button
                style={{ color: "#484848" }}
                className={`p-2 w-10 h-10 rounded-full ${styles.pageination}`}
              >
                2
              </button>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10  focus:outline-none"
        onClose={close}
      >
        <div
          style={{
            background: " rgba(0, 0, 0, 0.7)",
            transition: ".15s ease",
            willChange: "opacity",
          }}
          className="fixed  inset-0 z-10 w-screen overflow-y-auto"
        >
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full  max-w-md  bg-white p-6  duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <p
                style={{ fontStyle: "italic" }}
                className="mt-2  text-sm/6 logout-innerdialog "
              >
                There aren't any promotion packages available at the moment.
              </p>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Suspense>
  );
};
export default MijnListings;
