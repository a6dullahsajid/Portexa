'use client'

import React, { useState, useEffect } from 'react'
import { Bitter } from 'next/font/google'
import styles from './template6.module.css'

const bitter = Bitter({ subsets: ['latin'], weight: ['400', '600', '700'], display: 'swap' })

export default function Navbar({ details }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (menuOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const menuLinks = [
    { href: '#section1', label: 'Home' },
    { href: '#section2', label: 'About' },
    { href: '#section3', label: details.experience?.length ? 'Experience' : '' },
    { href: '#section4', label: 'Projects' },
    { href: '#section5', label: 'Contact' },
  ].filter((link) => link.label)

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <img src={details.profileImage} alt="Logo" className={styles.logoImg} />
        </div>
        <span className={`${styles.logoText} ${bitter.className}`}>Portfolio</span>
      </div>

      <div className={styles.menuContainer}>
        {menuLinks.map((link) => (
          <a key={link.href} className={styles.menu} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>

      <button
        type="button"
        className={`${styles.hamburgerButton} ${menuOpen ? styles.hamburgerOpen : ''}`}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span className={styles.hamburgerBar} />
        <span className={styles.hamburgerBar} />
        <span className={styles.hamburgerBar} />
      </button>

      {isVisible && (
        <div
          className={`${styles.mobileMenuOverlay} ${menuOpen ? styles.mobileMenuOverlayOpen : ''}`}
          aria-hidden="true"
          onClick={closeMenu}
        >
          <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`} onClick={(e) => e.stopPropagation()}>
            {menuLinks.map((link, index) => (
              <a
                key={link.href}
                className={`${styles.mobileMenuLink} ${menuOpen ? styles.mobileMenuLinkOpen : ''}`}
                href={link.href}
                onClick={closeMenu}
                style={{ transitionDelay: menuOpen ? `${0.15 + index * 0.05}s` : '0s' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
