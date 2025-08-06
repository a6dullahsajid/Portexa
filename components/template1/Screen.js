import Section1 from '@/components/template1/Section1.js';
import Section2 from '@/components/template1/Section2.js';
import Section3 from '@/components/template1/Section3.js';
import Section4 from '@/components/template1/Section4.js';
import styles from "./template1.module.css"
import SectionExp from './SectionExp';

export default function Screen({ userData }) {
    return <main className={styles.main}>
        <Section1 userName={userData.details.name} title={userData.details.title} profileImage={userData.details.profileImage} />
        <Section2 bio={userData.details.bio} skills={userData.details.skills} />
        {userData.details.experience.length !== 0 && <SectionExp userDetails={userData.details} />}
        <Section3 projects={userData.details.projects} />
        <Section4 connectDesc={userData.details.connectDesc} github={userData.details.github} linkedin={userData.details.linkedin} x={userData.details.x} email={userData.details.email} />
    </main>
}