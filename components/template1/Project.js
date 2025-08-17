import styles from "./template1.module.css"

export default function Project({ name, description, image, link, code, techUsed }) {
  return (
    <div className={styles.project}>
      <div className={styles.projectImage}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.projectName}>{name}</div>
      <div className={styles.projectDescription}>{description}</div>
      <div className={styles.tech}><b>Tech Used:</b> {techUsed}</div>
      <div className={styles.links}>
        <a href={link} target="_blank">
          <img src="/template1/preview.svg" alt="prev" />
          Preview
        </a>
        <a href={code} target="_blank">
          <img src="/template1/code.svg" alt="code" />
          Code
        </a>
      </div>
    </div>
  );
}
