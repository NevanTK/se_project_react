export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
  ).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Error: ${response.status}`);
    }
  });
};

export const parseWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = { F: data.main.temp };
  result.type = getWeatherType(result.temp.F);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

export const getWeatherType = (temp) => {
  if (temp <= 60) {
    return "cold";
  } else if (temp > 60 && temp <= 75) {
    return "warm";
  } else {
    return "hot";
  }
};
