import './App.css';
import SearchBar from './components/SearchBar';
import WeatherList from './components/WeatherList';
import WeatherForm from './components/WeatherForm';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from './constants/constants';

function App() {
  const [weatherList, setWeatherList] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [editing, setEditing] = useState(null);

  const fetchWeather = async () => {
    const res = await fetch(API_BASE_URL);
    const data = await res.json();
    setWeatherList(data);
  };

  const handleSearch = async (city) => {
    const res = await fetch(`${API_BASE_URL}?city=${city}`);
    const data = await res.json();
    if (res.ok) {
      setSearchResult(data);
    } else {
      setSearchResult({ message: data.message });
    }
  };

  const handleDelete = async (id) => {
    await fetch(`${API_BASE_URL}?id=${id}`, { method: 'DELETE' });
    fetchWeather();
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="container">
      <div className='wrapper'>


      <h1>🌤 City Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      {searchResult && (
        <div className="search-result">
          <p><strong>Search Result:</strong></p>
          {searchResult.message ? (
            <p>{searchResult.message}</p>
          ) : (
            <p>{searchResult.city} - {searchResult.condition}, {searchResult.temperature}°C</p>
          )}
        </div>
      )}
      <WeatherForm onSuccess={fetchWeather} editing={editing} setEditing={setEditing} />
      <WeatherList data={weatherList} onEdit={setEditing} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
