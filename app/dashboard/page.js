"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import styles from "./dashboard.module.css";
import "./dashboard.css";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import { setTemplate, setUserName, initializeUserData } from "@/store/userDataSlice";

const templates = [
    { id: "template1", name: "Classic", img: "/portfolioExamples/example_1.png", preview: "https://a6dullahsajid.github.io/Portfolio/" },
    { id: "template2", name: "Minimal", img: "/portfolioExamples/example_3.png", preview: "https://sanskritirathaur.github.io/Portfolio/" },
    { id: "template3", name: "Modern", img: "/portfolioExamples/example_2.png", preview: "https://portfolio-ali-arshad-khan.netlify.app/" },
];


export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const dispatch = useDispatch();


    const fetchUserData = useCallback(async () => {
        try {
            const res = await fetch("/api/getUserData", {
                method: "GET",
                credentials: "include"
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.message || "Failed to fetch user data.");
            }
            if (data.user) {
                dispatch(initializeUserData(data.user));
            }
        } catch (err) {
            console.log("Error loading user:", err.message);
        }
    }, [dispatch]);

    useEffect(() => {
        if (status === "authenticated" && session?.user?.email) {
            fetchUserData();
            dispatch(setUserName(session.user.email.split("@")[0]));
        }
    }, [status, session, fetchUserData]);

    const selectTemplate = (templateId) => {
        dispatch(setTemplate(templateId));
        if (session) {
            router.push(`/dashboard/form`);
        } else {
            router.push('/login');
        }
    };

    if (status === "loading") {
        return (
            <div className={styles.loadingContainer}>
                <p>Loading Dashboard...</p>
            </div>
        );
    }

    if (status === "unauthenticated") {
        router.push('/login');
        return null;
    }

    return (
        <main className={styles.dashboard}>
            <Navbar />
            <div className={styles.dashboardContainer}>
                <h1>Choose a Template</h1>
                <div className={styles.templateContainer}>
                    {templates.map((tpl) => (
                        <div className={styles.templateCard}
                            key={tpl.id}
                            onClick={() => selectTemplate(tpl.id)}
                        >
                            <Image
                                src={tpl.img}
                                alt={tpl.name}
                                width={400}
                                height={250}
                                style={{ pointerEvents: "none" }}
                            />
                            <div className={styles.tempTextContainer}>
                                <p>{tpl.name}</p>
                                <a className={styles.tempPrevButton} href={tpl.preview} target="_blank" rel="noopener noreferrer">Preview</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}