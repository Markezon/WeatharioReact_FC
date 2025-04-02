import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useWeatherService from "../../services/WeatherService";
import useWeatherData from "../../hooks/useWeatherData";

const TodayForecast = ({ lat, lon }) => {
  const { data } = useWeatherData(lat, lon, (service) =>
    service.getDayForecastDetails()
  );

  const { loading, error } = useWeatherService();

  const renderItems = (arr) => {
    return arr.map((item, index) => {
      return (
        <div className="forecast-item" key={`${index}`}>
          <div className="icon-wrapper">
            <img src={item.icon} alt="forecast_img" />
            <span>{(item.temp - 273.15).toFixed(2)}&deg;C</span>
          </div>
          <p>{item.time}</p>
          <p>{item.description} </p>
        </div>
      );
    });
  };

  const items = Array.isArray(data) ? renderItems(data) : null;

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? items : null;

  return (
    <div className="card">
      <h2>3 hour forecast</h2>
      <div className="day-forecast">
        {errorMessage}
        {spinner}
        {content}
      </div>
    </div>
  );
};

export default TodayForecast;
