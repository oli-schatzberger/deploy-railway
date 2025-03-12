'use client';

import { log } from 'console';
import Link from 'next/link';
import { useState } from 'react';

export default function AddKm() {
  const [fin, setFin] = useState('');
  const [km, setKm] = useState('');

  const baseUrl = 'https://it200287.cloud.htl-leonding.ac.at/api/maintenance'
  const baseUrlTest = 'http://localhost:8080/maintenance'

  const handleAddKm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('FIN:', fin);
    console.log('KM:', km);

    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    try {
      console.log(formJson)
      const response = await fetch(`${baseUrl}/addKm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formJson),
      });

      if (!response.ok) {
        console.log("test2")
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        console.log("test")
      }

      console.log(response)

      const result = response;
      console.log('Server Response:', result);

      // Reset inputs
      setFin('');
      setKm('');

      alert('Kilometer erfolgreich hinzugefügt!');
    } catch (error) {
      console.error('Fehler beim Hinzufügen der Kilometer:', error);
      alert('Fehler beim Speichern! Bitte erneut versuchen.');
    }
  };

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
    formContainer: {
      maxWidth: 400,
      margin: '0 auto',
      marginTop: 30,
      padding: 30,
      border: '1px solid #f97316',
      borderRadius: 12,
      backgroundColor: '#1e1e1e',
      color: '#f97316',
      fontFamily: 'Arial, sans-serif',
    },
  };

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


      <div style={styles.formContainer}>
        <h2 style={{ textAlign: 'center', marginBottom: 20 }}>KTM Bike - Kilometer hinzufügen</h2>

        <form onSubmit={handleAddKm}>
          <div style={{ marginBottom: 15 }}>
            <label htmlFor="finInput" style={{ display: 'block', marginBottom: 5 }}>
              FIN:
            </label>
            <input
              id="finInput"
              name="fin"
              placeholder="FIN eingeben"
              value={fin}
              onChange={(e) => setFin(e.target.value)}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 6,
                border: '1px solid #ccc',
              }}
              required
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label htmlFor="kmInput" style={{ display: 'block', marginBottom: 5 }}>
              Kilometer hinzufügen:
            </label>
            <input
              id="kmInput"
              name="km"
              type="number"
              placeholder="KM"
              value={km}
              onChange={(e) => setKm(e.target.value)}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 6,
                border: '1px solid #ccc',
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: 12,
              backgroundColor: '#f97316',
              color: '#fff',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#ea580c')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f97316')}
          >
            Speichern
          </button>
        </form>
      </div>
    </div>
  );
}
