import React from 'react'
import styles from "./template2.module.css";
import { connect } from 'react-redux';

export default function Section5({ userDetails }) {
    return (
        <>
            <section id="section5" className={`${styles.section} ${styles.section5}`}>
                <h2>Let&apos;s Connect</h2>
                <div className={styles.connectContainer}>
                    <div className={styles.description}>{userDetails.connectDesc}</div>
                    <div className={styles.connectButtons}>
                        <a href={`mailto:${userDetails.email}`} target='_blank'>
                            <button>
                                <img src="/template2/gmaillogo.png" alt="Gmail Logo" />
                            </button>
                        </a>
                        <a href={userDetails.linkedin} target='_blank'>
                            <button>
                                <img src="/template1/linkedin.png" alt="Linkedin Logo" />
                            </button>
                        </a>
                        <a href={userDetails.github} target='_blank'>
                            <button>
                                <img src="/template2/githublogo.png" alt="Github Logo" />
                            </button>
                        </a>
                        <a href={userDetails.x} target='_blank'>
                            <button>
                                <img src="/template1/x_logo.png" alt="X Logo" />
                            </button>
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}
