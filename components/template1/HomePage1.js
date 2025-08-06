import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import Screen from './Screen';
import styles from "./template1.module.css";
import './template1.css';

export default function HomePage1({ userData }) {
    return (
        <div className={styles.root}>
            <Header logoImage={userData.details.profileImage}/>
            <NavBar experience={userData.details.experience}/>
            <Screen userData={userData} />
        </div>
    );
}
