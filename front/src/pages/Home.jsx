import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  const [sports, setSports] = useState([]);
  const [error, setError] = useState(null);

  // Función para obtener la lista de deportes
  const fetchSports = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/games');
      setSports(response.data);
    } catch (err) {
      setError('Error al cargar los deportes');
    }
  };

  useEffect(() => {
    fetchSports();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/games/${id}`);
      setSports(sports.filter((sport) => sport.id !== id));
    } catch (err) {
      setError('Error al borrar el deporte');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Título de la aplicación</h1>
      {error && <p className="has-text-danger">{error}</p>}
      <Link to="/add-sport">
        <button className="button is-primary">
          Agregar juego
        </button>
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
