import React from 'react'
import styles from "./template7.module.css";
import "./template7.css";
import Navbar from './Navbar';
import Screen from './Screen';


export default function Homepage7({ userData }) {
  return (
    <main className={styles.root}>
      <Navbar details={userData.details} />
      <Screen userDetails={userData.details} />
    </main>
  )
}
