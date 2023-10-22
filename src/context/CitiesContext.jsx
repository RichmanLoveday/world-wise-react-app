import { createContext, useEffect, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { useReducer } from "react";

const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  cityError: "",
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  // const [cityError, setCityError] = useState("");

  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity, error } = state;

  // load data on mount
  useEffect(function () {
    async function fetchCities(url) {
      try {
        //  setIsLoading(true);
        dispatch({ type: "loading" });

        const res = await fetch(`${url}/cities`);
        const data = await res.json();
        //  console.log(data);
        // if (!res.ok) throw new Error("Unable to fetch data");

        //  setCities(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    }

    fetchCities(BASE_URL);
  }, []);

  // GET CURRENT CITY
  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      try {
        // setIsLoading(true);
        dispatch({ type: "loading" });

        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error("Unable to fetch data");

        // setCurrentCity(data);
        dispatch({ type: "city/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    },
    [currentCity.id]
  );

  // add data to cities array
  async function createCity(newCity) {
    try {
      // setIsLoading(true);
      // setCityError("");
      dispatch({ type: "loading" });

      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Unable to fetch data");

      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
      // setCities((cities) => [...cities, data]);
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data...",
      });
    }
  }

  // delete city from the api
  async function deleteCity(id) {
    try {
      // setIsLoading(true);
      // setCityError("");
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "cities/deleted", payload: id });
      // setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      alert("There was error deleting city....");
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        error,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities context was used outside the cities provider");
  return context;
}

CitiesProvider.propTypes = {
  children: PropTypes.object.isRequired, // Assuming city is an object, adjust the type accordingly
};

export { CitiesProvider, useCities };
