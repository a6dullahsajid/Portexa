import { Geist, Geist_Mono } from "next/font/google";
// Don't import template1.css here — keep layouts isolated

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Dashboard - Choose Your Portfolio Template | Portexa",
    description: "Create your professional portfolio with our easy-to-use dashboard. Choose from 3 stunning templates - Classic, Minimal, and Modern. Build your online presence in minutes.",
    keywords: [
        "portfolio dashboard",
        "portfolio builder",
        "template selection",
        "professional portfolio",
        "online portfolio",
        "portfolio creator",
        "web development portfolio",
        "designer portfolio",
        "developer portfolio",
        "personal website builder"
    ],
    authors: [{ name: "Portexa Team" }],
    creator: "Portexa",
    publisher: "Portexa",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://portexa.vercel.app/dashboard",
        siteName: "Portexa",
        title: "Dashboard - Choose Your Portfolio Template | Portexa",
        description: "Create your professional portfolio with our easy-to-use dashboard. Choose from 3 stunning templates - Classic, Minimal, and Modern. Build your online presence in minutes.",
        images: [
            {
                url: "https://portexa.vercel.app/portfolioExamples/example_1.png",
                width: 1200,
                height: 630,
                alt: "Portexa Portfolio Dashboard - Template Selection",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Dashboard - Choose Your Portfolio Template | Portexa",
        description: "Create your professional portfolio with our easy-to-use dashboard. Choose from 3 stunning templates - Classic, Minimal, and Modern.",
        images: ["https://portexa.vercel.app/portfolioExamples/example_1.png"],
        creator: "@portexa",
        site: "@portexa",
    },
    alternates: {
        canonical: "https://portexa.vercel.app/dashboard",
    },
    category: "technology",
    classification: "Portfolio Builder, Web Development, Design Tools",
    other: {
        "application-name": "Portexa",
        "apple-mobile-web-app-title": "Portexa Dashboard",
        "msapplication-TileColor": "#000000",
        "theme-color": "#000000",
    },
};

export default function DashboardLayout({ children }) {
    return (
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            {children}
        </div>
    );
}

