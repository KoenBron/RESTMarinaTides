"use client";
import Tabs from "../../components/Tabs";
import Link from "next/link";
import styles from "../mijn-account/page.module.css";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faPerson,
  faEye,
  faCompass,
  faLaptop,
  faFlag,
  faLink,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import "chart.js/auto";
import { Roboto } from "next/font/google";
import Navbar from "@/components/navbar";
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});
const data = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Bekeken",
      data: [0, 59, 80, 0, 56],
      fill: false,
      borderColor: "#fc6e02",
      tension: 0.1,
    },
    {
      label: "Unieke kijkers",
      data: [0, 80, 80, 0, 56],
      fill: false,
      borderColor: "#0250ce",
      tension: 0.1,
    },
  ],
};

const AccountPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // If not on the client yet, don't render
  if (!isClient) {
    return null;
  }

  // Now safe to use useSearchParams
  const searchParams = isClient ? useSearchParams() : null;
   const filterByType = searchParams ? searchParams.get("filter_by_type") : null;
  return (
    <div>
      <Navbar />
      <Tabs />
      <div className="container mx-auto px-4">
        <h2 className={`text-left mb-7 ${styles.welcomeText}`}>
          Hallo, Nicky!
        </h2>

        <div style={{ margin: "5em" }} className="grid grid-cols-12 gap-4">
          {/* First Row: Two blue cards side by side */}
          <div className={`col-span-6 ${styles.blueCards}`}>
            <Link href="/mijn-account/mijn-listings" passHref>
              <div className="card text-white text-2xl flex justify-between items-center">
                <div>
                  0
                  <div className="card-body text-sm my-0.5">
                    Gepubliceerd Listings
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faList}
                  className={`text-5xl ${styles.cardsIcon}`}
                />
              </div>
            </Link>
          </div>

          <div className={`col-span-6 ${styles.blueCards}`}>
            <div className="card text-white text-2xl flex justify-between items-center">
              <div>
                0
                <div className="card-body text-sm my-0.5">
                  Bezoeken deze week
                </div>
              </div>
              <FontAwesomeIcon
                icon={faPerson}
                className={`text-5xl ${styles.cardsIcon}`}
              />
            </div>
          </div>

          {/* Left side: Cards (30% smaller with col-span-4) */}
          <div className="col-span-4 grid grid-rows-5 gap-4">
            <div className={`card ${styles.cardsAccount}`}>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faEye}
                  className={`${styles.cardsAccountIcon}`}
                />
                <span className={`ml-2 ${styles.cardsAccountTitle}`}>
                  Bekeken
                </span>
              </div>
              <div
                style={{ fontSize: "14px", marginTop: "1em" }}
                className="card-body"
              >
                The first vertical card under the blue card
              </div>
            </div>

            <div className={`card ${styles.cardsAccount}`}>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faEye}
                  className={`${styles.cardsAccountIcon}`}
                />
                <span className={`ml-2 ${styles.cardsAccountTitle}`}>
                  Unieke kijkers
                </span>
              </div>
              <div
                style={{ fontSize: "14px", marginTop: "1em" }}
                className="card-body"
              >
                Unieke kijkers
              </div>
            </div>

            <div className={`card ${styles.cardsAccount}`}>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faCompass}
                  className={`${styles.cardsAccountIcon}`}
                />
                <span className={`ml-2 ${styles.cardsAccountTitle}`}>
                  Aantal keer geklikt
                </span>
              </div>
              <div
                style={{ fontSize: "14px", marginTop: "1em" }}
                className="card-body"
              >
                No klik stats recorded yet.
              </div>
            </div>

            <div className={`card ${styles.cardsAccount}`}>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faLaptop}
                  className={`${styles.cardsAccountIcon}`}
                />
                <span className={`ml-2 ${styles.cardsAccountTitle}`}>
                  Apparaten
                </span>
              </div>
              <div
                style={{ fontSize: "14px", marginTop: "1em" }}
                className="card-body"
              >
                The first vertical card under the blue card
              </div>
            </div>

            <div className={`card ${styles.cardsAccount}`}>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faFlag}
                  className={`${styles.cardsAccountIcon}`}
                />
                <span className={`ml-2 ${styles.cardsAccountTitle}`}>
                  Top Landen
                </span>
              </div>
              <div
                style={{ fontSize: "14px", marginTop: "1em" }}
                className="card-body"
              >
                *insert top landen*
              </div>
            </div>
          </div>

          <div className="col-span-8">
            <div className={`card ${styles.cardsAccount}`}>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faPerson}
                  className={`${styles.cardsGraphIcon}`}
                />
                <span className={`ml-2 ${styles.cardsAccountTitle}`}>
                  Bezoeken
                </span>
              </div>
              <div style={{ fontSize: "14px" }} className="card-body">
                <div style={{ width: "100%", height: "27em" }}>
                  <Line data={data} />
                </div>
              </div>
            </div>
            <div className={`card ${styles.cardsAccount}`}>
              <Disclosure>
                {({ open }) => (
                  <>
                    {/* The card title (Topverwijzers) as the Disclosure button */}
                    <DisclosureButton className="w-full">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FontAwesomeIcon
                            icon={faLink}
                            className={`${styles.cardsAccountIcon}`}
                          />
                          <span className={`ml-2 ${styles.cardsAccountTitle}`}>
                            Topverwijzers
                          </span>
                        </div>
                        <FontAwesomeIcon
                          icon={open ? faChevronUp : faChevronDown}
                          className={`${styles.cardsAccountIcon}`}
                        />
                      </div>
                    </DisclosureButton>

                    {/* The collapsible content */}
                    <DisclosurePanel className="card-body mt-2">
                      <div style={{ fontSize: "14px" }}>*details summary*</div>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            </div>
            {/* New grid for the two cards under the graph */}
            <div className="grid grid-cols-12 gap-4 mt-4">
              {/* First card taking 6 columns (half width) */}
              <div className="col-span-6">
                <div className={`card ${styles.cardsAccount}`}>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faLaptop}
                      className={`${styles.cardsAccountIcon}`}
                    />
                    <span className={`ml-2 ${styles.cardsAccountTitle}`}>
                      Top Platforms
                    </span>
                  </div>
                  <div
                    style={{ fontSize: "14px", marginTop: "1em" }}
                    className="card-body"
                  >
                    top platforms
                  </div>
                </div>
              </div>

              {/* Second card taking 6 columns (half width) */}
              <div className="col-span-6">
                <div className={`card ${styles.cardsAccount}`}>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCompass}
                      className={`${styles.cardsAccountIcon}`}
                    />
                    <span className={`ml-2 ${styles.cardsAccountTitle}`}>
                      Top Browsers
                    </span>
                  </div>
                  <div
                    style={{ fontSize: "14px", marginTop: "1em" }}
                    className="card-body"
                  >
                    top browsers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
