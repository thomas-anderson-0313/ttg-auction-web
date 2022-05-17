import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import slice from "../../redux_model/reducer";
import { NotificationManager } from "react-notifications";

import Calendar from "react-calendar";
import "./Calendar.css";

import { Underline } from "../../components/theme";
import { Button1 } from "../../components/theme";
import faq_icon from "../../assets/img/faq.png";
import NoServiceIcon from "../../assets/img/noService 1.png";

import Header from "../../components/header";

import "../../main.css";

const CalendarPage = () => {
  const dispatch = useDispatch();
  const update = (json) => dispatch(slice.actions.update(json));

  const [selected, setSelected] = useState(false);

  const [date, setDate] = useState("");
  const [services, setServices] = useState([]);
  const [theServices, setTheServices] = useState([]);
  const [showServices, setShowServices] = useState([]);
  const [showCurrentTime, setShowCurrentTime] = useState("");

  useEffect(() => {
    setInterval(() => {
      const currentDate = new Date();
      const currentTime =
        currentDate.getFullYear() +
        "-" +
        currentDate.getMonth() +
        1 +
        "-" +
        currentDate.getDate() +
        " " +
        currentDate.getHours() +
        ":" +
        currentDate.getMinutes() +
        ":" +
        currentDate.getSeconds();
      setShowCurrentTime(currentTime);
    }, 1000);
    axios
      .get(process.env.REACT_APP_PROXY + `/services/`)
      .then(({ data }) => {
        setServices(data);
      })
      .catch((error) => {
        console.log(error);
      });

    if (!window.localStorage.getItem("network")) {
      window.preventBackButton = function () {
        try {
          if (
            document &&
            (!document.cookie || document.cookie.indexOf("_tc=1") < 0)
          ) {
            window.document.body.style.display = "none";
            window.location = "/networks";
          }
        } catch (e) {}
      };
      window.preventBackButton();
    }
  }, []);

  const selectDate = (val) => {
    setSelected(false);
    setTheServices([]);
    const seletedDate = val.toDateString();
    setDate(seletedDate);
    const dateForNotification = new Date(
      val.setDate(val.getDate() - 1)
    ).toDateString();
    update({
      dateForService: seletedDate,
      dateForNotification: dateForNotification,
    });
    for (let i = 0; i < services.length; i++) {
      let theService = services[i];
      if (window.localStorage.getItem("network") === theService.network) {
        for (let i = 0; i < theService.dates.length; i++) {
          let dsfsdf = new Date(theService.dates[i]).toDateString();
          if (seletedDate === dsfsdf) {
            theServices.push(theService);
          }
        }
      }
    }
    if (theServices.length === 1) {
      setSelected(true);
      update({ selectedServiceId: theServices[0]._id });
    }
    if (theServices.length === 0) {
      NotificationManager.warning(
        "All services Sold Out. Please try another date.",
        "Alert",
        1500
      );
    }
    setShowServices(theServices);
  };

  const selectService = (i) => {
    setSelected(true);
    update({ selectedServiceId: i._id });
  };
  return (
    <div className="App App-height1" style={{ color: "white" }}>
      <Header />
      <div className="select_date">
        <div className="select_date_title">Select Date</div>
        <Underline />
        <div className="select_date_calendar">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={12} lg={5} className="calendar_left">
              <center>
                <Calendar
                  onChange={selectDate}
                  //   value={date}
                  tileClassName={({ date }) => {
                    for (let i = 0; i < services.length; i++) {
                      for (let j = 0; j < services[i].dates.length; j++) {
                        if (
                          new Date().getTime() + 172800000 < date.getTime() &&
                          services[i].network ===
                            window.localStorage.getItem("network") &&
                          new Date(services[i].dates[j]).toDateString() ===
                            new Date(date).toDateString()
                        )
                          return "availableDate"; // your class name
                      }
                    }
                  }}
                  minDate={
                    new Date(new Date().setDate(new Date().getDate() + 2))
                  }
                />
                <p
                  className="text-center"
                  style={{
                    color: "rgba(255, 255, 255, 0.2)",
                    fontSize: "20px",
                  }}
                >
                  {showCurrentTime}
                </p>
              </center>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={7}>
              <div className="time_slot">
                <div className="time_slot_title">
                  <div style={{ fontSize: "30px", fontWeight: "bold" }}>
                    Available Services
                  </div>
                  <div className="time_slot_title_date">
                    <span style={{ color: "#003C97" }}>{date}</span>
                  </div>
                </div>
                <div>
                  <Grid container style={{ width: "80%" }}>
                    {showServices.length === 0 ? (
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <center>
                          <img
                            src={NoServiceIcon}
                            alt="NoServiceIcon"
                            width="200px"
                          />
                          <div style={{ color: "grey", fontSize: "20px" }}>
                            All services Sold Out. Please try another date.
                          </div>
                        </center>
                      </Grid>
                    ) : (
                      showServices.map((item, key) => {
                        return (
                          <Grid key={key} item xs={12} sm={6} md={6} lg={4}>
                            <Button1
                              btnContent={
                                item.name.length > 10
                                  ? item.name.slice(0, 8) + "..."
                                  : item.name
                              }
                              btn1Class="theme_button_1_focus"
                              handleEvent={() => selectService(item)}
                            />
                          </Grid>
                        );
                      })
                    )}
                  </Grid>
                </div>
              </div>
              {showServices.length !== 0 ? (
                !selected && showServices.length !== 1 ? (
                  <div
                    style={{
                      color: "grey",
                      fontSize: "35px",
                      textAlign: "center",
                      padding: "25px",
                      fontFamily: "Brush Script MT",
                    }}
                  >
                    Please select service you want !
                  </div>
                ) : null
              ) : null}
            </Grid>
          </Grid>
        </div>
        <div className="next">
          <Link to="/bid">
            <Button1
              btnContent="Next"
              btn1Class={
                selected
                  ? "next_button calendar_next_button"
                  : "next_button next_button_disabled"
              }
              disabled={selected ? false : true}
            />
          </Link>
        </div>
      </div>

      <div style={{ cursor: "pointer", marginTop: "-40px" }}>
        <Link to="/faq" style={{ textDecoration: "none" }}>
          <img src={faq_icon} alt="faq_icon" className="faq_icon" />
          <span className="faq_text">FAQ</span>
        </Link>
      </div>
    </div>
  );
};

export default CalendarPage;
