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
    title: "Login - Access Your Portfolio Dashboard | Portexa",
    description: "Sign in to Portexa to create and manage your professional portfolio. Secure login with Google and GitHub. Start building your online presence today.",
    keywords: [
        "portfolio login",
        "sign in portfolio",
        "portfolio builder login",
        "secure login",
        "Google login",
        "GitHub login",
        "portfolio dashboard access",
        "professional portfolio login",
        "portfolio creator sign in",
        "online portfolio access"
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
        url: "https://portexa.vercel.app/login",
        siteName: "Portexa",
        title: "Login - Access Your Portfolio Dashboard | Portexa",
        description: "Sign in to Portexa to create and manage your professional portfolio. Secure login with Google and GitHub. Start building your online presence today.",
        images: [
            {
                url: "https://portexa.vercel.app/logo.png",
                width: 1200,
                height: 630,
                alt: "Portexa Login - Access Your Portfolio Dashboard",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Login - Access Your Portfolio Dashboard | Portexa",
        description: "Sign in to Portexa to create and manage your professional portfolio. Secure login with Google and GitHub.",
        images: ["https://portexa.vercel.app/logo.png"],
        creator: "@portexa",
        site: "@portexa",
    },
    alternates: {
        canonical: "https://portexa.vercel.app/login",
    },
    category: "technology",
    classification: "Portfolio Builder, Authentication, Web Development",
    other: {
        "application-name": "Portexa",
        "apple-mobile-web-app-title": "Portexa Login",
        "msapplication-TileColor": "#000000",
        "theme-color": "#000000",
    },
};

export default function LoginLayout({ children }) {
    return (
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            {children}
        </div>
    );
}
