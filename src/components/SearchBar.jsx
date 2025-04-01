import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleChange = (e) => {
    // 1) Update local state with the new city value
    const newValue = e.target.value;
    setCity(newValue);

    // 2) Clear any existing timer so we can restart it
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // 3) Set a new timer to call onSearch after 300ms of no typing
    const timeout = setTimeout(() => {
      onSearch(newValue); // pass the updated value
    }, 300);

    setTypingTimeout(timeout);
  };

  const handleSearchClick = () => {
    // Manual search on button click
    onSearch(city);
  };

  return (
    <div className="search-bar">
      <input
        placeholder="Search city..."
        value={city}
        onChange={handleChange}
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
}
