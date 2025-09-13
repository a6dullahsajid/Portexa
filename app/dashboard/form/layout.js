import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Portfolio Builder Form - Create Your Professional Portfolio | Portexa",
    description: "Build your professional portfolio with our easy-to-use form. Add your projects, experience, skills, and contact information. Create a stunning portfolio in minutes.",
    keywords: [
        "portfolio builder form",
        "portfolio creation form",
        "professional portfolio builder",
        "portfolio form builder",
        "create portfolio online",
        "portfolio maker form",
        "build portfolio website",
        "portfolio generator form",
        "personal portfolio builder",
        "developer portfolio form",
        "designer portfolio builder",
        "portfolio creation tool"
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
        url: "https://portexa.vercel.app/dashboard/form",
        siteName: "Portexa",
        title: "Portfolio Builder Form - Create Your Professional Portfolio | Portexa",
        description: "Build your professional portfolio with our easy-to-use form. Add your projects, experience, skills, and contact information. Create a stunning portfolio in minutes.",
        images: [
            {
                url: "https://portexa.vercel.app/portfolioExamples/example_1.png",
                width: 1200,
                height: 630,
                alt: "Portexa Portfolio Builder Form - Create Your Professional Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Portfolio Builder Form - Create Your Professional Portfolio | Portexa",
        description: "Build your professional portfolio with our easy-to-use form. Add your projects, experience, skills, and contact information.",
        images: ["https://portexa.vercel.app/portfolioExamples/example_1.png"],
        creator: "@portexa",
        site: "@portexa",
    },
    alternates: {
        canonical: "https://portexa.vercel.app/dashboard/form",
    },
    category: "technology",
    classification: "Portfolio Builder, Form Builder, Web Development, Design Tools",
    other: {
        "application-name": "Portexa",
        "apple-mobile-web-app-title": "Portexa Form Builder",
        "msapplication-TileColor": "#000000",
        "theme-color": "#000000",
    },
};

export default function FormLayout({ children }) {
    return (
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            {children}
        </div>
    );
}
