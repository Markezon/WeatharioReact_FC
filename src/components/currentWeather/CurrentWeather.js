import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import WeatherService from "../../services/WeatherService";

class CurrentWeather extends Component {
  state = {
    data: {},
    loading: true,
    error: false,
  };

  weatherService = new WeatherService();

  componentDidMount() {
    this.updateWeatherDetails();
    this.updateDate();

    /*     this.updateUserCoordinates().then(() => {
      this.updateWeatherDetails();
      this.updateDate();
    }); */
    /*     this.timerId = setInterval(this.updateAirDetails, 10 * 60 * 1000); */
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.lat !== this.props.lat ||
      prevProps.lon !== this.props.lon /* ||
      prevProps.weatherBackImage !== this.props.weatherBackImage */
    ) {
      this.updateWeatherDetails();
    }

    /*     this.updateNameCountry(); */
  }

  updateNameCountry = () => {
    this.setState({
      city: this.props.city,
      country: this.props.country,
    });
  };

  onDataLoaded = (data) => {
    this.setState({
      data,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  updateWeatherDetails = () => {
    this.weatherService.setCoordinates(this.props.lat, this.props.lon);
    this.setState({ loading: true, error: false });
    this.weatherService
      .getWeatherDetails()
      .then((res) => {
        this.onDataLoaded(res);
        this.props.updateBackgroundImage();
      })
      /*       .then(this.onDataLoaded) */
      .catch(this.onError);
  };

  updateDate = () => {
    this.weatherService.getDate().then((res) => {
      this.setState({
        dayNumber: res.dayNumber,
        day: res.day,
        month: res.month,
        year: res.year,
      });
    });
  };

  /*   updateUserCoordinates = () => {
    return this.weatherService.getUserCoordinates().then((res) => {
      this.setState({
        city: res.city,
        country: res.country,
      });
    });
  }; */

  render() {
    const {
      data,
      loading,
      error,
      dayNumber,
      day,
      month,
      year /* , city, country  */,
    } = this.state;
    const { city, country } = this.props;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? (
      <View
        data={data}
        dayNumber={dayNumber}
        day={day}
        month={month}
        year={year}
        city={city}
        country={country}
      />
    ) : null;

    return (
      <div className="card">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({ data, dayNumber, day, month, year, city, country }) => {
  const { temp, description, icon, feels_like, weatherImg } = data;
  return (
    <>
      <div className="current-weather">
        <div className="details">
          <p>Now</p>
          <h2>{(temp - 273.15).toFixed(2)}&deg;C</h2>
          <p>{description} </p>
        </div>
        <div className="weather-icon">
          <img src={icon} alt="weather-icon" />
        </div>
      </div>

      <hr />
      <div className="card-footer">
        <p>
          <i className="fa-light fa-calendar"></i> {day}, {weatherImg}{" "}
          {dayNumber} {month}, {year}
        </p>
        <p>
          <i className="fa-light fa-location-dot"></i> {city}, {country}
        </p>
      </div>
      <hr />

      <div className="feelsLike__card">
        <div className="feelsLike__card-item">
          <div className="feelsLike__card-head">
            <p>Feels like</p>
          </div>
          <i className="fa-light fa-temperature-list fa-2x"></i>
          <h2 id="feelsVal">{(feels_like - 273.15).toFixed(2)}&deg;C</h2>
        </div>

        <img
          src={`${process.env.PUBLIC_URL}/${weatherImg}`}
          alt="weather-icon"
          className="weatherImg"
        />
      </div>
    </>
  );
};

export default CurrentWeather;
