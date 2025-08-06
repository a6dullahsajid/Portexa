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
  }, [session])

  return (
    <>
      <Navbar />
      <div className='loginPage'>
        <div className="loginBtnContainer">
          <div>
            <h1>Login/Signup</h1>
          </div>
          <button
            onClick={() => signIn("github")}
            className="flex items-center bg-gray-50 border border-gray-300 rounded-lg shadow-md max-w-xs px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <FcGoogle size={24} />
            <span>Continue with Google</span>
          </button>


          <button
            onClick={() => signIn("github")}
            className="flex items-center bg-gray-50 border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <FaGithub size={24} />
            <span>Continue with Github</span>
          </button>
        </div>
      </div>
    </>
  )
}
