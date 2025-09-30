"use client";
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import styles from "@/app/globals.module.css";

export default function StartButton() {
    const [isStarting, setIsStarting] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    function handleClick() {
        setIsStarting(true);
        
        if (session) {
            router.push('/dashboard');
        } else {
            router.push('/login');
        }
    }

    return (
        <button className={styles.section1button} onClick={handleClick} disabled={isStarting}>
            {isStarting ? (
                <>
                     {"Getting started"} <span className={styles.dotLoader}></span>
                </>
            ) : (
             "Get started"
            )}
        </button>
    );
}