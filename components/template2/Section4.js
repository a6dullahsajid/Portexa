import React from 'react'
import styles from "./template2.module.css";

export default function Section4({ userDetails }) {
    return (
        <>
            {userDetails.projects.length !== 0 && <section id="section4" className={`${styles.section} ${styles.section4}`}>
                <h2>
                    My Projects
                </h2>
                <div className={styles.projectContainer}>
                    {userDetails.projects.slice().reverse().map((project, index) => {
                        return <div key={index} className={styles.projectCard}>
                            <div>
                                {project.image && <img src={project.image} alt={project.name} />}
                                <div className={styles.projectName}>{project.title}</div>
                                <div className={styles.projDesc}>{project.desc}</div>
                            </div>
                            <div className={styles.cardButtons}>
                                {project.prevLink && <a href={project.prevLink}>
                                    <button>Preview</button>
                                </a>}
                                <a href={project.githubLink}>
                                    <button>See Code</button>
                                </a>
                            </div>
                        </div>
                    })}
                </div>
            </section>}
            {userDetails.projects.length !== 0 && <div className={styles.line}></div>}
        </>
    )
}
