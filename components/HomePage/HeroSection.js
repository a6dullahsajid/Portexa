import React from 'react'
import styles from "./heroSection.module.css"
import Image from 'next/image'
import Link from 'next/link'
import StartButton from '@/components/StartButton'

export default function HeroSection() {
    return (
        <section id='hero' className={styles.heroSection}>
            <div className={styles.heroTop}>
                <div className={styles.heroTopLeft}>
                    <h1 className={styles.heroTopLeftTitle}>Build your <b>portfolio</b> in minutes with just a few clicks.</h1>
                    <p className={styles.heroTopLeftSubtitle}>The easiest way to showcase your work, impress clients, and grow your personal brand - without the hassle of coding.</p>
                    <div className={styles.heroBottom}>
                        <StartButton text="Build your portfolio" />
                        <div className={styles.featuresContainer}>
                            <div className={styles.feature}>
                                <h2>3x</h2>
                                <p>Faster</p>
                            </div>
                            <div className={styles.feature}>
                                <h2>89%</h2>
                                <p>SEO Optimized</p>
                            </div>
                            <div className={styles.feature}>
                                <h2>0</h2>
                                <p>Latency</p>
                            </div>
                            <div className={styles.feature}>
                                <h2>100%</h2>
                                <p>Responsive</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.heroTopRight}>
                    <Image src="/portfolioExamples/example_1.png" className={styles.heroImage1} alt="example 1" width={400} height={400} />
                    <Image src="/portfolioExamples/example_2.png" className={styles.heroImage2} alt="example 2" width={400} height={400} />
                    <Image src="/portfolioExamples/example_3.png" className={styles.heroImage3} alt="example 3" width={400} height={400} />
                    <Image src="/portfolioExamples/example_4.png" className={styles.heroImage4} alt="example 4" width={400} height={400} />
                </div>
            </div>
        </section>
    )
}
