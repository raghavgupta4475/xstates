import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    // Fetch all countries from the API
    fetch('https://crio-location-selector.onrender.com/countries')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.log(error));
  }, []);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);

    // Fetch states of the selected country from the API
    fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
      .then(response => response.json())
      .then(data => setStates(data))
      .catch(error => console.log(error));
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);

    // Fetch cities of the selected state in the selected country from the API
    fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.log(error));
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
  };

  return (
    <div>
      <h1>Select Location</h1>
      <select value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {countries.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>

      <select value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
        <option value="">Select State</option>
        {states.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      <select value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
        <option value="">Select City</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      {selectedCity && (
        <div className='location-container'><h6>You Selected</h6> <h4>{selectedCity}</h4><p>,</p><p> {selectedState}, {selectedCountry}</p></div>
      )}
    </div>
  );
};

export default App;