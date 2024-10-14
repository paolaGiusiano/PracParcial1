import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [sports, setSports] = useState([]);
  const [error, setError] = useState(null);

  // Función para obtener la lista de deportes
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
    <div className="container">
      <h1 className="title">Juegos Olímpicos de París 2024</h1>
      <Link to="/add-sport">
        <button className="button is-primary">Agregar juego</button>
      </Link>
      <div className="columns is-multiline">
        {sports.map((sport) => (
          <div key={sport.id} className="column is-one-third">
            <div className="box">
              <h3 className="subtitle">{sport.title}</h3>
              <div className="buttons is-centered">
                <Link to={`/sports/${sport.id}`} className="button is-link is-outlined">Detalles</Link>
                <button onClick={() => handleDelete(sport.id)} className="button is-danger is-outlined">Borrar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
