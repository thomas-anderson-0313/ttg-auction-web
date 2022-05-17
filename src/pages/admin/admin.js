import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

import { Button2 } from "../../components/theme";
import LoginIcon from "../../assets/img/account.png";
import Email from "../../assets/img/email.png";
import Password from "../../assets/img/key.png";

import "../../main.css";
import partner_1 from "../../assets/img/partner_1.png";
import partner_2 from "../../assets/img/promoters.png";
import welcome_image from "../../assets/img/welcome_image.png";

// import BackgroundParticles from "../../components/particles";
import { Button1 } from "../../components/theme";

import Header from "../../components/header";

export default function AdminLogin() {
  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const [isModalVisible, setModalVisible] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [infor, setInfor] = useState(true);

  useEffect(() => {
    console.log(isModalVisible);
    setModalVisible(true);
  }, [isModalVisible]);

  useEffect(() => {
    if (window.sessionStorage.getItem("loggedin")) {
      window.preventBackButton = function () {
        try {
          if (
            document &&
            (!document.cookie || document.cookie.indexOf("_tc=1") < 0)
          ) {
            window.document.body.style.display = "none";
            window.location = "/admin/dashboard";
          }
        } catch (e) {}
      };
      window.preventBackButton();
    }
  }, []);

  const handleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleLogin = (e) => {
    if (!password || !email) {
      e.preventDefault();
      if (!email) {
        return refEmail.current.focus();
      }
      if (!password) {
        return refPassword.current.focus();
      }
    }
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      e.preventDefault();
      refEmail.current.select();
      return refEmail.current.focus();
    }
    if (password !== "rumman0313)#!#" || email !== "rumman@auction.com") {
      e.preventDefault();
      setInfor(false);
    }

    window.sessionStorage.setItem("loggedin", "0");
  };
  return (
    <>
      <div className="App-height">
        {/* <BackgroundParticles /> */}
        <div className="App">
          <Header />
        </div>
        <div className="App">
          <Grid container>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <div className="welcome" id="flash">
                The Trending Group
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <div className="welcome_reveal">
                <img
                  className="welcome_image"
                  src={welcome_image}
                  alt="welcome_image"
                />
              </div>
            </Grid>
          </Grid>
        </div>

        <div className="partnership">
          <Grid container justifyContent="center" spacing={0}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <div className="partner_text">In Partnership With</div>
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2}>
              <img className="partner_1" src={partner_1} alt="part_1" />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <img className="partner_2" src={partner_2} alt="part_2" />
            </Grid>
          </Grid>
        </div>
        <div style={{ textAlign: "center" }}>
          <Link to="/services" style={{ textDecoration: "none" }}>
            <Button1 btnContent="Next" btn1Class="next_button" />
          </Link>
          {/* <Footer /> */}
        </div>
        <Modal
          isOpen={isModalVisible}
          onRequestClose={handleModal}
          contentLabel="Warning"
          className="modal_style"
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
        >
          <div style={{ textAlign: "center", padding: "50px" }}>
            {/* <div className="bid_modal_close" onClick={handleModal}>
            X{" "}
          </div> */}
            <img
              src={LoginIcon}
              alt="login_icon"
              width="50px"
              className="login_icon"
            />
            <div style={{ marginTop: "20px" }}>
              <span style={{ marginRight: "20px" }}>
                <img src={Email} alt="email" width="20px" />
              </span>
              <input
                ref={refEmail}
                type="text"
                placeholder="Email.."
                className="input_text_style"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <span style={{ marginRight: "20px" }}>
                <img src={Password} alt="password" width="20px" />
              </span>
              <input
                ref={refPassword}
                type="password"
                placeholder="Password.."
                className="input_text_style"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {infor === false ? (
              <div
                style={{
                  color: "yellow",
                  marginTop: "30px",
                  textAlign: "left",
                  marginLeft: "10%",
                }}
              >
                Incorrect email or password. Try again...
              </div>
            ) : null}
            <Link
              to="/admin/dashboard"
              className="router-link"
              aria-disabled={true}
            >
              <Button2
                btnContent="LOGIN"
                btn2Class="theme_button_1_1"
                handleEvent={handleLogin}
              />
            </Link>
          </div>
        </Modal>
      </div>
    </>
  );
}
