import styles from "./template1.module.css"

export default function Header({logoImage}) {
    return <header className={styles.header}>
        <div className={styles.logo}><img src={logoImage} alt="profimg" /></div>
        <div className={styles.heading}>Portfolio</div>
    </header>   
}