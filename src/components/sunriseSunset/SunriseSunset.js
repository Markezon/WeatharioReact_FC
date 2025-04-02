import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import WeatherService from "../../services/WeatherService";

const SunriseSunset = ({ lat, lon }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { setCoordinates, getSunRiseSetDetails } = WeatherService();

  useEffect(() => {
    updateSunRiseSetDetails();
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

  const updateSunRiseSetDetails = () => {
    setCoordinates(lat, lon);
    setLoading(true);
    setError(false);
    getSunRiseSetDetails().then(onDataLoaded).catch(onError);
  };

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
