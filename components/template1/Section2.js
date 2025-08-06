import styles from "./template1.module.css"
export default function Section2({ bio, skills }) {
  return (
    <section id="section2" className={`${styles.section} ${styles.section2}`}>
      <h2 className={styles.h2}>
        About me
        <div className={styles.line}></div>
      </h2>
      <div className={styles.description}>{bio}
      </div>
      <div className={styles.resume}>
        <a href="#" target="_blank">
          Resume
        </a>
      </div>
      <h3 className={styles.h3}>Key Skills</h3>
      <ul className={styles.skills}>
        {skills.map((skill, index) => {
          return <li key={index}>
            {skill}
          </li>
        })}
      </ul>
    </section>
  );
}
