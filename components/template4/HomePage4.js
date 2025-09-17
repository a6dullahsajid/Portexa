import React from 'react'
import NavBar from './NavBar'
import Screen from './Screen'
import styles from './template4.module.css';
import './template4.css';

export default function HomePage4({ userData }) {
    return (
        <div className={styles.root}>
            <NavBar details={userData.details}/>
            <Screen userData={userData.details}/>
        </div>
    )
}
