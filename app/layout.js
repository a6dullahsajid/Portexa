import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/StoreProvider";
import SessionWrapper from "@/components/SessionWrapper";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portexa - Build your portfolio",
  description: "A portfolio builder that lets you create a fully customized portfolio to showcase your skills and projects.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          <StoreProvider>
        <Toaster position="bottom-left" />
            {children}
            <Analytics />
          </StoreProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
