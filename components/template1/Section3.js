import Project from "./Project.js";
import styles from "./template1.module.css";

export default function Section3({projects}) {
  return (projects.length !== 0 && <section id="section3" className={`${styles.section} ${styles.section3}`}>
      <h2 className={styles.h2}>
        Projects
        <div className={styles.line}></div>
      </h2>
      <div className={styles.allprojects}>
        {projects.slice().reverse().map((project, index)=> {
          return (
            <Project
              key={index}
              name={project.title}
              description={project.desc}
              image={project.image}
              link={project.prevLink}
              code={project.githubLink}
              techUsed={project.tech}
            />
          );
        })}
      </div>
    </section>
  );
}
