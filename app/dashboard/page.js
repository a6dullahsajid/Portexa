"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import styles from "./dashboard.module.css";
import "./dashboard.css";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { setTemplate, setUserName, initializeUserData } from "@/store/userDataSlice";

const templates = [
    { id: "template1", name: "Classic", img: "/portfolioExamples/example_1.png", preview: "https://a6dullahsajid.github.io/Portfolio/" },
    { id: "template2", name: "Minimal", img: "/portfolioExamples/example_2.png", preview: "https://sanskritirathaur.github.io/Portfolio/" },
    { id: "template3", name: "Modern", img: "/portfolioExamples/example_3.png", preview: "https://portfolio-ali-arshad-khan.netlify.app/" },
    { id: "template4", name: "Dark", img: "/portfolioExamples/example_4.png", preview: "https://www.adeolabadero.me/" },
    { id: "template5", name: "Midnight", img: "/portfolioExamples/example_5.png", preview: "https://www.adeolabadero.me/" },
];


export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const dispatch = useDispatch();
    const [isLoadingUserData, setIsLoadingUserData] = useState(false);


    const fetchUserData = useCallback(async () => {
        setIsLoadingUserData(true);
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
        } finally {
            setIsLoadingUserData(false);
        }
    }, [dispatch]);

    useEffect(() => {
        if (status === "authenticated" && session?.user?.email) {
            fetchUserData();
            dispatch(setUserName(session.user.email.split("@")[0]));
        }
    }, [status, session, fetchUserData, dispatch]);

    const selectTemplate = (templateId) => {
        dispatch(setTemplate(templateId));
        if (session) {
            router.push(`/dashboard/form`);
        } else {
            router.push('/login');
        }
    };

    if (status === "loading" || isLoadingUserData) {
        return (
            <div className={styles.dashboardContainer}>
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingSpinner}></div>
                    <h2 className={styles.loadingTitle}>Loading Your Dashboard</h2>
                    <p className={styles.loadingSubtitle}>
                        {status === "loading" 
                            ? "Welcome back! Setting up your workspace..." 
                            : "Crafting your perfect portfolio experience..."
                        }
                    </p>
                    <div className={styles.loadingDots}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        );
    }

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Portexa Portfolio Dashboard",
        "description": "Create your professional portfolio with our easy-to-use dashboard. Choose from 3 stunning templates - Classic, Minimal, and Modern.",
        "url": "https://portexa.vercel.app/dashboard",
        "applicationCategory": "Portfolio Builder",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "creator": {
            "@type": "Organization",
            "name": "Portexa"
        },
        "featureList": [
            "Template Selection",
            "Portfolio Builder",
            "Professional Templates",
            "Easy Customization"
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <main className={styles.dashboard}>
                <Navbar />
                <div className={styles.dashboardContainer}>
                    <div className={styles.heading}>
                        <h1>Choose a Template</h1>
                        <p>Select a starting point. You can always change it later.</p>
                    </div>
                <div className={styles.templateContainer}>
                    {templates.map((tpl, index) => (
                        <div className={styles.templateCard}
                            key={tpl.id}
                            style={{ '--card-index': index }}
                        >
                            <div className={styles.templateCardImageContainer}>
                                <Image
                                    onClick={() => selectTemplate(tpl.id)}
                                    src={tpl.img}
                                    alt={tpl.name}
                                    fill
                                />
                            </div>
                            <div className={styles.tempTextContainer}>
                                <p>{tpl.name}</p>
                                <a className={styles.tempPrevButton} href={tpl.preview} target="_blank" rel="noopener noreferrer">Preview</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
        </>
    );
}