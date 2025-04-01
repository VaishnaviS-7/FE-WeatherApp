import WeatherCard from './WeatherCard';

export default function WeatherList({ data, onEdit, onDelete }) {
  return (
    <div className="weather-list">
      {data.map((item) => (
        <WeatherCard key={item.id} weather={item} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
