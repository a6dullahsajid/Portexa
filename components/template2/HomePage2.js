import React from 'react'
import NavBar from './NavBar'
import Screen from './Screen'

export default function HomePage2({ userData }) {
    return (
        <div>
            <NavBar />
            <Screen userData={userData.details}/>
        </div>
    )
}
