import { useState, useEffect } from "react";
import useWeatherService from "../../services/WeatherService";
import AppHeader from "../appHeader/AppHeader";
import AirQuality from "../airQuality/AirQuality";
import CurrentWeather from "../currentWeather/CurrentWeather";
import SunriseSunset from "../sunriseSunset/SunriseSunset";
import Forecast from "../forecast/Forecast";
import WeatherDetails from "../weatherDetails/WeatherDetails";
import TodayForecast from "../todayForecast/TodayForecast";
import Spinner from "../spinner/Spinner";

const App = () => {
  const {
    setCoordinates,
    getWeatherDetails,
    getCityCoordinates,
    getUserCoordinates,
  } = useWeatherService();

  const [lat, setLat] = useState(55.7504461);
  const [lon, setLon] = useState(37.6174943);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [weatherBackImage, setWeatherBackImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    updateUserCoordinates();

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  ///автоматически будет обновлять фон при изменении координат
  useEffect(() => {
    updateBackgroundImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  const updateUserCoordinates = () => {
    getUserCoordinates().then((res) => {
      setLat((lat) => res.lat);
      setLon((lon) => res.lon);
      setCountry((country) => res.country);
      setCity((city) => res.city);
    });
  };

  const updateBackgroundImage = () => {
    setCoordinates(lat, lon);
    getWeatherDetails().then((res) => {
      setWeatherBackImage((weatherBackImage) => res.weatherBackImage);
    });
  };

  const onSearch = (cityName) => {
    setSearchError("");
    getCityCoordinates(cityName)
      .then((res) => {
        setLat((lat) => res.lat);
        setLon((lon) => res.lon);
        setCountry((country) => res.country);
        setCity((city) => res.name);
      })
      .catch((error) => {
        console.error("City not found:", error);
        setSearchError("not found");
      });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(/images/${weatherBackImage})`, // Используем фоновое изображение
        backgroundSize: "cover", // Масштабируем фон
        backgroundPosition: "center", // Центрируем фон
        minHeight: "100vh", // Устанавливаем минимальную высоту для контейнера
      }}
    >
      <main className="main">
        <AppHeader
          onSearch={onSearch}
          updateUserCoordinates={updateUserCoordinates}
          searchError={searchError}
          setSearchError={setSearchError}
        />
        <div className="weather-data">
          <div className="weather-left">
            <CurrentWeather
              lat={lat}
              lon={lon}
              country={country}
              city={city}
              updateBackgroundImage={updateBackgroundImage}
            />
            <TodayForecast lat={lat} lon={lon} />
          </div>

          <div className="weather-right">
            <h2>Today's Highlights</h2>
            <div className="highlights">
              <AirQuality lat={lat} lon={lon} />
              <SunriseSunset lat={lat} lon={lon} />
              <WeatherDetails lat={lat} lon={lon} />
            </div>

            <h2>5 days forecast</h2>
            <Forecast lat={lat} lon={lon} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
