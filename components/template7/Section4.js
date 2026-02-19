import React from 'react'
import styles from './template7.module.css';
import "./template7.css";

export default function Section4({ userDetails }) {
  return (
    <section id="section4" className={styles.section4}>
      <h2 className={styles.h2}>Projects
        <div className={styles.underline}></div>
      </h2>
      <div className={styles.projectContainer}>
        {userDetails.projects.slice().reverse().map((project, index) => {
          return <div key={index} className={styles.projectCard}>
            {project.image && <img src={project.image} alt={project.title} />}
            <div className={styles.projectDetails}>
              <div className={styles.projectName}>{project.title}</div>
              <div className={styles.projectDescription}>{project.desc}</div>
              <div className={styles.projectTechnologies}>
                Tech Stack:
                <ul>
                  {project.tech.split(',').map((tech, techIndex) => (
                    <li key={techIndex}>{tech.trim()}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.projectButtons}>
                {project.prevLink && <a href={project.prevLink}>
                  <button>Preview</button>
                </a>}
                {project.githubLink && <a href={project.githubLink}>
                  <button>See Code</button>
                </a>}
              </div>
            </div>
          </div>
        })}
      </div>
    </section>
  )
}
