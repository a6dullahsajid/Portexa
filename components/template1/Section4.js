import styles from "./template1.module.css";

export default function section4({connectDesc, github, linkedin, x, email}) {
  return (
    <section id="section4" className={styles.section4}>
      <h2 className={styles.h2}>
        Let&apos;s connect
        <div className={styles.line}></div>
      </h2>
      <div className={styles.description}>{connectDesc}
      </div>
      <div className={styles.connect}>
        {github && <a
          href={github}
          target="_blank"
          className={styles.github}
        >
          <img src="/template1/github_logo.png" alt="github logo" />
        
        </a>}
        {x && <a href={x} target="_blank" className={styles.x}>
          <img src="/template1/x_logo.png" alt="" />
        </a>}
        {linkedin && <a
          href={linkedin}
          target="_blank"
          className={styles.linkedin}
        >
          <img src="/template1/linkedin.png" alt="" />
        </a>}
      </div>
      <div className={styles.mail}>
        {email && <div className={styles.mail}>
          Email: {email}
        </div>}
      </div>
      <a className={styles.msgbtn} href={`mailto:${email}`} target="_blank">Contact Me</a>
    </section>
  );
}
