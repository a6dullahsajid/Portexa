"use client";
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import styles from "@/app/globals.module.css";

export default function StartButton({text}) {
    const [isStarting, setIsStarting] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    function handleClick() {
        setIsStarting(true);
        router.push('/dashboard');
    }

    return (
        <button className={styles.section1button} onClick={handleClick} disabled={isStarting}>
            {isStarting ? (
                <>
                    {"Getting started"} <span className={styles.dotLoader}></span>
                </>
            ) : (
                text
            )}
        </button>
    );
}