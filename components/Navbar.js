"use client"; // Habilitamos hooks si es necesario más adelante.

import Link from 'next/link';
import styles from '../styles/Navbar.module.css'; // Para estilos si decides usar CSS Modules

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">DivisasApp</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );

  
}