import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useWeatherService from "../../services/WeatherService";

const TodayForecast = ({ lat, lon }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { setCoordinates, getDayForecastDetails } = useWeatherService();

  useEffect(() => {
    updateDayForecastDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  const onDataLoaded = (data) => {
    setData(data);
    setLoading(false);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const updateDayForecastDetails = () => {
    setCoordinates(lat, lon);
    setLoading(true);
    setError(false);
    getDayForecastDetails().then(onDataLoaded).catch(onError);
  };

  const renderItems = (arr) => {
    return arr.map((item) => {
      return (
        <div
          className="forecast-item"
          key={`${item.time}-${item.temp}-${item.icon}`}
        >
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
