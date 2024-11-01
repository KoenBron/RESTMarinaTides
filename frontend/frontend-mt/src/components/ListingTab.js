"use client";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import styles from "./Tabs.module.css";
import pageStyles from "./ListingTab.module.css";

const ListingTab = ({ name, tabLinked, tabLinked2, activeTab, onTabChange, entity }) => {
  return (
    <div className={pageStyles.listingtabs}>
      {/* Profile Tab */}
      <a
        onClick={() => onTabChange("profile")} // Update active tab
        className={activeTab === "profile" ? styles.active : ""}
      >
        {tabLinked2}
      </a>

      {/* Linked Tab */}
      <a
        onClick={() => onTabChange("linked")} // Update active tab
        className={activeTab === "linked" ? styles.active : ""}
      >
        {tabLinked}
        <span className={pageStyles.AmountNumber}> 0</span>
      </a>

      {/* Notities Tab */}
      {entity === "Jacht" ? (
        <a
          onClick={() => onTabChange("notities")} // Update active tab
          className={activeTab === "notities" ? styles.active : ""}
        >
          Notitie(s)
        </a>
      ) : (
        ""
      )}
    </div>
  );
};

export default ListingTab;
