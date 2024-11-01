"use client";
import styles from ".././page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FaPencil,
  faPlus,
  faCaretUp,
  faCaretDown,
  faGrip,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Input,
} from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Notities = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  let [isOpen, setIsOpen] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
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
    {
      id: 4,
      onderwerp: "Prijsverandering",
      datum: "2024-09-30",
      medewerker: "Beau Caffa",
      bericht:
        "Klant is opzoek naar een Jacht met minimaal 500 pk, in de kleur wit, er is al 1 jacht gekop....",
      tags: ["Tag1", "Tag2", "Tag3"],
    },
    {
      id: 5,
      onderwerp: "Inverkoopname",
      datum: "2024-09-30",
      medewerker: "Beau Caffa",
      bericht:
        "Klant is opzoek naar een Jacht met minimaal 500 pk, in de kleur wit, er is al 1 jacht gekop....",
      tags: ["Tag1", "Tag2", "Tag3"],
    },
    {
      id: 6,
      onderwerp: "Verkocht",
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
      <div style={{ color: "black" }}>
        {/* Button Wrapper */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5em",
          }}
        >
          <button
            onClick={open}
            type="button"
            style={{
              border: "1px solid lightgray",
              padding: "8px 16px",
              borderRadius: "4px",
            }}
          >
            <FontAwesomeIcon
              style={{ color: "orange", marginRight: "1em" }}
              icon={faPlus}
            />
            Notitie toevoegen
          </button>
        </div>

        {/* Table Wrapper */}
        <div className="w-full">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Onderwerp
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Datum
                  <button
                    onClick={sortByDate}
                    className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded"
                  >
                    {sortOrder === "asc" ? "Oplopend" : "Aflopend"}
                  </button>
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Medewerker
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left w-[300px]">
                  Bericht
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <>
                  <tr key={item.id} className="odd:bg-white even:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">
                      {item.onderwerp}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {item.datum}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {item.medewerker}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 w-[300px]">
                      {item.bericht.slice(0, 20)}...
                      <button
                        onClick={() => toggleRow(item.id)}
                        className="ml-2 text-xs text-gray-500"
                      >
                        {expandedRow === item.id ? (
                          <FontAwesomeIcon icon={faCaretUp} />
                        ) : (
                          <FontAwesomeIcon icon={faCaretDown} />
                        )}
                      </button>
                      {/* Expanded content within the same row */}
                      {expandedRow === item.id && (
                        <div className="mt-2">
                          <p>{item.bericht}</p>
                          {/* Tags at the bottom of the expanded row */}
                          <div className="mt-2">
                            {item.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-block bg-gray-200 text-orange text-xs px-2 py-1 mr-2 mb-2 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full border max-w-4xl rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left Side */}
                <div className="w-full md:w-1/2">
                  <DialogTitle
                    as="h3"
                    className="text-base/7 font-bold  text-gray-900"
                  >
                    <FontAwesomeIcon
                      style={{ marginRight: "1em" }}
                      icon={faGrip}
                    />
                    Notitie aanmaken
                  </DialogTitle>

                  {/* Dropdowns */}
                  <div className="mt-4 space-y-4">
                    <select className="w-full py-1.5 px-3 border border-gray-300 rounded-md bg-white  text-gray-900 ">
                      <option>Onderwerp</option>
                    </select>
                    <div className="border px-3 rounded-md border-gray-300">
                      <label className="bg-white  text-gray-900">Datum</label>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="w-full rounded-md bg-white ml-1 text-gray-900 p-1 "
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                      />
                    </div>

                    <select className="w-full py-1.5 px-3 border border-gray-300 rounded-md bg-white text-gray-900">
                      <option>Medewerker</option>
                    </select>
                  </div>
                </div>

                {/* Right Side */}
                <div className="w-full md:w-1/2">
                  <h3 className="text-base/7 font-bold text-gray-900">
                    Bericht
                  </h3>

                  {/* Rich Text Editor */}
                  <div className="mt-4 mb-2">
                    {/* Add your rich text editor here */}
                    <ReactQuill
                      theme="snow"
                      value={editorContent}
                      onChange={setEditorContent}
                      modules={modules}
                      className="h-40 text-black"
                    />
                  </div>

                  <div className="mt-12">
                    <div className="mt-4 text-black font-bold flex justify-between">
                      <span>@ </span>
                      <Input
                        className="border mb-2 ml-1 py-1 text-sm border-gray-300 w-full focus:outline-none focus:border-blue-500"
                        name="address"
                        placeholder="Zoek op jacht"
                        style={{ marginRight: "14vw" }}
                      />{" "}
                    </div>

                    <span className="inline-block bg-white-200 border border-gray-300 rounded-md text-black text-bold text-xs px-2 py-1 mr-2 mb-2 rounded-full">
                      <strong> Linssen Grand 500</strong>
                    </span>
                    <span className="inline-block bg-white-200 border border-gray-300 rounded-md text-black text-bold text-xs px-2 py-1 mr-2 mb-2 rounded-full">
                      <strong> Grand Banks 43</strong>
                    </span>
                    <span className="inline-block  border border-gray-300 rounded-md bg-white-200 text-black text-bold text-xs px-2 py-1 mr-2 mb-2 rounded-full">
                      <strong> Nick Vendel</strong>
                    </span>
                  </div>
                  <div style={{ marginTop: "1em" }} className="mt-4">
                    <Button
                      className="inline-flex border border-gray-300 rounded-md items-center gap-2 rounded-md bg-white py-1.5 px-3 text-sm/6  text-gray-900 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-300 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-300"
                      onClick={close}
                    >
                      <FontAwesomeIcon
                        style={{ color: "orange", marginRight: "1em" }}
                        icon={faPlus}
                      />
                      Notitie aanmaken
                    </Button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Suspense>
  );
};
export default Notities;
