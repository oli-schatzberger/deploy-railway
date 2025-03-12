'use client';

import Link from 'next/link'; // ✅ Das richtige Link!


const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#1e1e1e',
    color: '#fff',
    minHeight: '100vh',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f97316',
    padding: '1rem 2rem',
  },
  brand: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '1rem',
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    padding: '2rem',
  },
};

export default function Home() {
  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <h1 style={styles.brand}>KTM Maintenance</h1>
        <ul style={styles.navLinks}>
          <li>
            <Link href="/" style={styles.link}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/addKm" style={styles.link}>
              Kilometer hinzufügen
            </Link>
          </li>
          <li>
            <Link href="/service" style={styles.link}>
              Service hinzufügen
            </Link>
          </li>
        </ul>
      </nav>

      <div style={styles.content}>
        <p>Willkommen bei KTM Maintenance. Wähle eine Aktion im Menü.</p>
      </div>
    </div>
  );
}
