"use client";
import Navbar from "../../components/navbar";
import styles from "./page.module.css";
import Notities from "./notities/page";
import Gekoppeld from "./gekoppeld/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faHeart,
  faShareNodes,
  faCircleExclamation,
  faGripHorizontal,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import KlantBG from "../../img/klantcardbg.png";
import Klant from "../../img/klanten.png";
import Image from "next/image";
import Jacht from "../../img/jachtcardbg.png";
import JachtPage from "./jacht/page.js";
import KlantPage from "./klant/page";
import ListingTab from "../../components/ListingTab";
import { useSearchParams, usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
const Listings = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const nameYacht = searchParams.get("nameYacht");
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("profile");
  const router = useRouter();
  const [boats, setBoats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let namePage;
  let tabLinked;
  let tabLinked2;
  let icon;
  let entityPage;
  if (nameYacht) {
    namePage = nameYacht;
    tabLinked = "Gerelateerde Listings";
    tabLinked2 = "(Zeil)jacht Profiel"
    icon = Jacht;
    entityPage = "Jacht";
  } else if (name) {
    namePage = name;
    tabLinked = "Gekoppelde (zeil)jacht";
    tabLinked2 = "Profielgegevens";
    icon = Klant;
    entityPage = "Klant";
  } else {
    namePage = "Unknown";
    tabLinked2 = "";
    tabLinked = "Gekoppelde jacht/klant";
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true); // Start loading
    fetch("http://127.0.0.1:8000/base/boat/" + nameYacht + "/", {
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
        setBoats(data); // Set boats data
        console.log(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false); // Set loading to false regardless of success or error
      });
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Navbar />
        <div className="">
          <div
            style={{
              backgroundImage: `url(${KlantBG.src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "66vh",
              position: "relative",
            }}
          >
            <div
              style={{
                paddingTop: "20em",
                paddingLeft: "2em",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginRight: "2em",
                position: "absolute",
                bottom: "0",
                width: "100%",
                paddingBottom: "1em",
              }}
            >
              <div>
                <h2
                  className={`text-left flex items-center mb-7 ${styles.welcomeText}`}
                >
                  <div
                    style={{ width: "2.5em", height: "2.5em" }}
                    className="w-10 h-10 rounded-full overflow-hidden bg-white "
                  >
                    <Image src={icon} alt="Icon" />
                  </div>
                  <span className="ml-3 text-white font-bold">{boats.name}</span>
                  <div
                    style={{ width: "1em", height: "1em", marginLeft: "0.4em" }}
                    className="w-5 h-5 border rounded-full overflow-hidden bg-transparent"
                  >
                    <FontAwesomeIcon
                      style={{
                        color: "white",
                        width: "0.9em",
                        height: "0.4em",
                        paddingBottom: "0.55em",
                      }}
                      icon={faPencil}
                    />
                  </div>
                </h2>
              </div>

              {entityPage === "Jacht" ? (
                <div style={{ marginTop: "2em" }} className="text-right mr-3">
                  <div className="text-gray-400 text-left">Prijs</div>
                  <div className="text-white font-bold">€{boats.price}</div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <ListingTab
            name={namePage}
            tabLinked={tabLinked}
            tabLinked2={tabLinked2}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            entity={entityPage}
          />
          <div style={{ margin: "2em" }} className="grid grid-cols-1 gap-4">

            {activeTab === "profile" && (
              <div>
                {entityPage === "Jacht" ? (
                  <div className="flex items-center justify-center">
                    {loading ? ( // Check if still loading
                      <div>Loading...</div> // Show loading indicator
                    ) : (
                      <JachtPage boats={boats} /> // Render JachtPage when loading is done
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <KlantPage />
                  </div>
                )}
              </div>
            )}
            {activeTab === "linked" && <Gekoppeld />}
            {activeTab === "notities" && <Notities />}
          </div>
        </div>
      </div>
    </Suspense>
  );
};
export default Listings;
