import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Para hacer las solicitudes HTTP
import { Link } from 'react-router-dom'; // Para la navegación

const SportList = () => {
  const [sports, setSports] = useState([]); // Estado para almacenar los deportes
  const [error, setError] = useState(null); // Estado para errores

  // Función para obtener la lista de deportes
  const fetchSports = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/games'); // Realizar solicitud GET
      setSports(response.data); // Actualizar el estado con la lista de deportes
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
      setSports(sports.filter((sport) => sport.id !== id)); // Actualizar lista tras la eliminación
    } catch (err) {
      setError('Error al borrar el deporte');
    }
  };

  return (
    <div>
      <h1>Lista de Deportes</h1>
      {error && <p>{error}</p>}
      <ul>
        {sports.map((sport) => (
          <li key={sport.id}>
            <h2>{sport.title}</h2>
            <p>{sport.description}</p>
            <p>Jugadores: {sport.players}</p>
            <p>Categorías: {sport.categories}</p>
            <Link to={`/sports/${sport.id}`}>Ver detalles</Link> {/* Navegación a los detalles */}
            <button onClick={() => handleDelete(sport.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SportList;
