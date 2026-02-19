import React from 'react'
import styles from './template7.module.css';
import "./template7.css";
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Section5 from './Section5';

export default function Screen({ userDetails }) {
  return (
    <section className={styles.screen}>
      <Section1 userDetails={userDetails} />
      <Section2 userDetails={userDetails} />
      <Section3 userDetails={userDetails} />
      <Section4 userDetails={userDetails} />
      <Section5 userDetails={userDetails} />
    </section>
  )
}
