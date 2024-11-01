"use client";
import styles from ".././page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceFrownOpen,
  faHeart,
  faShareNodes,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const Gekoppeld = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  let [isOpen, setIsOpen] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const tableData = [
    {
      id: 1,
      onderwerp: "Interne Notitie",
      datum: "2024-09-21",
      medewerker: "Beau Caffa",
      bericht:
        "Klant is opzoek naar een Jacht met minimaal 500 pk, in de kleur wit, er is al 1 jacht gekop....",
      tags: ["Tag1", "Tag2", "Tag3"],
    },
    {
      id: 2,
      onderwerp: "Bezichtiging",
      datum: "2024-10-01",
      medewerker: "Beau Caffa",
      bericht:
        "Klant is opzoek naar een Jacht met minimaal 500 pk, in de kleur wit, er is al 1 jacht gekop....",
      tags: ["Tag1", "Tag2", "Tag3"],
    },
    {
      id: 3,
      onderwerp: "Onderhoud",
      datum: "2024-09-30",
      medewerker: "Beau Caffa",
      bericht:
        "Klant is opzoek naar een Jacht met minimaal 500 pk, in de kleur wit, er is al 1 jacht gekop....",
      tags: ["Tag1", "Tag2", "Tag3"],
    },
  ];

  const [data, setData] = useState(tableData);
  const [expandedRow, setExpandedRow] = useState(null); // Track which row is expanded
  const [sortOrder, setSortOrder] = useState("asc");
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote"],
    ],
  };
  // Function to sort data by 'datum'
  const sortByDate = () => {
    const sortedData = [...data].sort((a, b) => {
      return sortOrder === "asc"
        ? new Date(a.datum) - new Date(b.datum)
        : new Date(b.datum) - new Date(a.datum);
    });
    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
  };

  const toggleRow = (id) => {
    // Toggle expanded row by its ID
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <div className="flex items-center justify-center">
          <button
            style={{
              padding: "0 7px",
              borderColor: "red",
              border: "1.5px solid",
              borderRadius: "20px",
              lineHeight: "17px",
              height: "32px",
              width: "7em",
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
              icon={faHeart}
            />{" "}
            Favoriet
          </button>
          <button
            style={{
              padding: "0 7px",
              borderColor: "red",
              color: "#242429",
              border: "1.5px solid",
              borderRadius: "20px",
              lineHeight: "17px",
              height: "32px",
              width: "7em",
              paddingTop: "0.5em",
              paddingBottom: "1.5em",
            }}
            className="mx-2 p-2 bg-white border rounded-ful"
          >
            <FontAwesomeIcon
              style={{
                color: "gray",
              }}
              icon={faShareNodes}
            />{" "}
            Delen
          </button>
          <button
            style={{
              padding: "0 7px",
              borderColor: "red",
              color: "#242429",
              border: "1.5px solid",
              borderRadius: "20px",
              lineHeight: "17px",
              height: "32px",
              width: "8em",
              paddingTop: "0.5em",
              paddingBottom: "1.5em",
            }}
            className="mx-2 p-2 py2 bg-white border rounded-ful"
          >
            <FontAwesomeIcon
              style={{
                color: "gray",
              }}
              icon={faCircleExclamation}
            />{" "}
            Rapporteren
          </button>
        </div>
        <div style={{ minHeight: "53vh" }} className="flex items-center text-gray-900 justify-center min-h-screen">
          <div className="text-center -mt-10">
            <FontAwesomeIcon
              style={{
                color: "gray",
                fontSize: "3rem",
              }}
              icon={faFaceFrownOpen}
            />
            <div className="mt-2">
              {" "}
              There are no listings matching your search.
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
export default Gekoppeld;
