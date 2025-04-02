import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import useWeatherService from "../../services/WeatherService";
import useWeatherData from "../../hooks/useWeatherData";

const CurrentWeather = ({ lat, lon, city, country, updateBackgroundImage }) => {
  const { data, date } = useWeatherData(lat, lon, (service) =>
    service.getWeatherDetails()
  );

  const { loading, error } = useWeatherService();

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <View data={data} date={date} city={city} country={country} />
  ) : null;

  return (
    <div className="card">
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ data, date, city, country }) => {
  const { temp, description, icon, feels_like, weatherImg } = data;
  const { dayNumber, day, month, year } = date;
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
          <i className="fa-light fa-calendar"></i> {day}, {dayNumber} {month},{" "}
          {year}
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
