import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";

// import BackgroundParticles from "../../components/particles";
import AdminLeftBarProps from "../../components/adminLeftProps";
import WinnerTableRow from "../../components/winnersTableRow";

export default function WinnerRecord() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_PROXY + `/services/`)
      .then(({ data }) => {
        setServices(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const DataTable = () => {
    return services.map((res, i) => {
      let winnerData = { amount: 0 };
      res.bidStatus.map((res1) => {
        const bidderAddress = Object.keys(res1)[0];
        const bidderData = res1[bidderAddress];
        if (bidderData.amount > winnerData.amount) {
          winnerData = bidderData;
          winnerData.address = bidderAddress;
          winnerData.serviceName = res.name;
          winnerData.serviceOption = res.option;
          winnerData.price = res.price;
          winnerData.bidders = res.bidStatus.length;
        }
        return winnerData;
      });
      return winnerData.contactInfor ? (
        <WinnerTableRow obj={winnerData} key={i} />
      ) : null;
    });
  };

  return (
    <div className="winner_record admin_padding">
      {/* <BackgroundParticles /> */}
      <Grid container>
        <Grid item md={1} lg={3}>
          <AdminLeftBarProps id={3} />
        </Grid>
        <Grid item xs={12} sm={12} md={11} lg={9}>
          <div
            style={{ color: "#ffffff", fontSize: "39px", fontWeight: "bold" }}
          >
            WINNER RECORD
          </div>
          <div id="Bid-record" style={{ marginTop: "50px" }}>
            <table
              className="table table-striped css-serial container-out"
              style={{
                width: "100%",
                overflowX: "auto",
                display: "block",
                overflowY: "auto",
                maxHeight: "65vh",
              }}
            >
              <thead>
                <tr>
                  <th style={{ borderRadius: "15px 0 0 15px" }}>ID</th>
                  <th>Service</th>
                  <th>ServiceOption</th>
                  <th>ServiceUrl</th>
                  <th>Reserved Price($)</th>
                  <th>Total Bidder</th>
                  <th>Wallet Address</th>
                  <th>Balance</th>
                  <th>Bid Amount</th>
                  <th>Date(bidded)</th>
                  <th>Date(ordered)</th>
                  <th>Contact Infor</th>
                  <th style={{ borderRadius: "0 15px 15px 0" }}>Status</th>
                </tr>
              </thead>
              <tbody>{DataTable()}</tbody>
            </table>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
