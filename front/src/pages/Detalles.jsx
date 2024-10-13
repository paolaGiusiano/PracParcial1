import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './Detalles.css'; 

const Detalles = () => {
  const { id } = useParams(); // Obtener el ID del deporte desde la URL
  const [sport, setSport] = useState(null);
  const [error, setError] = useState(null);

  // Función para obtener los detalles del deporte
  const fetchSportDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/games/${id}`);

        setSport(response.data[0]); 
   
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
    <div className="container">
      <h1 className="title">{sport.title}</h1>
      <div className="box">
        <h3 className="subtitle">Detalles del Deporte</h3>
        <p><strong>Descripción:</strong> {sport.description }</p>
        <p><strong>Jugadores:</strong> {sport.players }</p>
        <p><strong>Categorías:</strong> {sport.categories }</p>
      </div>
      <Link to="/home">
        <button className="button is-link">
          Volver a la lista de deportes
        </button>
      </Link>
    </div>
  );
};

export default Detalles;
