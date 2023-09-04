import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItems from "./CityItem";
import Message from "./Message";
import { useContext } from "react";
import { CitiesContext} from "../CustomHooks/CitiesContext";
// import Message from "./Message";

export default function CityList() {
  const {cities, isLoading} = useContext(CitiesContext);

  if(isLoading) return <Spinner />;
  if(!cities.length) return <Message message={"no date available vijay"}/>
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItems city={city} key={city.id} />
      ))}
    </ul>
  );
}
