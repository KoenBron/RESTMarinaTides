"use client";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import styles from "./Tabs.module.css";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const Tabs = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filterByType = searchParams.get("filter_by_type");
  let [isOpen, setIsOpen] = useState(false);
  const handleFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleBlur = () => {
    setIsDropdownOpen(false);
  };

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  return (
    <div className={styles.tabs}>
      {/* <Link legacyBehavior href="/mijn-account">
        <a className={pathname === "/mijn-account" ? styles.active : ""}>
          Mijn account
        </a>
      </Link> uncomment to view account page */}
      <Link
        legacyBehavior
        href="/mijn-account/mijn-listings?filter_by_type=cars-for-sale"
      >
        <a className={filterByType === "cars-for-sale" ? styles.active : ""}>
          Mijn (zeil)jachten
        </a>
      </Link>
      <Link
        legacyBehavior
        href="/mijn-account/mijn-listings/?filter_by_type=klant-toevoegen"
      >
        <a className={filterByType === "klant-toevoegen" ? styles.active : ""}>
          Mijn relaties
        </a>
      </Link>
      <Link legacyBehavior href="/account-gegevens">
        <a
          className={
            pathname.startsWith("/account-gegevens") ? styles.active : ""
          }
        >
          Account gegevens
        </a>
      </Link>

      <Button
        onClick={open}
        style={{ color: "black", fontWeight: "bold" }}
        className={pathname.startsWith("/logout") ? styles.active : ""}
      >
        Logout
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10  focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full logout-dialog max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium logout-innerdialog "
              >
                Bevestigen en uitloggen
              </DialogTitle>
              <p className="mt-2 text-sm/6 logout-innerdialog ">
                Weet je zeker dat je wilt uitloggen?
              </p>
              <div className="mt-4 flex justify-between">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Annuleer
                </Button>

                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Uitloggen
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Tabs;
