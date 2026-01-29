import "./WeatherCard.css";
import { weatherTypes, defaultWeatherTypes } from "../../utils/constants";

function WeatherCard({ weather }) {
  const filteredTypes = weatherTypes.filter((type) => {
    return type.day === weather.isDay && type.condition === weather.condition;
  });

  let weatherType;
  if (filteredTypes.length === 0) {
    weatherType = defaultWeatherTypes[weather.isDay ? "day" : "night"];
  } else {
    weatherType = filteredTypes[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weather.temp.F} &deg;F</p>
      <img
        src={weatherType?.url}
        alt={`Card showing ${weatherType?.day ? "day" : "night"} time ${weatherType?.condition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
