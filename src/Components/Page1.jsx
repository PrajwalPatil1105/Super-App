import React, { useEffect, useState } from "react";
import "./Page1.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Page1() {
  const navigate = useNavigate();

  const location = useLocation();
  const formData = location.state?.formData;

  const [interest, setInterest] = useState(() => {
    const savedInterest = localStorage.getItem("interest");
    return savedInterest ? JSON.parse(savedInterest) : [];
  });

  useEffect(() => {
    localStorage.setItem("interest", JSON.stringify(interest));
  }, [interest]);

  function act(e) {
    const { value } = e.currentTarget;

    if (interest.includes(value)) {
      setInterest(interest.filter((item) => item !== value));
    } else {
      setInterest([...interest, value]);
    }
  }

  function remove(value) {
    setInterest(interest.filter((item) => item !== value));
  }

  const [actionB, setActionB] = useState("none");
  const [draB, setAraB] = useState("none");
  const [romB, setRomB] = useState("none");
  const [thrB, setThrB] = useState("none");
  const [wesB, setWesB] = useState("none");
  const [horB, setHorB] = useState("none");
  const [fanB, setFanB] = useState("none");
  const [musB, setMusB] = useState("none");
  const [ficB, setFicB] = useState("none");

  const [warring, setWarrning] = useState();

  useEffect(() => {
    setActionB(interest.includes("Action") ? "4px solid white" : "none");
    setAraB(interest.includes("Drama") ? "4px solid white" : "none");
    setRomB(interest.includes("Romance") ? "4px solid white" : "none");
    setThrB(interest.includes("Thriller") ? "4px solid white" : "none");
    setWesB(interest.includes("Western") ? "4px solid white" : "none");
    setHorB(interest.includes("Horror") ? "4px solid white" : "none");
    setFanB(interest.includes("Fantasy") ? "4px solid white" : "none");
    setMusB(interest.includes("Music") ? "4px solid white" : "none");
    setFicB(interest.includes("Fiction") ? "4px solid white" : "none");

    if (interest.length >= 3) {
      setWarrning("");
    }
  }, [interest]);

  function nextpage() {
    if (interest.length < 3) {
      setWarrning(
        <span>
          <FontAwesomeIcon icon={faTriangleExclamation} fade size="xl" />{" "}
          Minimum 3 categories required
        </span>
      );
    } else {
      navigate("/page2", { state: { formData, interest } });
    }
  }

  return (
    <div className="p1main">
      <div className="lside">
        <h3 className="welcome">Welcome, {formData.Name}</h3>
        <p className="p1heading"> Super app</p>
        <h1 className="p1l1">Choose your entertainment category</h1>

        <div className="choicebtn">
          {interest.map((item, index) => (
            <h1 className="choice" key={index}>
              {item}{" "}
              <button onClick={() => remove(item)} className="choicermv">
                <FontAwesomeIcon icon={faXmark} size="xl" />
              </button>
            </h1>
          ))}
        </div>

        <h2 className="warring">{warring}</h2>
      </div>

      <div className="rside">
        <div className="cards">
          <button
            className="card1"
            value={"Action"}
            onClick={act}
            style={{ border: actionB }}
          >
            <h2 className="cardheading">Action</h2>
            <img className="p1img" src="/images/p1.png" alt="" />
          </button>

          <button
            className="card2"
            onClick={act}
            value={"Drama"}
            style={{ border: draB }}
          >
            <h2 className="cardheading">Drama</h2>
            <img className="p1img" src="/images/p2.png" alt="" />
          </button>

          <button
            className="card3"
            onClick={act}
            value={"Romance"}
            style={{ border: romB }}
          >
            <h2 className="cardheading">Romance</h2>
            <img className="p1img" src="/images/p3.png" alt="" />
          </button>

          <button
            className="card4"
            onClick={act}
            value={"Thriller"}
            style={{ border: thrB }}
          >
            <h2 className="cardheading">Thriller</h2>
            <img className="p1img" src="/images/p4.png" alt="" />
          </button>

          <button
            className="card5"
            onClick={act}
            value={"Western"}
            style={{ border: wesB }}
          >
            <h2 className="cardheading">Western</h2>
            <img className="p1img" src="/images/p5.png" alt="" />
          </button>

          <button
            className="card6"
            onClick={act}
            value={"Horror"}
            style={{ border: horB }}
          >
            <h2 className="cardheading">Horror</h2>
            <img className="p1img" src="/images/p6.png" alt="" />
          </button>

          <button
            className="card7"
            onClick={act}
            value={"Fantasy"}
            style={{ border: fanB }}
          >
            <h2 className="cardheading">Fantasy</h2>
            <img className="p1img" src="/images/p7.png" alt="" />
          </button>

          <button
            className="card8"
            onClick={act}
            value={"Music"}
            style={{ border: musB }}
          >
            <h2 className="cardheading">Music</h2>
            <img className="p1img" src="/images/p8.png" alt="" />
          </button>

          <button
            className="card9"
            onClick={act}
            value={"Fiction"}
            style={{ border: ficB }}
          >
            <h2 className="cardheading">Fiction</h2>
            <img className="p1img" src="/images/p9.png" alt="" />
          </button>
          <button className="nextpage" onClick={nextpage}>
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}
