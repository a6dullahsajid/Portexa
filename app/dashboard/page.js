"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import styles from "./dashboard.module.css";
import "./dashboard.css";
import { useSession } from "next-auth/react";
import { setTemplate } from "@/store/userDataSlice";
import { useDispatch } from "react-redux";
const templates = [
    { id: "template1", name: "Classic", img: "/portfolioExamples/example_1.png", preview: "/preview_template1" },
    { id: "template2", name: "Apex", img: "/portfolioExamples/example_2.png", preview: "/preview_template2" },
    { id: "template3", name: "Modern", img: "/portfolioExamples/example_3.png", preview: "/preview_template3" },
    { id: "template4", name: "Dark", img: "/portfolioExamples/example_4.png", preview: "/preview_template4" },
    { id: "template5", name: "Midnight", img: "/portfolioExamples/example_5.png", preview: "preview_template5" },
    { id: "template6", name: "Canvas", img: "/portfolioExamples/example_6.png", preview: "/preview_template6" },
    { id: "template7", name: "Cyanic", img: "/portfolioExamples/example_7.png", preview: "/preview_template7" },
];


export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const dispatch = useDispatch();

    const selectTemplate = (templateId) => {
        dispatch(setTemplate(templateId));
        if (session) {
            router.push(`/dashboard/form`);
        } else {
            router.push('/login');
        }
    };


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
                                <button 
                                    className={styles.tempPrevButton} 
                                    onClick={() => window.open(tpl.preview, '_blank', 'noopener,noreferrer')}
                                >
                                    Preview
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
        </>
    );
}