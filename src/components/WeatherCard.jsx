export default function WeatherCard({ weather, onEdit, onDelete }) {
    return (
      <div className="weather-card">
        <h3>{weather.city}</h3>
        <p>{weather.condition}</p>
        <p>{weather.temperature}°C</p>
        <button className="edit" onClick={() => onEdit(weather)}>Edit</button>
        <button className="delete" onClick={() => onDelete(weather.id)}>Delete</button>
      </div>
    );
  }
  