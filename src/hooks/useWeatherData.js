import { useState, useEffect } from "react";
import useWeatherService from "../services/WeatherService";

const useWeatherData = (lat, lon, fetchDataFn) => {
  const [data, setData] = useState({});
  const [date, setDate] = useState({});

  const { setCoordinates, getDate, ...service } = useWeatherService();

  useEffect(() => {
    if (lat && lon) {
      updateData();
      updateDate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  const updateData = () => {
    setCoordinates(lat, lon);
    fetchDataFn(service).then(setData);
  };

  const updateDate = () => {
    getDate().then(setDate);
  };

  return { data, date };
};

export default useWeatherData;
