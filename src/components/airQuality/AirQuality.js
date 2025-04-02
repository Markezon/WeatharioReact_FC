import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useWeatherService from "../../services/WeatherService";
import useWeatherData from "../../hooks/useWeatherData";

const AirQuality = ({ lat, lon }) => {
  const { data } = useWeatherData(lat, lon, (service) =>
    service.getWeatherAirDetails()
  );

  const { loading, error } = useWeatherService();

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
  const { co, no, no2, o3, so2, pm2_5, pm10, nh3, aqi } = data;
  const aqiList = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
  let aqiClass = `air-index aqi-${aqi}`;

  return (
    <>
      <div className="card-head">
        <p>Air Quality Index</p>
        <p className={aqiClass}>{aqiList[aqi - 1]}</p>
      </div>

      <div className="air-indices">
        <i className="fa-regular fa-wind fa-3x"></i>
        <div className="item">
          <p>PM2.5</p>
          <h2>{pm2_5}</h2>
        </div>

        <div className="item">
          <p>PM10</p>
          <h2>{pm10}</h2>
        </div>

        <div className="item">
          <p>SO2</p>
          <h2>{so2}</h2>
        </div>

        <div className="item">
          <p>CO</p>
          <h2>{co}</h2>
        </div>

        <div className="item">
          <p>NO</p>
          <h2>{no}</h2>
        </div>

        <div className="item">
          <p>NO2</p>
          <h2>{no2}</h2>
        </div>

        <div className="item">
          <p>NH3</p>
          <h2>{nh3}</h2>
        </div>

        <div className="item">
          <p>O3</p>
          <h2>{o3}</h2>
        </div>
      </div>
    </>
  );
};

export default AirQuality;
