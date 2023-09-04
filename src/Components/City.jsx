
import { useContext, useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { CitiesContext } from "../CustomHooks/CitiesContext";


import styles from "./City.module.css";
import Button from "./Button";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const {id} = useParams()
  const {getCity, currentCity, isLoading} = useContext(CitiesContext)
  const navigate = useNavigate()

  // const [search, setSearch] = useSearchParams();
  // const lat = search.get("lat");
  // const lng = search.get("lng");

  useEffect(function(){
    getCity(id)
  },[id,getCity])

  if(isLoading) return <Spinner />

  const { cityName, emoji, date, notes, } = currentCity;

  return (

    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button type={"back"} onClickBtn={(e) => {
          e.preventDefault()
          navigate(-1)}}>Back</Button>
      </div>
    </div>
  );
}

export default City;
