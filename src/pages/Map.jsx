import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCity } from "../context/CityContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrldata } from "../hooks/useUrldata";

function Map() {
  const { cities } = useCity();
  const {
    isLoading: geolocationLoading,
    position: geoposition,
    getPosition,
  } = useGeolocation();

  const [pos, setpos] = useState([40, 0]);
  const { maplat, maplng } = useUrldata();

  useEffect(
    function () {
      if (maplat && maplng) setpos([maplat, maplng]);
    },
    [maplat, maplng]
  );

  useEffect(
    function () {
      if (geoposition) setpos([geoposition.lat, geoposition.lng]);
    },
    [geoposition]
  );
  return (
    <div className={styles.mapContainer}>
      {!geoposition && (
        <Button type="position" onClick={getPosition}>
          {geolocationLoading ? "Loading" : "use ur positon"}
        </Button>
      )}
      <MapContainer
        center={pos}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter pos={pos} />
        <Detectpos />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ pos }) {
  const map = useMap();
  map.setView(pos);
  return null;
}
function Detectpos() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      // console.log(e.latlng.lng);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
