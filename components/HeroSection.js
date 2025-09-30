import React from 'react'
import styles from "./heroSection.module.css"
import Image from 'next/image'
import Link from 'next/link'
import StartButton from '@/components/StartButton'

export default function HeroSection() {
    return (
        <div className={styles.heroSection}>
            <div className={styles.heroTopContent}>
                <div className={styles.logoContainer}>
                    <div className={styles.logoWrapper}>
                        <Image
                            src="/logo.png"
                            alt="Portexa Logo"
                            fill
                            className={styles.logo}
                            priority
                            sizes="(max-width: 389px) 80px, (max-width: 576px) 90px, (max-width: 767px) 100px"
                        />
                    </div>
                    <h1 className={styles.brandName}>Portexa</h1>
                </div>
                <div className={styles.heroTitleContainer}>
                    <h1 className={styles.heroTitle}>Build your portfolio in minutes with just a few clicks.</h1>
                    <p className={styles.heroSubtitle}>Zero code, Instant Deploy.</p>
                    <Link href="/dashboard">
                        <StartButton />
                    </Link>
                </div>
            </div>
            <div className={styles.heroBottomContent}>
                <div className={styles.heroTemplateContainer}>
                    <div className={styles.heroTemplate}>
                        <Image src="/portfolioExamples/example_1.png" alt="Template 1" width={300} height={200} />
                    </div>
                    <div className={styles.heroTemplate}>
                        <Image src="/portfolioExamples/example_4.png" alt="Template 2" width={300} height={200} />
                    </div>
                    <div className={styles.heroTemplate}>
                        <Image src="/portfolioExamples/example_3.png" alt="Template 3" width={300} height={200} />
                    </div>
                </div>
                <h1 className={styles.heroBottomTitle}>Select an expertly designed template, connect your existing data and launch a lightning-fast portfolio</h1>
            </div>
        </div>
    )
}
