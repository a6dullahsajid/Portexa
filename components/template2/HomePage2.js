import React from 'react'
import NavBar from './NavBar'
import Screen from './Screen'
import styles from './template2.module.css';

export default function HomePage2({ userData }) {
    return (
        <div className={styles.root}>
            <NavBar experience={userData.details.experience}/>
            <Screen userData={userData.details}/>
        </div>
    )
}
