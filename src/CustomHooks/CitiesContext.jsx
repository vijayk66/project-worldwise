import { createContext, useReducer, useEffect } from "react";

const CitiesContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "Fetching":
      return { ...state, isLoading: true };
    case "citiesLoaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "cityLoaded":
      return { ...state, city: action.payload, isLoading: false };
    case "cityCreated":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
      };
    case "cityDeleted":
      return {
        ...state,
        cities: state.cities.filter((curCity) => curCity.id !== action.payload),
        isLoading: false,
      };
  }
}

function ContextProvider({ children }) {
  const [{ cities, isLoading, city }, dispatch] = useReducer(reducer, {
    cities: [],
    isLoading: false,
    city: [],
  });

  useEffect(function () {
    async function fetchCities() {
      try {
        //   setIsLoading(true);
        dispatch({ type: "Fetching" });
        const res = await fetch("http://localhost:9000/cities");
        const data = await res.json();
        if (!data) throw Error("Cities not avaiable");
        //   setCities(data);
        dispatch({ type: "citiesLoaded", payload: data });
        //   setIsLoading(false);
      } catch (error) {
        alert(error.message);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      dispatch({ type: "Fetching" });
      const res = await fetch(`http://localhost:9000/cities/${id}`);
      const data = await res.json();
      if (!data) throw Error("Cities not avaiable");
      dispatch({ type: "cityLoaded", payload: data });
      //   setCity(data);
      //   setIsLoading(false);
    } catch (error) {
      alert(error.message);
    }
  }

  async function createCity(newCity) {
    try {
      // setIsLoading(true);
      dispatch({ type: "Fetching" });
      const res = await fetch(`http://localhost:9000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data) throw Error("Something went wrong please try again");
      dispatch({ type: "cityCreated", payload: data });
      // setCities((currentCities) => [...currentCities, data]);
      // setIsLoading(false);
    } catch (error) {
      alert(error.message);
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "Fetching" });
      await fetch(`http://localhost:9000/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "cityDeleted", payload: id });
      //   setCities((oldCities) =>
      //     oldCities.filter((curCity) => curCity.id !== id)
      //   );
      //   setIsLoading(false);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities: cities,
        isLoading: isLoading,
        currentCity: city,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// function useCity() {
//     const context = useContext(CitiesContext);
//     if(!context)  throw new Error("You are using context outside its scope")
//     return context;
// }

export { CitiesContext, ContextProvider };
