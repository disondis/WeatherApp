import './App.css';
import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const apikey = 'e9f6b4eef9931a1c317bef2d3c2e21f4';

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
      setWeatherData(response.data);
    } catch (err) {
      setError('City not found');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Weather APP</h1>
      <label>City Name</label>
      <input 
        type="text" 
        placeholder="Enter City Name" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
      />
      <button type="button" onClick={fetchData} disabled={loading}>
        {loading ? 'Fetching...' : 'Get Weather'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weatherData && (
        <div className="weather-card">
          <h1>{weatherData.name}, {weatherData.sys.country}</h1>
          <div>Temperature: {Math.round(weatherData.main.temp)}°C</div>
          <div>Max Temp: {Math.round(weatherData.main.temp_max)}°C</div>
          <div>Min Temp: {Math.round(weatherData.main.temp_min)}°C</div>
          <div>Latitude: {weatherData.coord.lat}</div>
          <div>Longitude: {weatherData.coord.lon}</div>
        </div>
      )}
      <footer>Designed By:<a href='https://www.linkedin.com/in/dison-t-20241a315/'>Dison</a></footer>
    </div>
  );
}

export default App;
