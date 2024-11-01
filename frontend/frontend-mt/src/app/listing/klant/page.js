import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPencil,
    faHeart,
    faShareNodes,
    faLayerGroup,
    faGripHorizontal,
    faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRef } from 'react';
import Klant from "../../../img/klanten.png";
const KlantPage = () => {
    const addressRef = useRef();

    const handleClick = () => {
        // Extract the text content of the span containing the address
        const address = addressRef.current.innerText;

        // Replace spaces with '+' to create a valid Google Maps URL
        const formattedAddress = encodeURIComponent(address);

        // Navigate to the Google Maps route with the formatted address
        window.open(`http://maps.google.com/maps?daddr=${formattedAddress}`, '_blank');
    };
    return (
        <div>
            <div className="flex items-center justify-center">
                <button onClick={handleClick}
                    style={{
                        padding: "0 7px",
                        borderColor: "red",
                        border: "1.5px solid rgba(0,0,0,.15)",
                        borderRadius: "20px",
                        lineHeight: "17px",
                        height: "32px",
                        fontSize: "14px",
                        color: "#242429",
                        paddingTop: "0.5em",
                        paddingBottom: "1.5em",
                    }}
                    className="mx-2 p-2 bg-white border rounded-ful"
                >
                    <FontAwesomeIcon
                        style={{
                            color: "gray",
                        }}
                        icon={faLocationPin}
                    />{" "}
                    Routebeschrijving
                </button>
                <button
                    style={{
                        padding: "0 7px",
                        borderColor: "red",
                        color: "#242429",
                        border: "1.5px solid rgba(0,0,0,.15)",
                        borderRadius: "20px",
                        lineHeight: "17px",
                        height: "32px",
                        fontSize: "14px",
                        paddingTop: "0.5em",
                        paddingBottom: "1.5em",
                    }}
                    className="mx-2 p-2 bg-white border rounded-ful"
                >
                    <FontAwesomeIcon
                        style={{
                            color: "gray",
                        }}
                        icon={faHeart}
                    />{" "}
                    Favorieten
                </button>
            </div>
            <div className="flex justify-center">
                <div
                    style={{ maxWidth: "100%" }}
                    className="text-gray-700 bg-white flex justify-center shadow-md rounded-lg overflow-hidden"
                >
                    <div style={{ width: "76vw", fontSize: "14px", color: "#242429" }} className="p-4">
                        <h2 className=" font-bold mb-2">
                            <FontAwesomeIcon
                                icon={faGripHorizontal}
                                className="mr-2"
                            />{" "}

                            Klant Gegevens

                        </h2>

                        <div className="mb-2 flex justify-between">
                            <span >Aanhef</span>
                            <span>Nick</span>
                        </div>
                        <hr className="my-3" />
                        <div className="mb-2 flex justify-between">
                            <span >Voornaam</span>
                            <span>Nick</span>
                        </div>
                        <hr className="my-3" />
                        <div className="mb-2 flex justify-between">
                            <span >Achternaam</span>
                            <span>Vendel</span>
                        </div>
                        <hr className="my-3" />
                        <div className="mb-2 flex justify-between">
                            <span >Tel. Mobiel</span>
                            <span>0628778301</span>{" "}
                        </div>
                        <hr className="my-3" />
                        <div className="mb-2 flex justify-between">
                            <span >E-mail</span>
                            <span>
                                nick@nivendmedia.nl </span>{" "}
                        </div>
                        <hr className="my-3" />
                        <div className="mb-2 flex justify-between">
                            <span >Naam bedrijf</span>
                            <span>Nivendmedia</span>{" "}
                        </div>
                        <hr className="my-3" />
                        <div className="mb-2 flex justify-between">
                            <span >Adres Bedrijf</span>
                            <span ref={addressRef}>
                                Youri Egorovweg 19, 1311 LT Almere</span>{" "}
                        </div>
                        <hr className="my-3" />
                        <div className="mb-2 flex justify-between">
                            <span >Ingevulde Notities</span>
                            <span>
                                Nieuwe Klant</span>{" "}
                        </div>

                    </div>
                </div>
            </div>
            <div className="flex mt-2 justify-center">
                <div
                    style={{ maxWidth: "100%" }}
                    className="text-gray-700 bg-white shadow-md rounded-lg overflow-hidden"
                >
                    <div style={{ width: "76vw", fontSize: "14px", color: "#242429" }} className="p-4">
                        <h2 className="font-bold mb-2">
                            <FontAwesomeIcon
                                icon={faLayerGroup}
                                className="mr-2"
                            />{" "}
                            Gekoppelde (zeil)jacht

                        </h2>

                        <div className="mb-2 flex justify-between">
                            <button style={{ width: "100%" }}>
                                <div
                                    style={{ width: "2.5em", height: "2.5em" }}
                                    className="flex items-center"
                                >
                                    <Image width={500} height={500} src={Klant.src} alt="Icon" />
                                    <span style={{ color: "#242429", fontSize: "14px" }} className="font-semibold ml-2">MT000097</span>
                                </div>
                            </button>
                        </div>


                    </div>
                </div>
            </div></div>


    );
};
export default KlantPage;