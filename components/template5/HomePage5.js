import React from 'react'
import Navbar from './Navbar.js'
import styles from './template5.module.css';
import './template5.css';
import Section1 from './Section1.js';
import Section2 from './Section2.js';
import Section3 from './Section3.js';
import Section4 from './Section4.js';
import Section5 from './Section5.js';

export default function HomePage5({ userData }) {
    return (
        <div className={`${styles.root}`}>
            <Navbar details={userData.details}/>
            <Section1 userDetails={userData.details}/>
            <Section2 userDetails={userData.details}/>
            <Section3 userDetails={userData.details}/>
            <Section4 userDetails={userData.details}/>
            <Section5 userDetails={userData.details}/>
        </div>
    )
}
