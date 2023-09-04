import styles from "./Map.module.css";
import { useContext, useEffect, useState } from "react";
import { CitiesContext } from "../CustomHooks/CitiesContext";
import { useNavigate } from "react-router-dom";
import { useGeolocation } from "./UseGeoLocation";
import Button from "./Button";
import { useUrlString } from "../CustomHooks/useUrlString";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";


function Map() {
  const [CurrentPosition, setPosition] = useState([40, 0]);
  const { cities } = useContext(CitiesContext);
  const {
    getPosition,
    position: myPosition,
    isLoading: myLocationLoading,
  } = useGeolocation();
  const [lat, lng] = useUrlString();

  useEffect(
    function () {
      if (lng && lat) setPosition([lat, lng]);
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (myPosition) setPosition([myPosition.lat, myPosition.lng]);
    },
    [myPosition]
  );

  return (
    <div className={styles.mapContainer}>
      <Button type={"position"} onClickBtn={getPosition}>
        {myLocationLoading ? "Loading..." : "Use my location"}
      </Button>
      <MapContainer
        center={CurrentPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangePosition position={CurrentPosition} />
        <HandleClick />
      </MapContainer>
    </div>
  );
}

function ChangePosition({ position }) {
  let map = useMap();
  map.setView(position);
  return null;
}

function HandleClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
