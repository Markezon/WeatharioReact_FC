import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useWeatherService from "../../services/WeatherService";
import useWeatherData from "../../hooks/useWeatherData";

const SunriseSunset = ({ lat, lon }) => {
  const { data } = useWeatherData(lat, lon, (service) =>
    service.getSunRiseSetDetails()
  );

  const { loading, error } = useWeatherService();

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <View data={data} /> : null;

  return (
    <div className="card">
      <div className="card-head">
        <p>Sunrise & Sunset</p>
      </div>
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ data }) => {
  const { sRiseTime, sSetTime } = data;

  return (
    <>
      <div className="sunrise-sunset">
        <div className="item">
          <div className="icon">
            <i className="fa-light fa-sunrise fa-4x"></i>
          </div>
          <div>
            <p>Sunrise</p>
            <h2>{sRiseTime}</h2>
          </div>
        </div>

        <div className="item">
          <div className="icon">
            <i className="fa-light fa-sunset fa-4x"></i>
          </div>
          <div>
            <p>Sunset</p>
            <h2>{sSetTime}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default SunriseSunset;
