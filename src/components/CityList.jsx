import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import Message from "./Message";
import { useCities } from "../context/CitiesContext";

function CityList() {
  const { cities, isLoading } = useCities();

  console.log(isLoading);
  console.log(cities);
  //console.log(props);
  if (isLoading) return <Spinner />;
  if (cities.length == 0)
    return (
      <Message message="Add your first city by clicking on city on the map" />
    );
  return (
    <>
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <CityItem city={city} key={city.id} />
        ))}
      </ul>
    </>
  );
}

CityList.propTypes = {
  cities: PropTypes.array, // Assuming city is an object, adjust the type accordingly
  isLoading: PropTypes.bool,
};

export default CityList;
