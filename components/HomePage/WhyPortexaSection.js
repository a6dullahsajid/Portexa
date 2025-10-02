import React from 'react'
import styles from "./whyPortexaSection.module.css";

export default function WhyPortexaSection() {
    return (
        <section id='why' className={styles.whyPortexaSection}>
            <h1 className={styles.whyPortexaTitle}>Build <b>Faster</b>. Land Sooner.</h1>
            <p className={styles.whyPortexaSubtitle}>We believe in the power of code-quality portfolios... without the hassle of coding.</p>
            <div className={styles.whyCardsContainer}>
                <div className={styles.whyCard}>
                    <h2>Lightning Fast Generation</h2>
                    <p>Go from zero to published site in minutes. Zero code and Zero friction-just professional.</p>
                    <img src="/homepage/lightning.svg" alt="Lightning" />
                </div>
                <div className={styles.whyCard}>
                    <h2>Recruiter Optimized Design</h2>
                    <p>Get noticed. SEO-optimized templates pass automated systems and impress hiring managers.</p>
                    <img src="/homepage/magnify.svg" alt="Recruiter" />
                </div>
                <div className={styles.whyCard}>
                    <h2>Free Forever Deployment</h2>
                    <p>Free hosting forever. No hidden costs or additional fees for your portfolio.</p>
                    <img src="/homepage/free.svg" alt="Free" />
                </div>
            </div>
            <div className={styles.whyPortexaBottom}>
                <div className={styles.whyBottomGrid}>
                    <div className={styles.whyBottomGridItem}>
                        <h2>THE PROBLEM</h2>
                        <h3>Most creators never launch a portfolio</h3>
                        <p>Building a personal portfolio is often too time consuming, too technical, or just never gets done. People get stuck with templates, coding, and clunky builders</p>
                        <p className={styles.p2}>81% never publish their work online.</p>
                    </div>
                    <div className={styles.vline}></div>
                    <div className={styles.whyBottomGridItem}>
                        <h2>WHAT WE DID</h2>
                        <h3>Launched-in-minutes, code-free portfolio builders</h3>
                        <p>We removed the friction: instant portfolio creation with a smart form, built-in SEO, responsive design, and zero code required. Just select template and fill out form - you're live.</p>
                    </div>
                    <div className={styles.vline}></div>
                    <div className={styles.whyBottomGridItem}>
                        <h2>THE RESULT</h2>
                        <h3><b>4X FASTER</b> launches, <b>2X more visibility</b></h3>
                        <p>Creators now ship in minutes, not week. More portfolios launched, more opportunities unlocked. No tech skills needed - just focus on your content.</p>
                    </div>
                </div>    
            </div>
        </section>
    )
}
