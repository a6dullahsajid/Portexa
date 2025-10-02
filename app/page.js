// import AnimatedBackground from "@/components/AnimatedBackground.js";
import HeroSection from "@/components/HomePage/HeroSection";
import WhyPortexaSection from "@/components/HomePage/WhyPortexaSection";
import HowtoUseSection from "@/components/HomePage/HowtoUseSection";
import SectionDivider from "@/components/HomePage/SectionDivider";
import Footer from "@/components/HomePage/Footer";
import styles from "./globals.module.css";
import FAQSection from "@/components/HomePage/FAQSection";
import HomeNav from "@/components/HomePage/HomeNav";

export default function Home() {

  return (
    <main className={styles.main}>
      <HomeNav />
      <HeroSection />
      <SectionDivider />
      <WhyPortexaSection />
      <HowtoUseSection />
      <SectionDivider />
      <FAQSection />
      <Footer />
    </main>
  );
}
