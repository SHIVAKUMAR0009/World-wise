// import { func } from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const initialstate = {
  cities: [],
  isLoading: false,
  currentCity: {},
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
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
  }
}
const CityContext = createContext();
const BASIC_URl = "http://localhost:8000";

function CityData({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialstate
  );

  // const [cities, Setcities] = useState([]);
  // const [isLoading, SetLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchdata() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASIC_URl}/cities`);
        const data = await res.json();
        // Setcities(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: error,
        });
      }
    }
    fetchdata();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) == currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASIC_URl}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: error,
        });
      }
    },
    [currentCity.id]
  );
  async function updateCity(newcity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASIC_URl}/cities`, {
        method: "POST",
        body: JSON.stringify(newcity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);
      // Setcities((cities) => [...cities, data]);
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error,
      });
    }
  }
  async function deletecity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASIC_URl}/cities/${id}`, {
        method: "DELETE",
      });
      // console.log(data);
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error,
      });
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        updateCity,
        deletecity,
        error,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}
function useCity() {
  const city = useContext(CityContext);
  if (city === undefined) throw new Error("used Outside the context");

  return city;
}

export { CityData, useCity };
