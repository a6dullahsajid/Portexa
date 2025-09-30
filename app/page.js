import AnimatedBackground from "@/components/AnimatedBackground.js";
import Link from "next/link";
import styles from "./globals.module.css";
import Image from "next/image";
import StartButton from "@/components/StartButton";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyPortexaSection from "@/components/WhyPortexaSection";
import HowtoUseSection from "@/components/HowtoUseSection";


export default function Home() {

  return (
    <main>
      {/* <AnimatedBackground /> */}
      <HeroSection />
      <WhyPortexaSection />
      <HowtoUseSection />
      {/* Test hot reload */}
    </main>
  );
}
