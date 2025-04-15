import { useHttp } from "../hooks/http.hook";

const useWeatherService = () => {
  const { clearError, request } = useHttp();

  const _apiBase = "https://api.openweathermap.org/";

  const _apiKey = "d57e7dd67678ae3df53bfb464eebf81a";

  let lat = "";
  let lon = "";

  const setCoordinates = (latitude, longitude) => {
    lat = latitude;
    lon = longitude;
  };

  const getDate = async () => {
    let date = new Date();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return {
      dayNumber: date.getDate(),
      day: days[date.getDay()],
      month: months[date.getMonth()],
      year: date.getFullYear(),
    };
  };

  //AirQuaility

  const getWeatherAirDetails = async () => {
    const res = await request(
      `${_apiBase}data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${_apiKey}`
    );
    return _transformAirDetails(res.list[0]);
  };

  const _transformAirDetails = (data) => {
    return {
      co: data.components.co,
      no: data.components.no,
      no2: data.components.no2,
      o3: data.components.o3,
      so2: data.components.so2,
      pm2_5: data.components.pm2_5,
      pm10: data.components.pm10,
      nh3: data.components.nh3,
      aqi: data.main.aqi,
    };
  };

  //CurrentWeather

  const getWeatherDetails = async () => {
    const res = await request(
      `${_apiBase}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${_apiKey}`
    );

    return _transformWeatherDetails(res);
  };

  const _transformWeatherDetails = (res) => {
    let currentWeatherImg = "";
    let backgroundImage = "";
    switch (res.weather[0].icon) {
      case "01n":
      case "01d":
        currentWeatherImg = "ClearSkySunny.svg";
        backgroundImage = "ClearSky2.jpg";
        break;
      case "02n":
      case "02d":
        currentWeatherImg = "FewClouds.svg";
        backgroundImage = "FewClouds.jpg";
        break;
      case "03n":
      case "03d":
        currentWeatherImg = "ScatteredClouds.svg";
        backgroundImage = "ScatteredClouds.jpg";
        break;
      case "04n":
      case "04d":
        currentWeatherImg = "BrokenClouds.svg";
        backgroundImage = "BrokenClouds.jpg";
        break;
      case "09n":
      case "09d":
      case "10n":
      case "10d":
        currentWeatherImg = "Rain.svg";
        backgroundImage = "Rain.jpg";
        break;
      case "11n":
      case "11d":
        currentWeatherImg = "Thunderstorm.svg";
        backgroundImage = "Thunderstorm.jpg";
        break;
      case "13n":
      case "13d":
        currentWeatherImg = "Snow.svg";
        backgroundImage = "Snow.jpg";
        break;
      case "50n":
      case "50d":
        currentWeatherImg = "Mist.svg";
        backgroundImage = "Mist.jpg";
        break;
      default:
        currentWeatherImg = "WeatherioLogo.svg";
        backgroundImage = "ClearSky2.jpg";
    }

    return {
      temp: res.main.temp,
      description: res.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`,
      humidity: res.main.humidity,
      pressure: res.main.pressure,
      feels_like: res.main.feels_like,
      windSpeed: res.wind.speed,
      visibility: res.visibility,
      weatherImg: currentWeatherImg,
      weatherBackImage: backgroundImage,
    };
  };

  //SunRise SunSet

  const getSunRiseSetDetails = async () => {
    const res = await request(
      `${_apiBase}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${_apiKey}`
    );
    return _transformSunRiseSetDetails(res);
  };

  const _transformSunRiseSetDetails = (res) => {
    const options = { hour: "2-digit", minute: "2-digit", timeZone: "UTC" };
    return {
      sRiseTime: new Intl.DateTimeFormat("en-US", options).format(
        new Date((res.sys.sunrise + res.timezone) * 1000)
      ),
      sSetTime: new Intl.DateTimeFormat("en-US", options).format(
        new Date((res.sys.sunset + res.timezone) * 1000)
      ),
    };
  };

  //DayForecast

  const getDayForecastDetails = async (param) => {
    const res = await request(
      `${_apiBase}data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${_apiKey}`
    );
    if (param) {
      return _transformDayForecastDetails(res);
    } else return _transformTodayDetails(res);
  };

  const _transformTodayDetails = (res) => {
    const data = res.list
      .slice(0, 8)

      .map((item) => ({
        time: item.dt_txt.split(" ")[1].slice(0, 5),
        temp: item.main.temp,
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        description: item.weather[0].description,
        description2: item.weather[0].main,
      }));

    return data;
  };

  const _transformDayForecastDetails = (res) => {
    const today = new Date().getDate();

    const data = res.list.map((item) => ({
      dayNumber: new Date(item.dt_txt).getDate(),
      day: new Date(item.dt_txt.replace(" ", "T")).toLocaleString("en-US", {
        weekday: "long",
      }),
      month: new Date(item.dt_txt.replace(" ", "T")).toLocaleString("en-US", {
        month: "short",
      }),
      temp: item.main.temp,
      icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
    }));

    const filteredData = Object.values(
      data.reduce((acc, item) => {
        const { dayNumber, temp } = item;

        if (
          dayNumber !== today &&
          (!acc[dayNumber] || acc[dayNumber].temp < temp)
        ) {
          acc[dayNumber] = item;
        }

        return acc;
      }, {})
    );

    return filteredData;
  };

  //CityCoordinates

  const getCityCoordinates = async (cityName) => {
    const data = await request(
      `${_apiBase}geo/1.0/direct?q=${cityName}&limit=1&appid=${_apiKey}`
    );
    return _transformGetCityCoordinates(data);
  };

  const _transformGetCityCoordinates = (data) => {
    return {
      country: data[0].country,
      lat: data[0].lat,
      lon: data[0].lon,
      name: data[0].name,
    };
  };

  //UserLocation

  const getUserCoordinates = async () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setCoordinates(latitude, longitude); // Обновляем координаты

            const res = await request(
              `${_apiBase}geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${_apiKey}`
            );
            resolve(_transformGetUserCoordinates(res));
          },
          (error) => reject(error),
          { enableHighAccuracy: true }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };

  const _transformGetUserCoordinates = (data) => {
    return {
      city: data[0].name,
      country: data[0].country,
      lat: data[0].lat,
      lon: data[0].lon,
    };
  };

  //CitySuggestions

  const getCitySuggestions = async (query) => {
    if (!query.trim()) return [];

    const data = await request(
      `${_apiBase}geo/1.0/direct?q=${query}&limit=5&appid=${_apiKey}`
    );

    return data.map((city) => ({
      name: city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
    }));
  };

  return {
    clearError,
    setCoordinates,
    getDate,
    request,
    getWeatherAirDetails,
    getWeatherDetails,
    getSunRiseSetDetails,
    getDayForecastDetails,
    getCityCoordinates,
    getUserCoordinates,
    getCitySuggestions,
  };
};

export default useWeatherService;
