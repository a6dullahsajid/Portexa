// app/[userName]/opengraph-image.js

import { ImageResponse } from "next/og";
import { db } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || "https://portexa.vercel.app";

// --------------------------------------------------
// Fetch user data
// --------------------------------------------------

async function getUserData(userName) {
    const usersRef = db.collection("users");

    const querySnapshot = await usersRef
        .where("userName", "==", userName)
        .limit(1)
        .get();

    if (querySnapshot.empty) {
        return null;
    }

    return querySnapshot.docs[0].data();
}

// --------------------------------------------------
// Clean text
// --------------------------------------------------

function cleanText(text = "") {
    return String(text)
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

// --------------------------------------------------
// Dynamic Open Graph Image
// --------------------------------------------------

export default async function Image({ params }) {
    const { userName } = await params;

    // --------------------------------------------------
    // Preview pages
    // --------------------------------------------------

    if (userName.startsWith("preview_")) {
        return new ImageResponse(
            (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                            "linear-gradient(135deg, rgb(95, 16, 191), rgb(16, 109, 191))",
                        color: "white",
                        fontSize: 64,
                        fontWeight: 700,
                    }}
                >
                    Portexa Portfolio
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    }

    // --------------------------------------------------
    // Get user
    // --------------------------------------------------

    const userData = await getUserData(userName);

    // --------------------------------------------------
    // User not found
    // --------------------------------------------------

    if (!userData) {
        return new ImageResponse(
            (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                            "linear-gradient(135deg, rgb(95, 16, 191), rgb(16, 109, 191))",
                        color: "white",
                        fontSize: 56,
                        fontWeight: 700,
                    }}
                >
                    Portfolio Not Found
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    }

    // --------------------------------------------------
    // User details
    // --------------------------------------------------

    const details = userData.details || {};

    const name = cleanText(details.name || userData.userName);

    const title = cleanText(
        details.title || "Professional"
    );

    const skills = Array.isArray(details.skills)
        ? details.skills
            .filter(Boolean)
            .map((skill) => cleanText(skill))
            .filter(Boolean)
        : [];

    const profileImage = details.profileImage || null;

    // Only show a reasonable number of skills
    const displayedSkills = skills.slice(0, 8);

    // --------------------------------------------------
    // Generate OG image
    // --------------------------------------------------

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "50px 80px",
                    background:
                        "linear-gradient(135deg, rgb(95, 16, 191), rgb(16, 109, 191))",
                    fontFamily: "Arial",
                    color: "white",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Decorative circle */}
                <div
                    style={{
                        position: "absolute",
                        width: 400,
                        height: 400,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.06)",
                        right: -120,
                        top: -130,
                    }}
                />

                {/* Decorative circle */}
                <div
                    style={{
                        position: "absolute",
                        width: 300,
                        height: 300,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.05)",
                        left: -150,
                        bottom: -140,
                    }}
                />

                {/* Main content */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {/* Left side */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            maxWidth: 800,
                        }}
                    >
                        {/* Name */}
                        <div
                            style={{
                                fontSize: 70,
                                fontWeight: 800,
                                lineHeight: 1.1,
                                color: "#FFFFFF",
                                marginBottom: 18,
                            }}
                        >
                            {name}
                        </div>

                        {/* Title */}
                        <div
                            style={{
                                fontSize: 36,
                                fontWeight: 500,
                                color: "rgba(255,255,255,0.9)",
                                marginBottom: 32,
                            }}
                        >
                            {title}
                        </div>

                        {/* Skills */}
                        {displayedSkills.length > 0 && (
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 10,
                                    maxWidth: 500,
                                }}
                            >
                                {displayedSkills.map((skill, index) => (
                                    <div
                                        key={`${skill}-${index}`}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            padding: "3px 12px",
                                            borderRadius: 999,
                                            background: "rgba(125, 211, 252, 0.16)",
                                            border:
                                                "1px solid rgba(125, 211, 252, 0.35)",
                                            color: "#BAE6FD",
                                            fontSize: 16,
                                            fontWeight: 500,
                                        }}
                                    >
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Portexa branding */}
                        <div
                            style={{
                                display: "flex",
                                position: "absolute",
                                top: 370,
                                left: 0,
                                fontSize: 22,
                                color: "rgba(255,255,255,0.65)",
                            }}
                        >
                            Created with Portexa
                        </div>
                    </div>

                    {/* Profile image */}
                    {profileImage && (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 350,
                                height: 350,
                                borderRadius: "50%",
                                overflow: "hidden",
                                border: "8px solid rgba(255,255,255,0.25)",
                                background: "rgba(255,255,255,0.1)",
                                flexShrink: 0,
                            }}
                        >
                            <img
                                src={profileImage}
                                width="350"
                                height="350"
                                style={{
                                    width: "350px",
                                    height: "350px",
                                    objectFit: "contain",
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Website */}
                <div
                    style={{
                        position: "absolute",
                        right: 80,
                        bottom: 45,
                        fontSize: 20,
                        color: "rgba(255,255,255,0.55)",
                    }}
                >
                    {SITE_URL.replace(/^https?:\/\//, "")}
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}

// --------------------------------------------------
// Metadata
// --------------------------------------------------

export const alt = "Portexa Portfolio";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";