import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

import FlagCard from './components/FlagCard';
import CountryDetails from './components/CountryDetails';
import Pagination from './components/Pagination';
import './index.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const perPage = 12;

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(sorted);
        setFiltered(sorted);
      });
  }, []);

  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(text)
    );
    setFiltered(filtered);
    setCurrentPage(1);
    setSelectedCountry(null);
  };

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const pageItems = filtered.slice(start, end);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <Router>
      <Routes>
  
        <Route path="/" element={
          <div className="app-container">
            <h2>Country Flags Gallery  🌍 </h2>

            <div className="search-container">
              <input
                className="search-bar"
                type="text"
                placeholder="Search country..."
                value={searchText}
                onChange={handleSearch}
              />
            </div>

            <div className="grid">
              {pageItems.map((country, i) => (
                <FlagCard key={i} country={country} onClick={setSelectedCountry} />
              ))}
            </div>

            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page) => {
                if (page >= 1 && page <= totalPages) setCurrentPage(page);
              }}
            />

            <CountryDetails country={selectedCountry} />
          </div>
        } />
        
    
        <Route path="/country/:id" element={<CountryDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
