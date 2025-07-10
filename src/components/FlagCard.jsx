

import React from 'react';
import { Link } from 'react-router-dom';

function FlagCard({ country }) {
  return (
    <div className="flag">
      <Link to={`/country/${country.cca3}`}>
        <img src={country.flags.png} alt={country.name.common} />
        <p>{country.name.common}</p>
      </Link>
    </div>
  );
}

export default FlagCard;
