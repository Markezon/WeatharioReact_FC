import { useState, useRef, useEffect } from "react";
import useWeatherService from "../../services/WeatherService";

const AppHeader = ({
  onSearch,
  updateUserCoordinates,
  searchError,
  setSearchError,
}) => {
  const cityInput = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);
  const { getCitySuggestions } = useWeatherService();

  // useEffect для отслеживания состояния кнопки поиска
  useEffect(() => {
    setIsSearchDisabled(!inputValue.trim());
  }, [inputValue]);

  const handleCurrentLocation = () => {
    updateUserCoordinates();
    if (searchError) {
      setSearchError("");
    }
  };

  const handleSearch = (cityName) => {
    onSearch(cityName);
    setSuggestions([]);
    if (cityInput.current) {
      cityInput.current.value = "";
      setInputValue("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !isSearchDisabled) {
      handleSearch(inputValue.trim());
    }
  };

  const handleInputChange = async (event) => {
    const query = event.target.value;
    setInputValue(query);

    if (searchError) {
      setSearchError("");
    }

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

        {searchError && <div className="error-message">{searchError}</div>}

        <button
          type="button"
          id="searchBtn"
          onClick={() => handleSearch(inputValue.trim())}
          disabled={isSearchDisabled}
          style={{
            opacity: isSearchDisabled ? 0.5 : 1,
            cursor: isSearchDisabled ? "not-allowed" : "pointer",
          }}
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
