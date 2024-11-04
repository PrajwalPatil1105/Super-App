import React, { useEffect, useState } from "react";
import styles from "./Page2.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudSun,
  faTemperatureThreeQuarters,
  faWind,
  faDroplet,
  faSpinner,
  faCaretUp,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function page2() {
  const navigate = useNavigate();

  const location = useLocation();
  const formData = location.state?.formData;
  const interest = location.state?.interest;

  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [Update, setUpdate] = useState();

  let Today = new Date();
  let currentDate = Today.toLocaleDateString("en-DM").replace(/\//g, "-");

  setInterval(() => {
    setUpdate(new Date().getMinutes());
  }, 1000);

  useEffect(() => {
    setDate(currentDate);
    setTime(
      Today.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).toUpperCase()
    );
  }, [Update]);

  const [Weatherdata, setWeatherdata] = useState({});
  const [Error, setError] = useState();

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  navigator.geolocation.getCurrentPosition((position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  });

  useEffect(() => {
    if (latitude && longitude) {
      weather();
    }
  }, [latitude, longitude]);

  async function weather() {
    try {
      let weatherData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ec2de9d2036518d2994175c0314c81bc`
      );

      let CurrentData = await weatherData.json();
      setWeatherdata(CurrentData);
    } catch (error) {
      setError(
        "Please wait, we’re fetching the weather data of your location. Make sure to allow device location access to get the latest weather information."
      );
      setWeatherdata(null);
    }
  }

  const [hour, setHour] = useState(
    () => JSON.parse(localStorage.getItem("hour")) || 0
  );
  const [minute, setMinute] = useState(
    () => JSON.parse(localStorage.getItem("minute")) || 0
  );
  const [seconds, setSeconds] = useState(
    () => JSON.parse(localStorage.getItem("seconds")) || 10
  );
  const formattedhour = String(hour).padStart(2, "0");
  const formattedminute = String(minute).padStart(2, "0");
  const formattedseconds = String(seconds).padStart(2, "0");

  const [totalSec, setTotalSec] = useState();
  const [part, setPart] = useState(360);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const audio1 = new Audio("/images/alarm1.mp3");

  if (hour >= 25 || hour < 0) setHour(0);
  if (minute >= 61 || minute < 0) setMinute(0);
  if (seconds >= 61 || seconds < 0) setSeconds(0);

  useEffect(() => {
    setTotalSec(Math.floor(360 / (3600 * hour + 60 * minute + seconds)));
    localStorage.setItem("hour", JSON.stringify(hour));
    localStorage.setItem("minute", JSON.stringify(minute));
    localStorage.setItem("seconds", JSON.stringify(seconds));
  }, [hour, minute, seconds]);

  function Start() {
    const id = setInterval(() => {
      setPart((prepart) => prepart - totalSec);
      setSeconds((prevSec) => {
        if (prevSec === 1 && minute === 0 && hour === 0) {
          audio1.play();
        }
        if (prevSec === 0 && minute === 0 && hour === 0) {
          clearInterval(id);
          alert("Times Up  !!!");
          setIsRunning(false);
          return 10;
        }
        if (prevSec > 0) {
          return prevSec - 1;
        } else {
          setMinute((prevMin) => {
            if (prevMin > 0) {
              return prevMin - 1;
            } else {
              setHour((prevHour) => (prevHour > 0 ? prevHour - 1 : 0));
              return 59;
            }
          });
          return 59;
        }
      });
    }, 1000);
    setIntervalId(id);
    setIsRunning(true);
    setPart(360);
  }

  const Stop = () => {
    clearInterval(intervalId);
    setIsRunning(false);
  };

  // -----------------------------------------     News   ------------------------------
  const [Newsdata, setNewsdata] = useState();
  const [NewsNumber, setNewsNumber] = useState(Math.floor(Math.random() * 100));

  async function News() {
    try {
      let NewsData = await fetch(
        `https://saurav.tech/NewsAPI/everything/cnn.json`
      );
      let CurrentNewsData = await NewsData.json();
      setNewsdata(CurrentNewsData);
    } catch (error) {
      setError(
        "Please wait, we’re fetching the weather data of your location. Make sure to allow device location access to get the latest weather information."
      );
      setNewsdata(null);
    }
  }

  useEffect(() => {
    News();
    const interval = setInterval(() => {
      setNewsNumber(Math.floor(Math.random() * 99));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // --------------------------------Note---------------------------------------

  const [Note, setNote] = useState(() => localStorage.getItem("note") || "");
  useEffect(() => {
    localStorage.setItem("note", Note);
  }, [Note]);

  function Browse() {
    navigate("/page3", { state: { interest, formData } });
  }

  return (
    <div className={styles.main}>
      <div className={styles.leftmain}>
        <div className={styles.data}>
          <img
            className={styles.profilepic}
            src="/images/carton.png"
            alt="Profile Picture"
          />
          <h1 className={styles.username}>{formData.UserName}</h1>
          <h2 className={styles.name}>{formData.Name}</h2>
          <h2 className={styles.gmail}>{formData.Email}</h2>

          <div className={styles.choiceitems}>
            {interest.map((item, index) => (
              <span className={styles.choice} key={index}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.note}>
          <h1 className={styles.noteheading}>Notes</h1>
          <textarea
            type="text"
            value={Note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Type Here..."
            className={styles.noteinput}
          />
        </div>
        {/* -------------------------------------  Weather  ------------------------------------------- */}
        <div className={styles.weather}>
          <div className={styles.date}>
            <span className={styles.currentDate}>{date}</span>
            <span className={styles.currentTimer}>{time}</span>
          </div>

          <div className={styles.liveWeather}>
            {Weatherdata ? (
              <>
                <div className={styles.WeatherSection1}>
                  <div className={styles.cloud}>
                    <span className={styles.cloudIcon}>
                      <FontAwesomeIcon
                        icon={faCloudSun}
                        size="2xl"
                        style={{ color: "#ffffff" }}
                      />
                    </span>
                    <span className={styles.cloudData}>
                      {Weatherdata?.weather?.[0]?.main ?? "Clear"}
                    </span>
                  </div>
                </div>
                <span className={styles.line}>|</span>
                <div className={styles.WeatherSection2}>
                  <p className={styles.deg}>
                    {Weatherdata?.main?.temp
                      ? String(Math.round(Weatherdata.main.temp)).slice(0, 2)
                      : "28"}
                    &deg;C
                  </p>

                  <div className={styles.pressure}>
                    <span className={styles.pressureIcon}>
                      <FontAwesomeIcon
                        icon={faTemperatureThreeQuarters}
                        size="xl"
                        style={{ color: "#ffffff" }}
                      />
                    </span>
                    <span className={styles.pressureData}>
                      {" "}
                      {Weatherdata?.main?.pressure ?? "1009"} mbar Pressure
                    </span>
                  </div>
                </div>
                <span className={styles.line2}>|</span>
                <div className={styles.WeatherSection3}>
                  <div className={styles.wind}>
                    <span className={styles.windIcon}>
                      <FontAwesomeIcon
                        icon={faWind}
                        size="xl"
                        style={{ color: "#ffffff" }}
                      />
                    </span>
                    <span className={styles.windData}>
                      {" "}
                      {Weatherdata?.wind?.speed ?? "3.5"} km/h Wind
                    </span>
                  </div>
                  <div className={styles.humidity}>
                    <span className={styles.humidityIcon}>
                      <FontAwesomeIcon
                        icon={faDroplet}
                        size="xl"
                        style={{ color: "#ffffff" }}
                      />
                    </span>
                    <span className={styles.humidityData}>
                      {" "}
                      {Weatherdata?.main?.humidity ?? "89"}% Humidiy
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <span className={styles.errorIcon}>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spinPulse
                    size="xl"
                    style={{ color: "white" }}
                  />
                </span>
                <h3 className={styles.error}>{Error}</h3>
              </>
            )}
          </div>
        </div>
        {/* --------------------------------------  Timer  ------------------------------------------------ */}
        <div className={styles.Timer}>
          <div className={styles.WatchDisplay}>
            <div className={styles.WatchCircle}>
              <div
                className={styles.ellipes}
                style={{
                  background: `conic-gradient(
                  rgba(255, 106, 106, 1) ${part}deg,
                  rgba(25, 30, 57, 1) 0deg
                  )`,
                }}
              >
                <div className={styles.ellipesData}>
                  <h1 className={styles.hour}>{formattedhour}</h1>

                  <h1 className={styles.minute}>{formattedminute}</h1>

                  <h1 className={styles.seconds}>{formattedseconds}</h1>
                </div>
                <span className={styles.dot1}>:</span>
                <span className={styles.dot2}>:</span>
              </div>
            </div>
          </div>
          <div className={styles.WatchControl}>
            <div>
              <span className={styles.title}>Hours Minutes Seconds</span>
            </div>
            <div>
              <span className={styles.Button}>
                <button
                  className={styles.UpDown}
                  onClick={() => setHour((prevHour) => prevHour + 1)}
                >
                  <FontAwesomeIcon icon={faCaretUp} />
                </button>{" "}
                <button
                  className={styles.UpDown}
                  onClick={() => setMinute((prevmin) => prevmin + 1)}
                >
                  <FontAwesomeIcon icon={faCaretUp} />
                </button>{" "}
                <button
                  className={styles.UpDown}
                  onClick={() => setSeconds((prevsec) => prevsec + 1)}
                >
                  <FontAwesomeIcon icon={faCaretUp} />
                </button>
              </span>
            </div>

            <div>
              <span className={styles.timeinput}>
                <input
                  className={styles.setTime}
                  value={formattedhour}
                  disabled
                  onChange={(e) => setHour(e.target.value)}
                  type="text"
                />{" "}
                <span className={styles.dots2}>:</span>{" "}
                <input
                  className={styles.setTime}
                  value={formattedminute}
                  disabled
                  onChange={(e) => setMinute(e.target.value)}
                  type="text"
                />{" "}
                <span className={styles.dots2}>:</span>{" "}
                <input
                  className={styles.setTime}
                  value={formattedseconds}
                  disabled
                  onChange={(e) => setSeconds(e.target.value)}
                  type="text"
                />
              </span>
            </div>
            <div className={styles.Button}>
              <span className={styles.increaseButton}>
                <button
                  className={styles.UpDown}
                  onClick={() => setHour((prevHour) => prevHour - 1)}
                >
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>{" "}
                <button
                  className={styles.UpDown}
                  onClick={() => setMinute((prevmin) => prevmin - 1)}
                >
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>{" "}
                <button
                  className={styles.UpDown}
                  onClick={() => setSeconds((prevsec) => prevsec - 1)}
                >
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
              </span>
              <button
                className={styles.start}
                onClick={isRunning ? Stop : Start}
              >
                {" "}
                {isRunning ? "STOP" : "START"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------------------------  News  --------------------------------------------------- */}
      <div className={styles.rightmain}>
        {Newsdata ? (
          <>
            <div className={styles.News}>
              <div className={styles.NewsImg}>
                <img
                  className={styles.Image}
                  src={
                    Newsdata?.articles[NewsNumber].urlToImage ||
                    "/src/images/News.png"
                  }
                  alt=""
                />
              </div>
              <div className={styles.NewsTitle}>
                <h1 className={styles.Title}>
                  {Newsdata?.articles[NewsNumber]?.title ?? "Fetching Data"}
                </h1>
              </div>
              <div className={styles.NewsDesc}>
                <h1 className={styles.Description}>
                  {Newsdata?.articles[NewsNumber].description ??
                    "Fetching Data"}
                </h1>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.News}>
              <div className={styles.ErrorImg}>
                <img
                  className={styles.Image}
                  src="/src/images/News.png"
                  alt=""
                />
              </div>
              <div className={styles.ErrorTitle}>
                <h1 className={styles.Title}></h1>
              </div>
              <div className={styles.ErrorDesc}>
                <FontAwesomeIcon
                  icon={faSpinner}
                  spinPulse
                  size="xl"
                  style={{ color: "black" }}
                />{" "}
                Just a moment, we're bringing you the latest headlines!
              </div>
            </div>
          </>
        )}
      </div>
      <button className={styles.Browse} onClick={Browse}>
        Browse
      </button>
    </div>
  );
}
