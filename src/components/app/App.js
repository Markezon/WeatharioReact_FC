import { Component } from "react";
import WeatherService from "../../services/WeatherService";
import AppHeader from "../appHeader/AppHeader";
import AirQuality from "../airQuality/AirQuality";
import CurrentWeather from "../currentWeather/CurrentWeather";
import SunriseSunset from "../sunriseSunset/SunriseSunset";
import Forecast from "../forecast/Forecast";
import WeatherDetails from "../weatherDetails/WeatherDetails";
import TodayForecast from "../todayForecast/TodayForecast";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 55.7504461,
      lon: 37.6174943,
      country: "",
      city: "",
      weatherBackImage: "",
    };
  }

  weatherService = new WeatherService();

  componentDidMount() {
    this.updateUserCoordinates();
    this.updateBackgroundImage();
  }

  updateUserCoordinates = () => {
    this.weatherService.getUserCoordinates().then((res) => {
      this.setState(
        {
          lat: res.lat,
          lon: res.lon,
          city: res.city,
          country: res.country,
        }
        /*         this.updateBackgroundImage */
      );
    });
  };

  updateBackgroundImage = () => {
    this.weatherService.setCoordinates(this.state.lat, this.state.lon);
    this.weatherService.getWeatherDetails().then((res) => {
      console.log(res);
      this.setState({
        weatherBackImage: res.weatherBackImage,
      });
    });
  };

  onSearch = (cityName) => {
    this.weatherService.getCityCoordinates(cityName).then((res) => {
      this.setState(
        {
          lat: res.lat,
          lon: res.lon,
          country: res.country,
          city: res.name,
        },
        this.updateBackgroundImage
      );
    });
  };

  render() {
    const { weatherBackImage } = this.state;

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
            onSearch={this.onSearch}
            updateUserCoordinates={this.updateUserCoordinates}
          />
          <div className="weather-data">
            <div className="weather-left">
              <CurrentWeather
                lat={this.state.lat}
                lon={this.state.lon}
                country={this.state.country}
                city={this.state.city}
                updateBackgroundImage={this.updateBackgroundImage}
              />
              <TodayForecast lat={this.state.lat} lon={this.state.lon} />
            </div>

            <div className="weather-right">
              <h2>Today's Highlights</h2>
              <div className="highlights">
                <AirQuality lat={this.state.lat} lon={this.state.lon} />
                <SunriseSunset lat={this.state.lat} lon={this.state.lon} />
                <WeatherDetails lat={this.state.lat} lon={this.state.lon} />
              </div>

              <h2>5 days forecast</h2>
              <Forecast lat={this.state.lat} lon={this.state.lon} />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
