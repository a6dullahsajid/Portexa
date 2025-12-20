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
            <div className={styles.projectImageContainer}>
            {project.image && <img src={project.image} alt="project" />}
            <div className={styles.cardHead}>
              <div className={styles.links}>
                {project.prevLink && <a href={project.prevLink} target='_blank'>Live</a>}
                {project.githubLink && <a href={project.githubLink} target='_blank'>Github</a>}
              </div>
            </div>
            </div>
            <div href={project.prevLink} target='_blank' className={styles.projectDetails}>
              <div className={styles.projectName}>{project.title}</div>
              <p className={styles.projectDesc}>{project.desc}</p>
              <p className={styles.projectTech}>Tech: {project.tech}</p>
            </div>
          </div>
        })}
      </div>
    </section>
  )
}
