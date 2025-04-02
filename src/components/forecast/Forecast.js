import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useWeatherService from "../../services/WeatherService";

const Forecast = ({ lat, lon }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { setCoordinates, getDayForecastDetails } = useWeatherService();
  const param = true;

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
    getDayForecastDetails(param).then(onDataLoaded).catch(onError);
  };

  const renderItems = (arr) => {
    return arr.map((item) => {
      return (
        <div
          className="card"
          key={`${item.dayNumber}-${item.month}-${item.day}`}
        >
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
