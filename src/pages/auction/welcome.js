import React from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../../main.css";
import partner_1 from "../../assets/img/partner_1.png";
import partner_2 from "../../assets/img/promoters.png";
import welcome_image from "../../assets/img/welcome_image.png";
import { Button1 } from "../../components/theme";
import Header from "../../components/header";
export default function WelcomePage(props) {
  return (
    <div className="App-height">
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
      </div>
    </div>
  );
}
