import React from 'react'
import styles from "./template4.module.css";

export default function Section4({ userDetails }) {
    return (
        <>
            <section id="section4" className={`${styles.section} ${styles.section4}`}>
                <h2 className={`${styles.h2} syne-font`}>
                    My Projects
                </h2>
                <div className={styles.projectContainer}>
                    {userDetails.projects.slice().reverse().map((project, index) => {
                        return <div key={index} className={styles.projectCard}>
                            <img src={project.image} alt={project.name} />
                            <div className={`${styles.projectDetails} kumbh-sans-font`}>
                                <div className={styles.projHead}>
                                    <div className={styles.projectName}>{project.title}</div>
                                    <div className={styles.cardButtons}>
                                        {project.prevLink && <a href={project.prevLink} target='_blank'>
                                            <button>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    aria-hidden="true"
                                                    role="img"
                                                    width="1em"
                                                    height="1em"
                                                    viewBox="0 0 24 24"
                                                    style={{ opacity: 0.9 }}
                                                >
                                                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                                        <path strokeDasharray="36" strokeDashoffset="36" d="M12 5c-3.87 0 -7 3.13 -7 7c0 3.87 3.13 7 7 7c3.87 0 7 -3.13 7 -7">
                                                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="36;0"></animate>
                                                        </path>
                                                        <path strokeDasharray="12" strokeDashoffset="12" d="M13 11l7 -7">
                                                            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="12;0"></animate>
                                                        </path>
                                                        <path strokeDasharray="8" strokeDashoffset="8" d="M21 3h-6M21 3v6">
                                                            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="8;0"></animate>
                                                        </path>
                                                    </g>
                                                </svg>
                                            </button>
                                        </a>}
                                        <a href={project.githubLink} target='_blank'>
                                            <button>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    aria-hidden="true"
                                                    role="img"
                                                    width="1em"
                                                    height="1em"
                                                    viewBox="0 0 24 24"
                                                    style={{ opacity: 0.9 }}
                                                >
                                                    <g fill="none">
                                                        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                                                        <path fill="currentColor" d="M6.315 6.176c-.25-.638-.24-1.367-.129-2.034a6.8 6.8 0 0 1 2.12 1.07c.28.214.647.283.989.18A9.3 9.3 0 0 1 12 5c.961 0 1.874.14 2.703.391c.342.104.709.034.988-.18a6.8 6.8 0 0 1 2.119-1.07c.111.667.12 1.396-.128 2.033c-.15.384-.075.826.208 1.14C18.614 8.117 19 9.04 19 10c0 2.114-1.97 4.187-5.134 4.818c-.792.158-1.101 1.155-.495 1.726c.389.366.629.882.629 1.456v3a1 1 0 0 0 2 0v-3c0-.57-.12-1.112-.334-1.603C18.683 15.35 21 12.993 21 10c0-1.347-.484-2.585-1.287-3.622c.21-.82.191-1.646.111-2.28c-.071-.568-.17-1.312-.57-1.756c-.595-.659-1.58-.271-2.28-.032a9 9 0 0 0-2.125 1.045A11.4 11.4 0 0 0 12 3c-.994 0-1.953.125-2.851.356a9 9 0 0 0-2.125-1.045c-.7-.24-1.686-.628-2.281.031c-.408.452-.493 1.137-.566 1.719l-.005.038c-.08.635-.098 1.462.112 2.283C3.484 7.418 3 8.654 3 10c0 2.992 2.317 5.35 5.334 6.397A4 4 0 0 0 8 17.98l-.168.034c-.717.099-1.176.01-1.488-.122c-.76-.322-1.152-1.133-1.63-1.753c-.298-.385-.732-.866-1.398-1.088a1 1 0 0 0-.632 1.898c.558.186.944 1.142 1.298 1.566c.373.448.869.916 1.58 1.218c.682.29 1.483.393 2.438.276V21a1 1 0 0 0 2 0v-3c0-.574.24-1.09.629-1.456c.607-.572.297-1.568-.495-1.726C6.969 14.187 5 12.114 5 10c0-.958.385-1.881 1.108-2.684c.283-.314.357-.756.207-1.14"></path>
                                                    </g>
                                                </svg>
                                            </button>
                                        </a>
                                    </div>
                                </div>
                                <div className={`${styles.projDesc} kumbh-sans-font`}>{project.desc}</div>
                                <div className={styles.projectTechContainer}>
                                    {project.tech.split(',').map((tech, techIndex) => (
                                        <div key={techIndex} className={`${styles.projectTech} kumbh-sans-font`}>
                                            {tech.trim()}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </section>
            <div className={styles.line}></div>
        </>
    )
}
