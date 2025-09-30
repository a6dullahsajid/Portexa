import React from 'react'
import styles from "./whyPortexaSection.module.css";

export default function WhyPortexaSection() {
    return (
        <section className={styles.whyPortexaSection}>
            <h1 className={styles.whyPortexaTitle}>Why Portexa? Build Faster. Land Sooner.</h1>
            <p className={styles.whyPortexaSubtitle}>We believe in the power of code-quality portfolios... without the hassle of coding.</p>
            <div className={styles.whyCardsContainer}>
                <div className={styles.whyCard}>
                    <h2><img src="/homepage/lightning.svg" alt="Lightning" />Lightning Fast Generation</h2>
                    <p>Go from zero to published site in minutes. <b>Zero code and Zero friction</b>-just professional.</p>
                </div>
                <div className={styles.whyCard}>
                    <h2><img src="/homepage/magnify.svg" alt="Recruiter" />Recruiter Optimized Design</h2>
                    <p>Get noticed.<b> SEO-optimized templates</b> pass automated systems and impress hiring managers.</p>
                </div>
                <div className={styles.whyCard}>
                    <h2><img src="/homepage/deploy.png" alt="Deploy" />Zero Latency Deployment</h2>
                    <p><b>Instant loading</b> worldwide. Speed that turns visitors into opportunities.</p>
                </div>
                <div className={styles.whyCard}>
                    <h2><img src="/homepage/mobile.svg" alt="Responsive" />Perfectly Responsive</h2>
                    <p><b>Perfect on any device.</b> Responsive templates that look professional everywhere.</p>
                </div>
                <div className={styles.whyCard}>
                    <h2><img src="/homepage/free.svg" alt="Free" />Free Forever Deployment</h2>
                    <p><b>Free hosting forever.</b> No hidden costs or additional fees for your portfolio.</p>
                </div>
            </div>
        </section>
    )
}
