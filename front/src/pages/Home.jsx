import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'; 
import Card from '../components/Card';

const Home = () => {
  const [sports, setSports] = useState([]);
  const [error, setError] = useState(null);

  const fetchSports = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/games');
      if (!response.ok) {
        throw new Error('Error al cargar los deportes');
      }
      const data = await response.json();
      setSports(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchSports();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/games/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al borrar el deporte');
      }
      setSports(sports.filter((sport) => sport.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}> 
      <h1 className={styles.title}>Juegos Olímpicos de París 2024</h1> 
      <Link to="/add-sport">
        <div className={styles.buttonWrapper}>
          <button className={`button is-primary ${styles.primaryButton}`}>
            Agregar juego
          </button>
        </div>
      </Link>
      <div className={styles.columnsMultiline}> 
        {sports.map((sport) => (
          <Card key={sport.id} sport={sport} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Home;
