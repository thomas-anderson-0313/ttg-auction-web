import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import Modal from "react-modal";

import "../../main.css";

import service_image from "../../assets/img/service_image.png";
import { Button1 } from "../../components/theme";
import { Button2 } from "../../components/theme";

import Header from "../../components/header";

export default function ServicePage() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [select, setSelect] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "#020724",
      width: "30%",
      border: "none",
      borderRadius: "10px",
    },
  };

  const handleModal = () => {
    setModalVisible(!isModalVisible);
    setSelect(false);
  };
  const handleSelect = () => {
    setSelect(!select);
  };
  return (
    <div className="App App-height1">
      <Header />
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={5}>
          <div className="welcome_reveal">
            <img
              className="service_image"
              src={service_image}
              alt="welcome_image"
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={7}>
          <div className="service">
            <div className="service-title-1">Which Service</div>
            <div className="service-title-2">Are you interested in ?</div>
            <div className="services">
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Button1
                    btnContent="Crypto.com"
                    btn1Class="theme_button_1"
                    className="option_A"
                    handleEvent={handleModal}
                  />
                  <br />
                </Grid>
                <Modal
                  isOpen={isModalVisible}
                  // onAfterOpen={afterOpenModal}
                  onRequestClose={handleModal}
                  style={customStyles}
                  ariaHideApp={false}
                  contentLabel="COMING SOON"
                >
                  <div style={{ textAlign: "center", padding: "20px" }}>
                    <div
                      style={{
                        textAlign: "end",
                        color: "white",
                        width: "3%",
                        marginLeft: "97%",
                        cursor: "pointer",
                      }}
                      onClick={handleModal}
                    >
                      {" "}
                      X{" "}
                    </div>
                    <h1 style={{ color: "grey" }}>COMING SOON</h1>
                    <div style={{ color: "#ddd", fontSize: "20px" }}>
                      Currently Unavailable.
                      <br />
                      To order this service, please contact @RomulusTTG via
                      Telegram.
                    </div>
                  </div>
                </Modal>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Button1
                    btnContent="CoinMarketCap"
                    btn1Class="theme_button_1"
                    className="option_B"
                    handleEvent={handleModal}
                  />
                  <br />
                </Grid>
                <Modal
                  isOpen={isModalVisible}
                  // onAfterOpen={afterOpenModal}
                  onRequestClose={handleModal}
                  style={customStyles}
                  ariaHideApp={false}
                  contentLabel="Coming Soon"
                >
                  <div style={{ textAlign: "center", padding: "20px" }}>
                    <div
                      style={{
                        textAlign: "end",
                        color: "white",
                        width: "3%",
                        marginLeft: "97%",
                        cursor: "pointer",
                      }}
                      onClick={handleModal}
                    >
                      {" "}
                      X{" "}
                    </div>
                    <h1 style={{ color: "grey" }}>Coming Soon</h1>
                    <div style={{ color: "#ddd", fontSize: "20px" }}>
                      Currently Unavailable.
                      <br />
                      To order this service, please contact @RomulusTTG via
                      Telegram.
                    </div>
                  </div>
                </Modal>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Button2
                    btnContent={select ? "DexTools 👌" : "DexTools"}
                    btn2Class="theme_button_1"
                    className="option_C"
                    handleEvent={handleSelect}
                  />
                  <br />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Button1
                    btnContent="CoinGecko"
                    btn1Class="theme_button_1"
                    className="option_D"
                    handleEvent={handleModal}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Button1
                    btnContent="PinkSale"
                    btn1Class="theme_button_1"
                    className="option_D"
                    handleEvent={handleModal}
                  />
                </Grid>
                <Modal
                  isOpen={isModalVisible}
                  onRequestClose={handleModal}
                  style={customStyles}
                  ariaHideApp={false}
                  contentLabel="COMING SOON"
                >
                  <div style={{ textAlign: "center", padding: "20px" }}>
                    <div className="service_modal_close" onClick={handleModal}>
                      {" "}
                      X{" "}
                    </div>
                    <h1 style={{ color: "grey" }}>Coming Soon</h1>
                    <div style={{ color: "#ddd", fontSize: "20px" }}>
                      Currently Unavailable.
                      <br />
                      To order this service, please contact @RomulusTTG via
                      Telegram.
                    </div>
                  </div>
                </Modal>
              </Grid>
            </div>
          </div>
          <div className="next">
            {select === false ? (
              <Button1
                btnContent="Next"
                btn1Class="next_button_disabled next_button"
              />
            ) : (
              <Link to="/networks">
                <Button1 btnContent="NEXT" btn1Class="next_button" />
              </Link>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
