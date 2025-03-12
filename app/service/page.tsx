'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Bike } from '../model/Bike';
import { Service } from '../model/Service';

export default function AddService() {
  const [fin, setFin] = useState('');
  const [km, setKm] = useState('');
  const [selectedService, setService] = useState<number | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [selectedBikeId, setSelectedBikeId] = useState<number | null>(null);
  const baseUrl = 'https://it200287.cloud.htl-leonding.ac.at/api/maintenance'
  const baseUrlTest = 'http://localhost:8080/maintenance'

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await fetch(`${baseUrl}/allBikes`);
        const data = await response.json();
        setBikes(data as Bike[]);
      } catch (error) {
        console.error('Fehler beim Laden der Bikes:', error);
      }
    };

    fetchBikes();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      if (!selectedBikeId) return;

      try {
        const response = await fetch(`${baseUrl}/getServicesByBike/${selectedBikeId}`);
        const data = await response.json();
        console.log('Services Response:', data.services);
        setServices(data.services);
      } catch (error) {
        console.error('Fehler beim Laden der Services:', error);
      }
    };

    fetchServices();
  }, [selectedBikeId]);

  const handleAddService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    //formData.append('bikeId', String(selectedBikeId));


    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson)


    try {

      const response = await fetch(`${baseUrl}/addServiceHistoryFromShop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formJson),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setService(null)
      setFin('')
      setKm('')


      alert('Kilometer erfolgreich hinzugefügt!');
    } catch (error) {

      alert('Kilometer erfolgreich hinzugefügt!');
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
        <h2 style={{ textAlign: 'center', marginBottom: 20 }}>
          KTM Bike - Service hinzufügen
        </h2>

        <form onSubmit={handleAddService}>
          <div style={{ marginBottom: 20 }}>
            <label htmlFor="bikeSelect" style={{ display: 'block', marginBottom: 5 }}>
              Bike auswählen:
            </label>
            <select
              id="bikeSelect"
              name="bike"
              value={selectedBikeId !== null ? selectedBikeId : ''}
              onChange={(e) => setSelectedBikeId(Number(e.target.value))}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 6,
                border: '1px solid #ccc',
              }}
              required
            >
              <option value="">Bitte auswählen</option>
              {bikes.map((bike: Bike) => (
                <option key={bike.id} value={bike.id}>
                  {bike.brand} {bike.model}
                </option>
              ))}
            </select>
          </div>

          {selectedBikeId !== null && (
            <div style={{ marginBottom: 20 }}>
              <label htmlFor="serviceInput" style={{ display: 'block', marginBottom: 5 }}>
                Service auswählen:
              </label>
              <select
                id="serviceInput"
                name="service"
                value={selectedService !== null ? selectedService : ''}
                onChange={(e) => setService(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 6,
                  border: '1px solid #ccc',
                }}
                required
              >
                <option value="">Bitte auswählen</option>
                {services.map((serviceItem: Service) => (
                  <option key={serviceItem.serviceId} value={serviceItem.serviceId}>
                    {serviceItem.title}
                  </option>
                ))}
              </select>
            </div>
          )}

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
              Kilometer beim Service:
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
