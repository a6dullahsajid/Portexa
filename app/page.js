import AnimatedBackground from "@/components/AnimatedBackground.js";
import Link from "next/link";
import styles from "./globals.module.css";
import Image from "next/image";

export default function Home() {

  return (
    <main className={styles.homepage}>
      <AnimatedBackground />
      <div className={styles.section1}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <Image fill src="/logo.png" alt="Logo" className={styles.logoImg}/>
          </div>
          <h1 className={styles.section1h1}>Portexa</h1>
        </div>
        <p className={styles.section1p}>Design your portfolio with just a few clicks</p>
        <Link href="/dashboard">
          <button className={styles.section1button}>
            Get started
          </button>
        </Link>
      </div>
    </main>
  );
}
