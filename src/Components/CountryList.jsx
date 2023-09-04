import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useContext } from "react";
import { CitiesContext } from "../CustomHooks/CitiesContext";


export default function CountryList() {
    const {cities, isLoading} = useContext(CitiesContext)

  if(isLoading) return <Spinner />;
  if(!cities.length) return <Message message={"no date available vijay"}/>

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
