import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/Input'; 

const AddSport = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [players, setParticipants] = useState('');
  const [categories, setCategories] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSport = { title: name, description, players, categories };

    try {
      const response = await fetch('http://localhost:3000/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSport),
      });

      if (!response.ok) {
        throw new Error('Error al agregar el deporte');
      }

      navigate('/home'); 
    } catch (err) {
      setError('Error al agregar el deporte');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Agregar Nuevo Deporte</h1>
      {error && <p className="has-text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <InputField
          label="Nombre"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="field">
          <label className="label">Descripción</label>
          <div className="control">
            <textarea
              className="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
        </div>
        <InputField
          label="Cantidad de Participantes"
          type="number"
          value={players}
          onChange={(e) => setParticipants(e.target.value)}
          required
        />
        <InputField
          label="Categorías"
          type="text"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          required
        />
        <div className="control">
          <button type="submit" className="button is-primary">Agregar Deporte</button>
        </div>
      </form>
    </div>
  );
};

export default AddSport;
