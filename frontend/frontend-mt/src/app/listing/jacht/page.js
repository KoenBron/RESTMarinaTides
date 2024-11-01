"use client";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faShareNodes,
    faCircleExclamation,
    faGripHorizontal,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
const JachtPage = ({ boats }) => {
    useEffect(() => {
        console.log("jacht page:", boats);
    }, [boats]);

    return (
        <div className="flex justify-center">
            <div
                style={{ maxWidth: "100%" }}
                className="text-gray-700 bg-white shadow-md rounded-lg overflow-hidden"
            >
                {Array.isArray(boats) && boats.length > 0 ? (
                    boats.map((boat) => (
                        <div key={boat.id} style={{ width: "76vw" }} className="p-4">
                            <h2 className="text-lg font-bold mb-2">
                                <FontAwesomeIcon
                                    icon={faGripHorizontal}
                                    className="mr-2"
                                />{" "}
                                Technische Specificaties
                            </h2>

                            <div className="mb-2 flex justify-between">
                                <span>Prijs in euro</span>
                                <span>eur {boat.price}</span>
                            </div>
                            <hr className="my-4" />
                            <div className="mb-2 flex justify-between">
                                <span>Status</span>
                                <span>{boat.status || 'Unknown Status'}</span>
                            </div>
                            <hr className="my-4" />
                            <div className="mb-2 flex justify-between">
                                <span>Yacht Type</span>
                                <span>{boat.yacht_type || 'Unknown Yacht Type'}</span>
                            </div>
                            <hr className="my-4" />
                            <div className="mb-2 flex justify-between">
                                <span>Description</span>
                                <span>{boat.description || 'Unknown Description'}</span>
                            </div>
                        </div>
                    ))
                ) : boats && typeof boats === 'object' ? (
                    <div style={{ width: "76vw" }} className="p-4">
                        <h2 className="text-lg font-bold mb-2">
                            <FontAwesomeIcon
                                icon={faGripHorizontal}
                                className="mr-2"
                            />{" "}
                            Technische Specificaties
                        </h2>

                        <div className="mb-2 flex justify-between">
                            <span>Prijs in euro</span>
                            <span>eur {boats.price}</span> {/* Use boats directly */}
                        </div>
                        <hr className="my-4" />
                        <div className="mb-2 flex justify-between">
                            <span>Model</span>
                            <span>{boats.model || 'Unknown Model'}</span>
                        </div>
                        <hr className="my-4" />
                        <div className="mb-2 flex justify-between">
                            <span>Bouwjaar</span>
                            <span>{boats.year || 'Unknown Year'}</span>
                        </div>
                        <hr className="my-4" />
                        <div className="mb-2 flex justify-between">
                            <span>Motor</span>
                            <span>{boats.engine || 'Unknown Engine'}</span>
                        </div>
                    </div>
                ) : (
                    <div>No boats available.</div>
                )}
            </div>
        </div>
    );
};

export default JachtPage;
