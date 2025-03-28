import { createRoot } from "react-dom/client";
import App from "./components/app/App";

import WeatherService from "./services/WeatherService";

import "./style/style.scss";

console.log(navigator.geolocation.getCurrentPosition);

const weatherService = new WeatherService();

/* weatherService
  .getWeatherAirDetails()
  .then((res) => console.log(res.list[0].components)); */

/* weatherService.getWeatherDetails().then((res) => console.log(res)); */
/* weatherService.getUserCoordinates().then((res) => console.log(res)); */

/* weatherService.getDayForecastDetails().then((res) => console.log(res.list)); */

/* weatherService.getCityCoordinates(); */

/* {
  "country": "GB",
  "lat": 51.5073219,
  "lon": -0.1276474,
  "name": "London"
} */

/* weatherService.getDayForecastDetails(); */
/* weatherService.getWeatherAirDetails22().then((res) => console.log(res)); */
/* weatherService.getDayForecastDetails().then((res) =>
  console.log(
    res.list.reduce((acc, item) => {
      const date = item.dt_txt.split(" ")[0]; // Получаем YYYY-MM-DD
      if (!acc[date]) {
        acc[date] = { temps: [] };
      }
      acc[date].temps.push(item.main.temp);
      return acc;
    }, {})
  )
); */

/* const getFiveDayAvgTemp = (data) => {
  const dailyData = data.list.reduce((acc, item) => {
    const date = item.dt_txt.split(" ")[0]; // Получаем YYYY-MM-DD
    if (!acc[date]) {
      acc[date] = { temps: [] };
    }
    acc[date].temps.push(item.main.temp);
    return acc;
  }, {});

  return Object.keys(dailyData)
    .slice(0, 5) // Берем только 5 дней
    .map((date) => ({
      date,
      avgTemp: (
        dailyData[date].temps.reduce((sum, t) => sum + t, 0) /
        dailyData[date].temps.length
      ).toFixed(1),
    }));
}; */

/* weatherService.getCityCoordinates().then((res) => console.log(res[0])); */

/* weatherService.getUserCoordinates().then((res) => console.log(res[0])); */

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
