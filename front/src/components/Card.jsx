import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ sport, onDelete }) => {
  return (
    <div className="column is-one-third">
      <div className="box">
        <h3 className="subtitle">{sport.title}</h3>
        <div className="buttons is-centered">
          <Link to={`/sports/${sport.id}`} className="button is-link is-outlined">Detalles</Link>
          <button onClick={() => onDelete(sport.id)} className="button is-danger is-outlined">Borrar</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
