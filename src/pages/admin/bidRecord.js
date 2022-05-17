import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";

// import BackgroundParticles from "../../components/particles";
import AdminLeftBarProps from "../../components/adminLeftProps";
import BidderTableRow from "../../components/biddersTableRow";

export default function BidRecord() {
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
      return res.bidStatus.map((res1, i) => {
        return <BidderTableRow obj1={res1} obj={res} key={i} />;
      });
    });
  };

  return (
    <div className="winner_record admin_padding">
      {/* <BackgroundParticles /> */}
      <Grid container>
        <Grid item md={1} lg={3}>
          <AdminLeftBarProps id={2} />
        </Grid>
        <Grid item xs={12} sm={12} md={11} lg={9}>
          <div
            style={{ color: "#ffffff", fontSize: "39px", fontWeight: "bold" }}
          >
            BID RECORD
          </div>
          <div id="Bid-record" style={{ marginTop: "50px" }}>
            <table
              className="table table-striped css-serial container-out"
              style={{
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
                  <th>ServiceURL</th>
                  <th>Reserved Price($)</th>
                  <th>Wallet Address</th>
                  <th>Balance</th>
                  <th>Bid Amount</th>
                  <th>Ranking</th>
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
