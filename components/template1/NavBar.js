import styles from "./template1.module.css";

export default function NavBar({ experience }) {
  return (
    <nav className={styles.navTemplate1}>
      <a href="#section1">
        <p>
          <img src="/template1/home.svg" alt="logo" />
          Home
        </p>
      </a>
      <a href="#section2">
        <p>
          <img src="/template1/about.svg" alt="logo" />
          About
        </p>
      </a>
      {experience.length !== 0 && <a href="#sectionexp">
        <p>
          <img src="/template1/experience.svg" alt="logo" />
          Experience
        </p>
      </a>
      }
      {experience.length !== 0 && <a href="#section3">
        <p>
          <img src="/template1/project.svg" alt="logo" />
          Projects
        </p>
      </a>}
      <a href="#section4">
        <p>
          <img src="/template1/contact.svg" alt="logo" />
          Contact
        </p>
      </a>
    </nav>
  );
}
