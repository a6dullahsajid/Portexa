import React from 'react'
import styles from "./template4.module.css";

export default function Section5({ userDetails }) {
    return (
        <>
            <section id="section5" className={`${styles.section} ${styles.section5}`}>
                <h2 className={`${styles.h2} syne-font`}>Let&apos;s Connect</h2>
                <div className={`${styles.connectContainer} kumbh-sans-font`} >
                    <div className={styles.description}>{userDetails.connectDesc}</div>
                    <div className={styles.connectButtons}>
                        <a href={`mailto:${userDetails.email}`} target='_blank'>
                            <button>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    role="img"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                >
                                    <path fill="currentColor" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.545L12 10.09l9.819-6.27h.545c.904 0 1.636.732 1.636 1.636z"/>
                                </svg>
                            </button>
                        </a>
                        <a href={userDetails.linkedin} target='_blank'>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--hugeicons" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinejoin="round"><path strokeLinecap="round" strokeWidth="1.5" d="M7 10v7m4-4v4m0-4a3 3 0 1 1 6 0v4m-6-4v-3"></path><path strokeLinecap="round" strokeWidth="2" d="M7.008 7h-.009"></path><path strokeWidth="1.5" d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12Z"></path></g></svg>
                            </button>
                        </a>
                        <a href={userDetails.github} target='_blank'>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--hugeicons" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M10 20.568c-3.429 1.157-6.286 0-8-3.568"></path><path d="M10 22v-3.242c0-.598.184-1.118.48-1.588c.204-.322.064-.78-.303-.88C7.134 15.452 5 14.107 5 9.645c0-1.16.38-2.25 1.048-3.2c.166-.236.25-.354.27-.46c.02-.108-.015-.247-.085-.527c-.283-1.136-.264-2.343.16-3.43c0 0 .877-.287 2.874.96c.456.285.684.428.885.46s.469-.035 1.005-.169A9.5 9.5 0 0 1 13.5 3a9.6 9.6 0 0 1 2.343.28c.536.134.805.2 1.006.169c.2-.032.428-.175.884-.46c1.997-1.247 2.874-.96 2.874-.96c.424 1.087.443 2.294.16 3.43c-.07.28-.104.42-.084.526s.103.225.269.461c.668.95 1.048 2.04 1.048 3.2c0 4.462-2.134 5.807-5.177 6.643c-.367.101-.507.559-.303.88c.296.47.48.99.48 1.589V22"></path></g></svg>
                            </button>
                        </a>
                        <a href={userDetails.x} target='_blank'>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--akar-icons" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M13.808 10.469L20.88 2h-1.676l-6.142 7.353L8.158 2H2.5l7.418 11.12L2.5 22h1.676l6.486-7.765L15.842 22H21.5zm-2.296 2.748l-.752-1.107L4.78 3.3h2.575l4.826 7.11l.751 1.107l6.273 9.242h-2.574z"></path></svg>
                            </button>
                        </a>
                    </div>
                </div>
            </section>
            <div className={styles.section5Footer}>© 2025 {userDetails.name} | All rights reserved</div>
        </>
    )
}
