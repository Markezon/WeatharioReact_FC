import useWeatherData from "../../hooks/useWeatherData";
import setContent from "../../utils/setContent";

const SunriseSunset = ({ lat, lon }) => {
  const { data, process } = useWeatherData(lat, lon, (service) =>
    service.getSunRiseSetDetails()
  );

  return (
    <div className="card">
      <div className="card-head">
        <p>Sunrise & Sunset</p>
      </div>
      {setContent(process, View, data)}
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
