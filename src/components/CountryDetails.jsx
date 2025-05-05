import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CountryMap from './Map';

function CountryDetails() {
  const { id } = useParams(); 
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${id}`)
      .then(res => res.json())
      .then(data => {
        setCountry(data[0]);
      });
  }, [id]);

  if (!country) return <div>Loading...</div>;

  const currency = country.currencies ? Object.values(country.currencies)[0] : { name: 'N/A', symbol: '' };
  const nativeNames = country.name.nativeName
    ? Object.values(country.name.nativeName).map(n => n.common).join(', ')
    : 'N/A';
  const tld = country.tld?.join(', ') || 'N/A';
  const coatOfArms = country.coatOfArms?.png;
  const regionalBlocs = country.regionalBlocs
    ? country.regionalBlocs.map(bloc => bloc.name).join(', ')
    : 'N/A';
  const latlng = country.latlng ? country.latlng : [];

  return (
    <div className="country-card">
      <div className="country-header">
        <h2>{country.name.common}</h2>
        <span className="country-flag">{country.flag}</span>
      </div>

      <div className="country-images">
        <img src={country.flags.png} alt="Flag" className="flag-img" />
        {coatOfArms && <img src={coatOfArms} alt="Coat of Arms" className="coat-img" />}
      </div>

      <div className="country-info">
        <div className="info-column">
          <p><strong>Official Name:</strong> {country.name.official}</p>
          <p><strong>Native Name(s):</strong> {nativeNames}</p>
          <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Continent:</strong> {country.continents?.join(', ')}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        </div>
        <div className="info-column">
          <p><strong>Currency:</strong> {currency.name} ({currency.symbol})</p>
          <p><strong>Top Level Domain:</strong> {tld}</p>
          <p><strong>FIFA Code:</strong> {country.fifa || 'N/A'}</p>
          <p><strong>UN Member:</strong> {country.unMember ? 'Yes' : 'No'}</p>
          <p><strong>Independent:</strong> {country.independent ? 'Yes' : 'No'}</p>
          <p><strong>Driving Side:</strong> {country.car?.side || 'N/A'}</p>
        </div>
      </div>

      <div className="country-borders">
        <p><strong>Borders:</strong> {country.borders?.join(', ') || 'None'}</p>
        <p><strong>Regional Blocs:</strong> {regionalBlocs}</p>
      </div>

      <div className="country-map">
        <CountryMap latlng={latlng} />
      </div>
    </div>
  );
}

export default CountryDetails;
