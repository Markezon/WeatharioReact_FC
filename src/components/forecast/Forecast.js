import useWeatherData from "../../hooks/useWeatherData";
import setContent from "../../utils/setContent";

const Forecast = ({ lat, lon }) => {
  const { data, process } = useWeatherData(lat, lon, (service) =>
    service.getDayForecastDetails()
  );

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

  return (
    <div className="hourly-forecast">{setContent(process, () => items)}</div>
  );
};

export default Forecast;
