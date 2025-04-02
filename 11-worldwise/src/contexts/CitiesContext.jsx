import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from 'react';

import citiesData from './../cities.json';

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload };
    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
      };
    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error('Unknown action type');
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: 'loading' });

      try {
        // const res = await fetch(`${BASE_URL}/cities`);
        // const data = await res.json();
        // dispatch({ type: 'cities/loaded', payload: data });

        dispatch({ type: 'cities/loaded', payload: citiesData.cities });
      } catch (err) {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading cities...',
        });
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: 'loading' });

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: 'city/loaded', payload: data });

        // dispatch({
        //   type: 'city/loaded',
        //   payload: cities.find(city => city.id === Number(id)),
        // });
      } catch (err) {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading city...',
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: 'loading' });
    try {
      // const res = await fetch(`${BASE_URL}/cities`, {
      //   method: 'POST',
      //   body: JSON.stringify(newCity),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      // const data = await res.json();
      // dispatch({ type: 'city/created', payload: data });

      console.log(JSON.parse(JSON.stringify({ ...newCity, id: 1 })));

      const id = Math.floor(1000000000 + Math.random() * 9000000000);
      dispatch({
        type: 'city/created',
        payload: JSON.parse(JSON.stringify({ ...newCity, id: id })),
      });
      console.log(cities);
    } catch (err) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating city...',
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: 'loading' });
    try {
      // await fetch(`${BASE_URL}/cities/${id}`, {
      //   method: 'DELETE',
      // });

      dispatch({ type: 'city/deleted', payload: id });
    } catch (err) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting city...',
      });
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
    throw new Error('CitiesContext was used outside the CitiesProvider');

  return context;
}

export { CitiesProvider, useCities };
