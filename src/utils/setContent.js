import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

const setContent = (process, Component, data, date, city, country) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return <Spinner />;
    case "confirmed":
      return (
        <Component data={data} date={date} city={city} country={country} />
      );
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Unexpected process state");
  }
};

export default setContent;
