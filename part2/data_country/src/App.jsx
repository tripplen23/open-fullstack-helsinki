import React, { useState, useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [countryData, setCountryData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => setCountries(data));
  }, []);

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
    setSelectedCountry(null); // Clear the selected country when the search query changes
  };

  const handleCountryClick = country => {
    setSelectedCountry(country);
  };

  const filteredCountries = countries.filter(country => {
    const countryName = country.name.common.toLowerCase();
    const query = searchQuery.toLowerCase();
    return countryName.includes(query);
  });

  const renderCountries = () => {
    if (selectedCountry) {
      const { name, capital, area, flags, languages } = selectedCountry;
      const languageList = Object.values(languages).map(language => (
        <li key={language}>{language}</li>
      ));
      setCountryData(
        <div>
          <h1>{name.common}</h1>
          <p>Capital: {capital}</p>
          <p>Area: {area}</p>
          <h2>Languages</h2>
          <ul>{languageList}</ul>
          <img src={flags.png} alt={`Flag of ${name.common}`} />
        </div>
      );
    } else if (filteredCountries.length > 10) {
      setCountryData('Please be more specific with your search.');
    } else if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      const languages = Object.values(country.languages).map(language => (
        <li key={language}>{language}</li>
      ));
      setCountryData(
        <div>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <h2>Languages</h2>
          <ul>{languages}</ul>
          <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
        </div>
      );
    } else {
      const countryList = filteredCountries.map(country => (
        <div key={country.name.common}>
          <p>{country.name.common}</p>
          <button onClick={() => handleCountryClick(country)}>Show</button>
        </div>
      ));
      setCountryData(countryList);
    }
  };

  useEffect(() => {
    renderCountries();
  }, [searchQuery, selectedCountry]);

  return (
    <div>
      <input type="text" placeholder="Search countries" onChange={handleSearchChange} />
      <br />
      {countryData}
    </div>
  );
}

export default App;
