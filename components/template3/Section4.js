import React from 'react'
import styles from "./template3.module.css";

export default function Section4({ userDetails }) {
  return (
    <section id="section4" className={`${styles.section} ${styles.section4}`}>
      <div className={styles.heading}>
        <h4>Some Things I&apos;ve Built</h4>
        <div className={styles.hline}></div>
      </div>
      <div className={styles.projectContainer}>
        {userDetails.projects.slice().reverse().map((project, index) => {
          return <div key={index} className={styles.projectCard}>
            <div className={styles.cardHead}>
              <img src="/template3/folder.svg" alt="folder" className={styles.folder} />
              <div className={styles.links}>
                <a href={project.githubLink} target='_blank'><img src="/template1/github_logo.png" alt="git" /></a>
                {project.prevLink && <a href={project.prevLink} target='_blank'><img src="/template3/link_logo.svg" alt="" /></a>}
              </div>
            </div>
            <a href={project.prevLink} target='_blank'>
              <div className={styles.projectName}>{project.title}</div>
              <p className={styles.projectDesc}>{project.desc}</p>
              <p className={styles.projectTech}>Tech: {project.tech}</p>
            </a>
          </div>
        })}
      </div>
    </section>
  )
}
