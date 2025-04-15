import useWeatherData from "../../hooks/useWeatherData";
import setContent from "../../utils/setContent";

const TodayForecast = ({ lat, lon }) => {
  const { data, process } = useWeatherData(lat, lon, (service) =>
    service.getDayForecastDetails()
  );

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

  return (
    <div className="card">
      <h2>3 hour forecast</h2>
      <div className="day-forecast">{setContent(process, () => items)}</div>
    </div>
  );
};

export default TodayForecast;
