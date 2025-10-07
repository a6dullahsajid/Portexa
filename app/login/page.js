"use client";
import Navbar from "@/components/Navbar";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";   // Google icon (color)
import { FaGithub } from "react-icons/fa";   // GitHub icon (solid)

import "./login.css";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router])

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Portexa Login - Access Your Portfolio Dashboard",
    "description": "Sign in to Portexa to create and manage your professional portfolio. Secure login with Google and GitHub.",
    "url": "https://portexa.vercel.app/login",
    "mainEntity": {
      "@type": "WebApplication",
      "name": "Portexa Portfolio Builder",
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
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://portexa.vercel.app"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Login",
          "item": "https://portexa.vercel.app/login"
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <div className='loginPage'>
        <div className="loginBtnContainer">
          <div>
            <h1>Login/Signup</h1>
            <p>Access your portfolio dashboard to create and manage your professional online presence</p>
          </div>
          <button
            onClick={() => signIn("google")}
            className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-lg"
            aria-label="Sign in with Google to access your portfolio dashboard">
            <FcGoogle size={24} />
            <span>Continue with Google</span>
          </button>

          <button
            onClick={() => signIn("github")}
            className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-lg"
            aria-label="Sign in with GitHub to access your portfolio dashboard">
            <FaGithub size={24} />
            <span>Continue with GitHub</span>
          </button>
        </div>
      </div>
    </>
  )
}
