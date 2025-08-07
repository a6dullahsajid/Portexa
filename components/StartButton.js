"use client";
import React from 'react';
import { useState } from 'react';
import styles from "@/app/globals.module.css";

export default function StartButton() {
    const [isStarting, setIsStarting] = useState(false);

    function handleClick() {
        setIsStarting(true);
    }

    return (
        <button className={styles.section1button} onClick={handleClick} disabled={isStarting}>
            {isStarting ? (
                <>
                    Getting started <span className={styles.dotLoader}></span>
                </>
            ) : (
                "Get started"
            )}
        </button>
    );
}