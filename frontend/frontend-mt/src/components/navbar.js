"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faAddressBook,
  faCirclePlus,
  faCaretDown,
  faUser,
  faShip,
} from "@fortawesome/free-solid-svg-icons";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

// const items = [
//   { icon: null, label: "Featured" },
//   { icon: faUser, label: "Klanten", href: "new-categorie-klanten" },
//   {
//     icon: faShip,
//     label: "Elektrisch Jacht",
//     href: "new-categorie-elektrisch-jacht",
//   },
//   { icon: faShip, label: "Motor Jacht", href: "new-categorie-motorjacht" },
//   { icon: faShip, label: "Zeil Jacht", href: "new-categorie-zeiljacht" },
// ];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isTransparent = pathname === "/default";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const handleFocus = () => {
    setIsDropdownOpen(true);
  };
  // const handleBlur = () => {
  //   setIsDropdownOpen(false);
  // };

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: isTransparent ? "transparent" : "#123159",
      }}
    >
      <div className="navbar-container">
        <div className="navbar-left">
          <Link href="/default" className="navbar-logo">
            <Image src={logo.src} width={150} height={50} alt="logo" />
          </Link>
        </div>
        <div className="navbar-center">
          <div className="search-bar-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Zoek in mijn Marina Tides"
              className="search-input"
              onFocus={handleFocus}
            />
            {isDropdownOpen && (
              <div className="search-dropdown">
                {/* Featured (No Link) */}
                <div className="dropdown-item flex items-center p-2 hover:bg-gray-200">
                  <span>Featured</span>
                  <hr className="border-t border-gray-300 my-1 w-full" />
                </div>

                {/* Klanten */}
                <div className="dropdown-item flex items-center p-2 hover:bg-gray-200">
                  <Link legacyBehavior href="/new-categorie-klanten" passHref>
                    <a className="flex items-center">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="mr-2 dropdown-icon"
                      />
                      <span>Klanten</span>
                    </a>
                  </Link>
                </div>

                {/* Jachten */}
                <div className="dropdown-item flex items-center p-2 hover:bg-gray-200">
                  <Link legacyBehavior href="/new-categorie-jacht" passHref>
                    <a className="flex items-center">
                      <FontAwesomeIcon
                        icon={faShip}
                        className="mr-2 dropdown-icon"
                      />
                      <span>Jachten</span>
                    </a>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="navbar-links">
            <button
              onClick={() => router.push("/klant-toevoegen")}
              className="navbar-button transform transition-transform duration-200 hover:scale-110"
            >
              <FontAwesomeIcon icon={faAddressBook} className="button-icon" />{" "}
              Relatie toevoegen
            </button>

            <Link href="/listing-toevoegen" passHref>
              <button className="navbar-button transform transition-transform duration-200 hover:scale-110">
                <FontAwesomeIcon icon={faCirclePlus} className="button-icon" />{" "}
                Plaats je (Zeil)Jacht
              </button>
            </Link>
          </div>
        </div>
        <div className="navbar-right">
          <div className="profile-container">
            <Menu as="div" className="relative inline-block text-left">
              <div className="profile">
                <img
                  src="https://ui-avatars.com/api/?name=Nicky+Tab&background=3dc1d3&color=fff"
                  alt="Profile"
                  className="profile-picture"
                />
                <MenuButton className="inline-flex w-full justify-center text-white px-3 py-3 text-sm font-semibold text-gray-900 ">
                  Nicky{" "}
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    className="mt-1 down-arrow"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  {/* <MenuItem>
                    <Link legacyBehavior href="/mijn-account">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      >
                        Mijn Account
                      </a>
                    </Link>
                  </MenuItem> uncomment to view account page  */}
                  <MenuItem>
                    <Link legacyBehavior href="/mijn-account/mijn-listings">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      >
                        Mijn (Zeil)jachten
                      </a>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link legacyBehavior href="/mijn-account/mijn-listings">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      >
                        Mijn Relaties
                      </a>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link legacyBehavior href="/account-gegevens">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      >
                        Account gegevens
                      </a>
                    </Link>
                  </MenuItem>

                  <form action="#" method="POST">
                    <MenuItem>
                      <Button
                        onClick={open}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      >
                        Logout
                      </Button>
                    </MenuItem>
                  </form>
                </div>
              </MenuItems>
            </Menu>
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
                    className="w-full border max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
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
                        style={{ backgroundColor: "ff7000" }}
                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                        onClick={close}
                      >
                        Annuleer
                      </Button>
                      <Link legacyBehavior href="/">
                        <Button
                          className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                          onClick={close}
                        >
                          Uitloggen
                        </Button>
                      </Link>
                    </div>
                  </DialogPanel>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
