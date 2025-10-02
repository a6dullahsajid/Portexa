import React from 'react'
import styles from './sectionDivider.module.css'

export default function SectionDivider() {
  return (
    <div className={styles.sectionDivider}>
      <div className={styles.sectionDividerLine}></div>
    </div>
  )
}
