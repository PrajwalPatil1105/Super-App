import React, { useEffect, useState } from "react";
import styles from "./Page3.module.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { faLink } from "@fortawesome/free-solid-svg-icons";

export default function Page3() {
  const [Action, setAction] = useState();
  const [Horror, setHorror] = useState();
  const [Fiction, setFiction] = useState();
  const [Music, setMusic] = useState();
  const [Thriller, setThriller] = useState();
  const [Drama, setDrama] = useState();
  const [Fantasy, setFantasy] = useState();
  const [Western, setWestern] = useState();
  const [Romance, setRomance] = useState();

  const location = useLocation();
  const interest = location.state?.interest;
  const formdata = location.state?.formData;

  async function Actioncall() {
    let Actiondata = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_MOVIEAPI
      }&with_genres=28`
    );
    let ActionMainData = await Actiondata.json();
    setAction(ActionMainData);
  }

  // -----------------------------
  async function Horrorcall() {
    let Horrordata = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=a3b0e4f9d48f8c9e71f2e1c71c7b699&with_genres=27`
    );

    let HorrorMainData = await Horrordata.json();
    setHorror(HorrorMainData);
  }

  // ------------------------
  async function Fictioncall() {
    let Fictiondata = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=a3b0e4f9d48f8c9e71f2e1c71c7b699&with_genres=878`
    );

    let FictionMainData = await Fictiondata.json();
    setFiction(FictionMainData);
  }
  // --------------------------
  async function Musiccall() {
    let Musicdata = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=a3b0e4f9d48f8c9e71f2e1c71c7b699&with_genres=10402`
    );
    let MusicMainData = await Musicdata.json();
    setMusic(MusicMainData);
  }
  // --------------------------

  async function Thrillercall() {
    let Thrillerdata = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=a3b0e4f9d48f8c9e71f2e1c71c7b699&with_genres=53`
    );
    let ThrillerMainData = await Thrillerdata.json();
    setThriller(ThrillerMainData);
  }

  // ------------------------
  async function Dramacall() {
    let Dramadata = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=a3b0e4f9d48f8c9e71f2e1c71c7b699&with_genres=10752`
    );
    let DramaMainData = await Dramadata.json();
    setDrama(DramaMainData);
  }

  // ------------------------
  async function Fantasycall() {
    let Fantasydata = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=a3b0e4f9d48f8c9e71f2e1c71c7b699&with_genres=14`
    );
    let FantasyMainData = await Fantasydata.json();
    setFantasy(FantasyMainData);
  }

  // ------------------------

  async function Westerncall() {
    let Westerndata = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=a3b0e4f9d48f8c9e71f2e1c71c7b699&with_genres=37`
    );
    let WesternMainData = await Westerndata.json();
    setWestern(WesternMainData);
  }
  // ------------------------
  async function Romancecall() {
    let Romancedata = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=a3b0e4f9d48f8c9e71f2e1c71c7b699&with_genres=80`
    );
    let RomanceMainData = await Romancedata.json();
    setRomance(RomanceMainData);
  }

  useEffect(() => {
    if (interest.includes("Action")) {
      Actioncall();
    }
    if (interest.includes("Horror")) {
      Horrorcall();
    }
    if (interest.includes("Fiction")) {
      Fictioncall();
    }
    if (interest.includes("Music")) {
      Musiccall();
    }
    if (interest.includes("Thriller")) {
      Thrillercall();
    }
    if (interest.includes("Drama")) {
      Dramacall();
    }
    if (interest.includes("Fantasy")) {
      Fantasycall();
    }
    if (interest.includes("Western")) {
      Westerncall();
    }
    if (interest.includes("Romance")) {
      Romancecall();
    }
  }, [interest]);

  return (
    <div className={styles.main}>
      <div className={styles.Data}>
        <h1 className={styles.heading}>Super app</h1>
        <button className={styles.Profilebtn}>
          <img
            title={formdata.UserName}
            className={styles.ProfilePic}
            src="/images/profile2.png"
            alt=""
          />
        </button>
        <span className={styles.username}>{formdata.Name}</span>
      </div>
      {/* --------------------------- */}
      <div className={styles.cards}>
        <p className={styles.s1}>Entertainment according to your choice</p>
        <div className={styles.section}>
          {Action ? (
            <>
              <h1 className={styles.cardheading}>
                {Action.results ? "Action" : "Loading Action Movies"}
              </h1>
              {Action?.results?.slice(0, 4).map((item, index) => (
                <div key={index} className={styles.subcards}>
                  <a
                    href={`https://www.themoviedb.org/movie`}
                    target="_blank"
                    rel=""
                  >
                    <img
                      className={styles.movieimg}
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt="Movie Poster"
                    />
                  </a>
                  <h1 className={styles.moivename}>{item.original_title}</h1>
                </div>
              ))}
            </>
          ) : (
            <p></p>
          )}
        </div>

        {/* ---------------------------- */}
        <div className={styles.section}>
          {Horror ? (
            <>
              <h1 className={styles.cardheading}>
                {Horror.results ? "Horror" : "Loading Horror Movies"}
              </h1>
              {Horror?.results?.slice(5, 9).map((item, index) => (
                <div key={index} className={styles.subcards}>
                  <a
                    href={`https://www.themoviedb.org/movie`}
                    target="_blank"
                    rel=""
                  >
                    <img
                      className={styles.movieimg}
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt="Movie Poster"
                    />
                  </a>
                  <h1 className={styles.moivename}>{item.original_title}</h1>
                </div>
              ))}
            </>
          ) : (
            <p></p>
          )}
        </div>

        {/* ------------------------------- */}
        <div className={styles.section}>
          {Fiction ? (
            <>
              <h1 className={styles.cardheading}>
                {Fiction.results ? "Fiction" : "Loading Fiction Movies"}
              </h1>
              {Fiction?.results?.slice(11, 15).map((item, index) => (
                <div key={index} className={styles.subcards}>
                  <a
                    href={`https://www.themoviedb.org/movie`}
                    target="_blank"
                    rel=""
                  >
                    <img
                      className={styles.movieimg}
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt="Movie Poster"
                    />
                  </a>
                  <h1 className={styles.moivename}>{item.original_title}</h1>
                </div>
              ))}
            </>
          ) : (
            <p></p>
          )}
        </div>

        {/* ---------------------------------------- */}
        <div className={styles.section}>
          {Music ? (
            <>
              <h1 className={styles.cardheading}>
                {Music.results ? "Music" : "Loading Music Movies"}
              </h1>
              {Music?.results?.slice(0, 4).map((item, index) => (
                <div key={index} className={styles.subcards}>
                  <a
                    href={`https://www.themoviedb.org/movie`}
                    target="_blank"
                    rel=""
                  >
                    <img
                      className={styles.movieimg}
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt="Movie Poster"
                    />
                  </a>
                  <h1 className={styles.moivename}>{item.original_title}</h1>
                </div>
              ))}
            </>
          ) : (
            <p></p>
          )}
        </div>

        {/* -------------------------------------------------- */}
        <div className={styles.section}>
          {Thriller ? (
            <>
              <h1 className={styles.cardheading}>
                {Thriller.results ? "Thriller" : "Loading Thriller Movies"}
              </h1>
              {Thriller?.results?.slice(10, 14).map((item, index) => (
                <div key={index} className={styles.subcards}>
                  <a
                    href={`https://www.themoviedb.org/movie`}
                    target="_blank"
                    rel=""
                  >
                    <img
                      className={styles.movieimg}
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt="Movie Poster"
                    />
                  </a>
                  <h1 className={styles.moivename}>{item.original_title}</h1>
                </div>
              ))}
            </>
          ) : (
            <p></p>
          )}
        </div>
        {/* ----------------------------------- */}

        <div className={styles.section}>
          {Drama ? (
            <>
              <h1 className={styles.cardheading}>
                {Drama.results ? "Drama" : "Loading Drama Movies"}
              </h1>
              {Drama?.results?.slice(0, 4).map((item, index) => (
                <div key={index} className={styles.subcards}>
                  <a
                    href={`https://www.themoviedb.org/movie`}
                    target="_blank"
                    rel=""
                  >
                    <img
                      className={styles.movieimg}
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt="Movie Poster"
                    />
                  </a>
                  <h1 className={styles.moivename}>{item.original_title}</h1>
                </div>
              ))}
            </>
          ) : (
            <p></p>
          )}
        </div>
        {/* ----------------------------------------------- */}
        <div className={styles.section}>
          {Fantasy ? (
            <>
              <h1 className={styles.cardheading}>
                {Fantasy.results ? "Fantasy" : "Loading Fantasy Movies"}
              </h1>
              {Fantasy?.results?.slice(0, 4).map((item, index) => (
                <div key={index} className={styles.subcards}>
                  <a
                    href={`https://www.themoviedb.org/movie`}
                    target="_blank"
                    rel=""
                  >
                    <img
                      className={styles.movieimg}
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt="Movie Poster"
                    />
                  </a>
                  <h1 className={styles.moivename}>{item.original_title}</h1>
                </div>
              ))}
            </>
          ) : (
            <p></p>
          )}
        </div>
        {/* ---------------------------------------------------- */}
        <div className={styles.section}>
          {Western ? (
            <>
              <h1 className={styles.cardheading}>
                {Western.results ? "Western" : "Loading Western Movies"}
              </h1>
              {Western?.results?.slice(0, 4).map((item, index) => (
                <div key={index} className={styles.subcards}>
                  <a
                    href={`https://www.themoviedb.org/movie`}
                    target="_blank"
                    rel=""
                  >
                    <img
                      className={styles.movieimg}
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt="Movie Poster"
                    />
                  </a>
                  <h1 className={styles.moivename}>{item.original_title}</h1>
                </div>
              ))}
            </>
          ) : (
            <p></p>
          )}
        </div>
        {/* --------------------------------------------------------- */}
        <div className={styles.section}>
          {Romance ? (
            <>
              <h1 className={styles.cardheading}>
                {Romance.results ? "Romance" : "Loading Romance Movies"}
              </h1>
              {Romance?.results?.slice(6, 10).map((item, index) => (
                <div key={index} className={styles.subcards}>
                  <a
                    href={`https://www.themoviedb.org/movie`}
                    target="_blank"
                    rel=""
                  >
                    <img
                      className={styles.movieimg}
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt="Movie Poster"
                    />
                  </a>
                  <h1 className={styles.moivename}>{item.original_title}</h1>
                </div>
              ))}
            </>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
}
