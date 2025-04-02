import { useState, useEffect } from "react";
import useWeatherService from "../services/WeatherService";

const useWeatherData = (lat, lon, fetchDataFn) => {
  const [data, setData] = useState({});
  const {setCoordinates, ...service } = useWeatherService();

  useEffect(() => {
    if (lat && lon) {
      updateData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  const updateData = () => {
    setCoordinates(lat, lon);
    fetchDataFn(service).then(setData);
  };

  return { data };
};

export default useWeatherData;
