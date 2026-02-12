import React from "react";
import Navbar from "@/components/template6/Navbar";
import Section1 from "@/components/template6/Section1";
import Section2 from "@/components/template6/Section2";
import Section3 from "@/components/template6/Section3";
import Section4 from "@/components/template6/Section4";
import Section5 from "@/components/template6/Section5";
import "@/components/template6/template6.css"; // load Bitter font first
import styles from "@/components/template6/template6.module.css";

export default function Homepage6({ userData }) {
  return (
    <div className={styles.root}>
      <Navbar details={userData.details} />
      <Section1 userDetails={userData.details} />
      <Section2 userDetails={userData.details} />
      {userData.details.experience.length !== 0 && <Section3 userDetails={userData.details} />}
      <Section4 userDetails={userData.details} />
      <Section5 userDetails={userData.details} />
    </div>
  );
}
