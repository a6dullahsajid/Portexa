import React from 'react'
import styles from './template5.module.css'

export default function Navbar({ details }) {
  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
        <a className={styles.menu} href="#section1">Home</a>
        <a className={styles.menu} href="#section2">About</a>
        <a className={styles.menu} href="#section3">{details.experience.length !== 0 ? 'Experience' : ''}</a>
        <a className={styles.menu} href="#section4">Projects</a>
        <a className={styles.menu} href="#section5">Contact</a>
      </div>
    </div>
  )
}
