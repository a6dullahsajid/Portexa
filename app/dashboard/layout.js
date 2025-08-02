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
    title: "Dashboard",
    description: "User dashboard to manage projects and settings",
};

export default function DashboardLayout({ children }) {
    return (
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            {children}
        </div>
    );
}

