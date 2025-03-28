import { Component } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import WeatherService from "../../services/WeatherService";

class SunriseSunset extends Component {
  state = {
    /*     sRiseTime: null,
    sSetTime: null, */
    data: {},
    loading: true,
    error: false,
  };

  weatherService = new WeatherService();

  componentDidMount() {
    this.updateSunRiseSetDetails();
    /*     this.updateUserCoordinates().then(() => {
      this.updateSunRiseSetDetails();
    }); */
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lat !== this.props.lat || prevProps.lon !== this.props.lon) {
      this.updateSunRiseSetDetails();
    }

    clearInterval(this.timerId);
  }

  onDataLoaded = (data) => {
    this.setState({
      data,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  /*   updateUserCoordinates = () => {
    return this.weatherService.getUserCoordinates();
  }; */

  updateSunRiseSetDetails = () => {
    this.weatherService.setCoordinates(this.props.lat, this.props.lon);
    this.setState({ loading: true, error: false });
    this.weatherService
      .getSunRiseSetDetails()
      .then(this.onDataLoaded)
      .catch(this.onError);
  };

  render() {
    const { data, loading, error } = this.state;

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
  }
}

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
