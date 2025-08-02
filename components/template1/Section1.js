import styles from "./template1.module.css"

export default function Section1({ userName, title, profileImage }) {
  return (
    <section className={`${styles.section} ${styles.section1}`}>
      <div className={styles.designation}>
        <div className={styles.name}>{userName}</div>
        <div className={styles.profession}>{title}</div>
      </div>
      <div className={styles.profile}>
        <img src={profileImage} alt="Profile Photo" />
      </div>
    </section>
  );
}
