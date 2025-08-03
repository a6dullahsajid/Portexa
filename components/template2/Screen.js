import React from 'react'
import styles from './template2.module.css';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Section5 from './Section5';

export default function Screen({ userData }) {
  return (
    <main className={styles.right}>
      <Section1 userDetails={userData} />
      <Section2 userDetails={userData} />
      {userData.experience.length !== 0 && <Section3 userDetails={userData} />}
      <Section4 userDetails={userData} />
      <Section5 userDetails={userData} />
    </main>
  )
}
