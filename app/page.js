import VideoPreview from "@/components/VideoPreview.js";
import AnimatedBackground from "@/components/AnimatedBackground.js";
import Link from "next/link";
import styles from "./globals.module.css";
import Image from "next/image";

export default function Home() {
  const videoList = ["example_1", "example_2", "example_3"];

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

      {/* <div className={styles.exampleContainer}>
        <div className={styles.exampleFolios}>
          {videoList.map((name) => (
            <VideoPreview
              key={name}
              src={`/portfolioExamples/${name}.mp4`}
              poster={`/portfolioExamples/${name}.png`}
            />
          ))}
        </div>
        <h2 className={styles.exampleContainerh2}>Examples of some built portfolios</h2>
      </div> */}
    </main>
  );
}
