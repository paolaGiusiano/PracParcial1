import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './Detalles.module.css'; 

const Detalles = () => {
  const { id } = useParams(); // Obtener el ID del deporte desde la URL
  const [sport, setSport] = useState(null);
  const [error, setError] = useState(null);

  // Función para obtener los detalles del deporte
  const fetchSportDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/games/${id}`);
      if (!response.ok) {
        throw new Error('Error al cargar los detalles del deporte');
      }
      const data = await response.json();
      setSport(data[0]); 
    } catch (err) {
      setError('Error al cargar los detalles del deporte');
      console.error(err); 
    }
  };

  useEffect(() => {
    fetchSportDetails();
  }, [id]);

  if (!sport) {
    return <p>Cargando...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{sport.title}</h1>
      <div className={styles.box}>
        <h3 className={styles.subtitle}>Detalles del Deporte</h3>
        <p><strong>Descripción:</strong> {sport.description}</p>
        <p><strong>Jugadores:</strong> {sport.players}</p>
        <p><strong>Categoría:</strong> {sport.categories}</p>
      </div>
      <Link to="/home">
        <button className={`button is-link ${styles.button}`}>
          Volver a la lista de deportes
        </button>
      </Link>
    </div>
  );
};

export default Detalles;
