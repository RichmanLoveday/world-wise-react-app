import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../context/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();
  //console.log(props);
  if (isLoading) return <Spinner />;
  if (cities.length == 0)
    return (
      <Message message="Add your first city by clicking on city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  // console.log(countries);

  return (
    <>
      <ul className={styles.countryList}>
        {countries.map((country) => (
          <CountryItem country={country} key={country.country} />
        ))}
      </ul>
    </>
  );
}

CountryList.propTypes = {
  cities: PropTypes.object, // Assuming city is an object, adjust the type accordingly
  isLoading: PropTypes.bool,
};

export default CountryList;
