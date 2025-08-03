import React from 'react'
import styles from "./template2.module.css";

export default function NavBar({ experience }) {
  return (
    <div className={styles.left}>
      <nav className={styles.nav}>
        <div className={styles.menuContainer}>
          <a href="#section1"><img src="/template1/home.svg" alt="home" />Home</a>
        </div>
        <div className={styles.menuContainer}>
          <a href="#section2"><img src="/template1/about.svg" alt="about" />About</a>
        </div>
        {experience.length !== 0 && <div className={styles.menuContainer}>
          <a href="#section3"><img src="/template1/experience.svg" alt="experience" />Experience</a>
        </div>}
        <div className={styles.menuContainer}>
          <a href="#section4"><img src="/template1/project.svg" alt="project" />Projects</a>
        </div>
        <div className={styles.menuContainer}>
          <a href="#section5"><img src="/template1/contact.svg" alt="contact" />Contact</a>
        </div>
      </nav >
    </div >
  )
}
