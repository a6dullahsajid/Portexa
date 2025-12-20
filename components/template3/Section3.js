"use client";
import React from 'react'
import styles from "./template3.module.css";
import { useState } from 'react';

export default function Section3({ userDetails }) {
  const [companyIndex, setCompanyIndex] = useState(0);
  function handleActiveCompany(index) {
    setCompanyIndex(index);
  }
  return (userDetails.experience.length !== 0 && <section id="section3" className={`${styles.section} ${styles.section3}`}>
      <div className={styles.heading}>
        <h4>Where I&apos;ve Worked</h4>
        <div className={styles.hline}></div>
      </div>
      <div className={styles.work}>
        <div className={styles.workLeft}>
          <ol className={styles.companyList}>
            {userDetails.experience.slice().reverse().map((each, index) => {
              return <li key={index} onClick={() => handleActiveCompany(index)} style={{ fontWeight: companyIndex === index && "bold" }}>
                {index + 1}.{each.company.split(" ").slice(0, 2).join(" ")}
              </li>
            })}
          </ol>
        </div>
        <div className={styles.companyContent}>
          <h2>{userDetails.experience[companyIndex].position}
            <span className={styles.highlight}> @{userDetails.experience[companyIndex].company}</span>
          </h2>
          <p>{userDetails.experience[companyIndex].from}-{userDetails.experience[companyIndex].to}</p>
          <ul className={styles.companyAbout}>
            {userDetails.experience[companyIndex].work
              .split(".")
              .map((sentence, index) => sentence.trim())
              .filter(sentence => sentence.length > 0)
              .map((sentence, index) => (
                <li key={index}>{sentence}.</li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
