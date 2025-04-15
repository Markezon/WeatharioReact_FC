import { useState, useEffect } from "react";
import useWeatherService from "../services/WeatherService";
import { useHttp } from "./http.hook";

const useWeatherData = (lat, lon, fetchDataFn) => {
  const [data, setData] = useState({});
  const [date, setDate] = useState({});

  const { process, setProcess } = useHttp();

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
    fetchDataFn(service)
      .then(setData)
      .then(() => setProcess("confirmed"));
  };

  const updateDate = () => {
    getDate()
      .then(setDate)
      .then(() => setProcess("confirmed"));
  };

  return { data, date, process, setProcess };
};

export default useWeatherData;
