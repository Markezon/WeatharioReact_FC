import { Component, createRef } from "react";
import WeatherService from "../../services/WeatherService";

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.cityInput = createRef();
    this.state = {
      suggestions: [],
    };
    this.weatherService = new WeatherService();
  }

  handleCurrentLocation = () => {
    this.props.updateUserCoordinates();
  };

  handleSearch = (cityName) => {
    this.props.onSearch(cityName);
    this.setState({ suggestions: [] });
    this.cityInput.current.value = "";
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleSearch(this.cityInput.current.value.trim());
    }
  };

  handleInputChange = async (event) => {
    const query = event.target.value;
    if (query.length < 2) {
      this.setState({ suggestions: [] });
      return;
    }

    try {
      const suggestions = await this.weatherService.getCitySuggestions(query);
      this.setState({ suggestions });
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
      this.setState({ suggestions: [] });
    }
  };

  render() {
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
            ref={this.cityInput}
            name="city"
            id="city_input"
            placeholder="Enter city name"
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
          />
          <button
            type="button"
            id="searchBtn"
            onClick={() =>
              this.handleSearch(this.cityInput.current.value.trim())
            }
          >
            <i className="fa-regular fa-search"></i> Search
          </button>
          <button
            type="button"
            id="locationBtn"
            onClick={this.handleCurrentLocation}
          >
            <i className="bx bx-target-lock"></i> Current Location
          </button>

          {this.state.suggestions.length > 0 && (
            <ul className="suggestions">
              {this.state.suggestions.map((city, index) => (
                <li key={index} onClick={() => this.handleSearch(city.name)}>
                  {city.name}, {city.country}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
    );
  }
}

export default AppHeader;
