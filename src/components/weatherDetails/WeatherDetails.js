import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useWeatherService from "../../services/WeatherService";

const WeatherDetails = ({ lat, lon }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { setCoordinates, getWeatherDetails } = useWeatherService();

  useEffect(() => {
    updateWeatherDetails();
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

  const updateWeatherDetails = () => {
    setCoordinates(lat, lon);
    setLoading(true);
    setError(false);
    getWeatherDetails().then(onDataLoaded).catch(onError);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <View data={data} /> : null;

  return (
    <div className="card">
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ data }) => {
  const { humidity, pressure, feels_like, windSpeed, visibility } = data;
  return (
    <>
      <div className="card">
        <div className="card-head">
          <p>Humidity</p>
        </div>
        <div className="card-item">
          <i className="fa-light fa-droplet fa-2x"></i>
          <h2 id="humidityVal">{humidity}%</h2>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <p>Pressure</p>
        </div>
        <div className="card-item">
          <i className="fa-light fa-compass fa-2x"></i>
          <h2 id="pressureVal">{pressure}hPa</h2>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <p>Visibility</p>
        </div>
        <div className="card-item">
          <i className="fa-light fa-eye fa-2x"></i>
          <h2 id="visibilityVal">{visibility / 1000}km</h2>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <p>Wind Speed</p>
        </div>
        <div className="card-item">
          <i className="fa-light fa-location-arrow fa-2x"></i>
          <h2 id="windSpeedVal">{windSpeed}m/s</h2>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <p>Feels like</p>
        </div>
        <div className="card-item">
          <i className="fa-light fa-temperature-list fa-2x"></i>
          <h2 id="feelsVal">{(feels_like - 273.15).toFixed(2)}&deg;C</h2>
        </div>
      </div>
    </>
  );
};

export default WeatherDetails;
