"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import styles from "./dashboard.module.css";
import "./dashboard.css";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import {
    setUserName,
    setTemplate,
    setName,
    setTitle,
    setProfileImage,
    setBio,
    setResume,
    setSkills,
    setProjects,
    setConnectDesc,
    setEmail,
    setLinkedin,
    setGithub,
    setX,
    setExperience,
} from "@/store/userDataSlice";



export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const dispatch = useDispatch();

    const templates = [
        { id: "template1", name: "Classic", img: "/portfolioExamples/example_1.png", preview: "https://a6dullahsajid.github.io/Portfolio/" },
        { id: "template2", name: "Minimal", img: "/portfolioExamples/example_3.png", preview: "https://sanskritirathaur.github.io/Portfolio/" },
        { id: "template3", name: "Modern", img: "/portfolioExamples/example_2.png", preview: "https://portfolio-ali-arshad-khan.netlify.app/" },
    ];


    const selectTemplate = (templateId) => {
        console.log("select template chala!");
        dispatch(setTemplate(templateId));
        if (session) {
            dispatch(setUserName(session.user.email.split("@")[0]));
            router.push(`/dashboard/template1`);
        } else {
            router.push('/login');
        }
    };


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

            const user = data.user;

            if (user) {
                dispatch(setUserName(user.userName));
                dispatch(setTemplate(user.template));
                dispatch(setName(user.details.name));
                dispatch(setTitle(user.details.title));
                dispatch(setProfileImage(user.details.profileImage));
                dispatch(setBio(user.details.bio));
                dispatch(setResume(user.details.resume));
                dispatch(setSkills(user.details.skills));
                dispatch(setExperience(user.details.experience));
                dispatch(setProjects(user.details.projects));
                dispatch(setConnectDesc(user.details.connectDesc));
                dispatch(setEmail(user.details.email));
                dispatch(setLinkedin(user.details.linkedin));
                dispatch(setGithub(user.details.github));
                dispatch(setX(user.details.x));
            }
            console.log("User data loaded into Redux");
            console.log(user);
        } catch (err) {
            console.log("Error loading user:", err.message);
        }
    }, [dispatch])



    useEffect(() => {
        if (status === "authenticated" && session?.user?.email) {
            fetchUserData();
        }
    }, [status, session, fetchUserData]);

    return (
        <main className={styles.dashboard}>
            <Navbar />
            <div className={styles.dashboardContainer}>
                <h1>Choose a Template</h1>
                <div className={styles.templateContainer}>
                    {templates.map((tpl) => (
                        <div className={styles.templateCard}
                            key={tpl.id}
                        >
                            <Image
                                onClick={() => selectTemplate(tpl.id)}
                                src={tpl.img}
                                alt={tpl.name}
                                width={400}
                                height={250}
                            />
                            <div className={styles.tempTextContainer}>
                                <p>{tpl.name}</p>
                                <a className={styles.tempPrevButton} href={tpl.preview} target="_blank">Preview</a>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
