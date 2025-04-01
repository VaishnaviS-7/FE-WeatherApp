import axios from 'axios';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants/constants';

export default function WeatherForm({ onSuccess, editing, setEditing }) {
  const [city, setCity] = useState('');
  const [condition, setCondition] = useState('');
  const [temperature, setTemperature] = useState('');

  useEffect(() => {
    if (editing) {
      setCity(editing.city);
      setCondition(editing.condition);
      setTemperature(editing.temperature);
    }
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      city,
      condition,
      temperature: parseFloat(temperature)
    };

    try {
      let response;

      // If updating...
      if (editing) {
        payload.id = editing.id; // existing record ID
        response = await axios.put(API_BASE_URL, payload, {
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        try {
            
            // If creating new entry...
            response = await axios.post(API_BASE_URL, payload, {
              headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            console.log(error,"><>>>>>>>>>>>>>>")
        }
      }

      // If success...
      if (response.status === 200 || response.status === 201) {
        setCity('');
        setCondition('');
        setTemperature('');
        setEditing(null);
        onSuccess(); // Refresh parent list or do any post-submit logic
      }
    } catch (err) {
      // Handle errors (4xx, 5xx, network issues, etc.)
      if (err.response) {
        alert(err.response.data.message || 'Something went wrong');
      } else {
        alert('Network error or server not responding');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="weather-form">
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        required
      />
      <input
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
        placeholder="Condition"
        required
      />
      <input
        type="number"
        value={temperature}
        onChange={(e) => setTemperature(e.target.value)}
        placeholder="Temp (°C)"
        required
      />
      <button type="submit">{editing ? 'Update' : 'Add'}</button>
    </form>
  );
}
