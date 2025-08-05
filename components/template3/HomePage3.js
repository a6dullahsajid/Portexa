import React from 'react'
import Header from './Header';
import Screen from './Screen';
import styles from "./template3.module.css";
import "./template3.css";

export default function HomePage3({ userData }) {
  return (
    <div className={styles.root}>
      <Header experience={userData.details.experience} image={userData.details.profileImage} resume={userData.details.resume}/>
      <Screen userDetails={userData.details} />
    </div>
  )
}
