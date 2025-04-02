import { useState, useRef } from "react";
import WeatherService from "../../services/WeatherService";

const AppHeader = ({ onSearch, updateUserCoordinates }) => {
  const cityInput = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const {
    getCitySuggestions,
  } = WeatherService();

  const handleCurrentLocation = () => {
    updateUserCoordinates();
  };

  const handleSearch = (cityName) => {
    onSearch(cityName);
    setSuggestions([]);
    if (cityInput.current) {
      cityInput.current.value = "";
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(cityInput.current.value.trim());
    }
  };

  const handleInputChange = async (event) => {
    const query = event.target.value;
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const fetchedSuggestions = await getCitySuggestions(query);
      setSuggestions(fetchedSuggestions);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
      setSuggestions((suggestions) => {
        setSuggestions([]);
      });
    }
  };

  return (
    <header className="header">
      <div className="header_wrapper">
        <img
          src={`${process.env.PUBLIC_URL}/WeatharioLogo.svg`}
          alt="Logo"
          className="header_logo"
        />

        <h2>Weathario</h2>
      </div>

      <div className="wheather-input">
        <input
          type="text"
          ref={cityInput}
          name="city"
          id="city_input"
          placeholder="Enter city name"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          id="searchBtn"
          onClick={() => handleSearch(cityInput.current.value.trim())}
        >
          <i className="fa-regular fa-search"></i> Search
        </button>
        <button type="button" id="locationBtn" onClick={handleCurrentLocation}>
          <i className="bx bx-target-lock"></i> Current Location
        </button>

        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((city, index) => (
              <li key={index} onClick={() => handleSearch(city.name)}>
                {city.name}, {city.country}
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
