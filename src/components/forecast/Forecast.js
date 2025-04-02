import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useWeatherService from "../../services/WeatherService";
import useWeatherData from "../../hooks/useWeatherData";

const Forecast = ({ lat, lon }) => {
  const { data } = useWeatherData(lat, lon, (service) =>
    service.getDayForecastDetails()
  );

  const { loading, error } = useWeatherService();

  const renderItems = (arr) => {
    return arr.map((item, index) => {
      return (
        <div className="card" key={`${index}`}>
          <p>{item.day}</p>
          <p>
            {item.dayNumber} {item.month}
          </p>
          <img src={item.icon} alt="hourly-forecast" />
          <p>{(item.temp - 273.15).toFixed(2)}&deg;C</p>
        </div>
      );
    });
  };

  const items = Array.isArray(data) ? renderItems(data) : null;

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? items : null;

  return (
    <div className="hourly-forecast">
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

export default Forecast;
