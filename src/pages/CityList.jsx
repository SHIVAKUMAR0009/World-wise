import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import Message from "./Message";
import CityItem from "./CityItem";
import { useCity } from "../context/CityContext";
function CityList() {
  const { cities, isLoading } = useCity();
  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message={"nothing here"} />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
