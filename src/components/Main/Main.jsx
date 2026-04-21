import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";

function Main({
  weather,
  handleCardClick,
  clothingItems,
  deleteItem,
  temperatureUnit,
}) {
  return (
    <main className="main">
      <WeatherCard weather={weather} />
      <section className="main__cards">
        <p className="main__cards-text">
          Today is {weather.temp[temperatureUnit]} &deg;{temperatureUnit} / you
          may want to wear:
        </p>
        <ul className="main__cards-list">
          {clothingItems
            .filter((item) => {
              return item.weather === weather.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  deleteItem={deleteItem}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
