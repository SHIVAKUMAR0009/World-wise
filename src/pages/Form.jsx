// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import styles from "./Form.module.css";
import Button from "./Button";
// import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrldata } from "../hooks/useUrldata";
import Message from "./Message";
import Spinner from "./Spinner";
// import { func } from "prop-types";
import { useNavigate } from "react-router-dom";
import { useCity } from "../context/CityContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const base_url = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const { lat, lng } = useUrldata();
  const { updateCity, isLoading } = useCity();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingformdata, setisLoadingformdata] = useState();
  const [emoji, setemoji] = useState();
  const [wronginput, setwronginput] = useState();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchformdata() {
        try {
          setisLoadingformdata(true);

          const res = await fetch(
            `${base_url}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          // console.log(data);
          if (!data.countryCode) throw new Error("click somewhere else");
          setCityName(data.city || data.locality || " ");
          setCountry(data.countryName);
          setemoji(convertToEmoji(data.countryCode));
        } catch (error) {
          setwronginput(error.message);
        } finally {
          setisLoadingformdata(false);
        }
      }
      setwronginput("");
      fetchformdata();
    },
    [lat, lng]
  );

  async function submithandler(e) {
    e.preventDefault();
    if (!cityName || !date) return;

    const newcity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    console.log(newcity);
    await updateCity(newcity);
    navigate("/app/cities/");
  }

  if (isLoadingformdata) return <Spinner />;
  if (!lat && !lng)
    return <Message message={"start by clicking somewhere on the map"} />;

  if (wronginput) return <Message message={wronginput} />;
  return (
    <form
      className={`${styles.form}  ${isLoading ? styles.isLoading : ""}`}
      onSubmit={(e) => submithandler(e)}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
