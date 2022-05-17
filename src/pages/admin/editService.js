import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Modal from "react-modal";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

// import BackgroundParticles from "../../components/particles";
import AdminLeftBarProps from "../../components/adminLeftProps";
import ServiceTableRow from "../../components/serviceTableRow";

const currencies = [
  {
    value: "ETH",
    label: "ETH",
  },
  {
    value: "BSC",
    label: "BSC",
  },
  {
    value: "MATIC",
    label: "MATIC",
  },
  {
    value: "FANTOM",
    label: "FANTOM",
  },
];

const options = [
  {
    value: "DexTools",
    label: "DexTools",
  },
  {
    value: "Crypto.com",
    label: "Crypto.com",
  },
  {
    value: "CoinMarketCap",
    label: "CoinMarketCap",
  },
  {
    value: "CoinGecko",
    label: "CoinGecko",
  },
  {
    value: "PinkSale",
    label: "PinkSale",
  },
];

export default function EditService() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [option, setOption] = useState("DexTools");
  const [network, setNetwork] = useState("ETH");
  const [details, setDetails] = useState("");
  const [topicImageFile, setTopicImageFile] = useState({});
  const [topicImage, setTopicImage] = useState("");
  const [topicImageUrl, setTopicImageUrl] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const [services, setServices] = useState([]);

  /*******added multiple date panel******** */
  const [dates, setDates] = useState([]);

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
      return <ServiceTableRow obj={res} key={i} />;
    });
  };

  const handleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //   to get Base64 URL from uploaded file
  //   const getBase64 = (file) =>
  //     new Promise(function (resolve, reject) {
  //       let reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onload = () => resolve(reader.result);
  //       reader.onerror = (error) => reject("Error: ", error);
  //     });

  const handleImage = (e) => {
    // const file = e.target.files[0];
    // getBase64(file).then((result) => {
    //   setTopicImage(result);
    // });

    const formData = new FormData();
    formData.append("my-image-file", e.target.files[0], e.target.files[0].name);
    setTopicImageFile(formData);
    setTopicImageUrl(URL.createObjectURL(e.target.files[0]));
    setTopicImage(e.target.files[0].name);
  };

  // save a new service
  const saveService = () => {
    for (let i = 0; i < dates.length; i++) {
      if (dates[i] < new Date().getTime()) {
        NotificationManager.error("Invalid Date setting error", "Failed", 3000);
        return;
      }
    }
    if (!option || !network) {
      NotificationManager.error("Invalid setting error", "Failed", 3000);
      return;
    }
    const serviceObject = {
      name,
      price,
      option,
      network,
      dates,
      details,
      now: new Date().getTime(),
      topicImage,
      bidStatus: [],
    };
    axios
      .post(
        process.env.REACT_APP_PROXY + `/services/create-service`,
        serviceObject
      )
      .then((res) => {
        if (res.status === 200) {
          NotificationManager.success(
            "Service created successfully",
            "Success",
            1500
          );
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else Promise.reject();
      })
      .catch((err) =>
        NotificationManager.error("Something went wrong", "Oops", 3000)
      );

    axios
      .post(
        process.env.REACT_APP_PROXY + `/services/image-upload`,
        topicImageFile
      )
      .then((res) => {
        console.log("Axios response: ", res);
      });
    setModalVisible(false);
    setName("");
    setPrice(0);
    setDetails("");
    setTopicImage("");
    setDates([]);
  };

  const handleEdit = () => {
    setModalVisible(!isModalVisible);
  };

  const cancelEdit = () => {
    setModalVisible(!isModalVisible);
    setName("");
    setPrice(0);
    setDetails("");
    setTopicImage("");
    setDates([]);
  };

  //   catch network from dropdown menu for network
  const handleNetwork = (event) => {
    setNetwork(event.target.value);
  };
  const handleOption = (event) => {
    setOption(event.target.value);
  };
  return (
    <div className="winner_record admin_padding">
      {/* <BackgroundParticles /> */}
      <Grid container>
        <Grid item md={1} lg={3}>
          <AdminLeftBarProps id={4} />
        </Grid>
        <Grid item xs={12} sm={12} md={11} lg={9}>
          <div
            style={{ color: "#ffffff", fontSize: "39px", fontWeight: "bold" }}
          >
            EDIT SERVICES
          </div>
          <div className="add_service_button" onClick={handleEdit}>
            Add Service
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
                  <th>ServiceName</th>
                  <th>Price</th>
                  <th>ServiceOption</th>
                  <th>Network</th>
                  <th>Details</th>
                  <th>Dates</th>
                  <th>Status</th>
                  <th>TopicImage</th>
                  <th style={{ borderRadius: "0 15px 15px 0" }}>Actions</th>
                </tr>
              </thead>
              <tbody>{DataTable()}</tbody>
            </table>
          </div>
          <div style={{ zIndex: "100", position: "relative" }}>
            <Modal
              isOpen={isModalVisible}
              onRequestClose={handleModal}
              contentLabel="Warning"
              className="eidt_service_modal_style"
              ariaHideApp={false}
              shouldCloseOnOverlayClick={false}
            >
              <div className="edit_service_pad container-out">
                <Grid container>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      label="Service Name"
                      variant="outlined"
                      helperText="Please add a new service name."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      label="Price"
                      type="number"
                      variant="outlined"
                      helperText="Please reserve proper price."
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      select
                      label="option"
                      value={option}
                      onChange={handleOption}
                      helperText="Please select an option."
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      select
                      label="network"
                      value={network}
                      onChange={handleNetwork}
                      helperText="Please select network."
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {currencies.map((currency) => (
                        <MenuItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    style={{ marginTop: "15px" }}
                  >
                    <DatePicker
                      placeholder="pick available dates for the service.."
                      multiple
                      value={dates}
                      onChange={setDates}
                      plugins={[<DatePanel />]}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    style={{ marginTop: "25px" }}
                  >
                    {topicImageUrl ? (
                      <img
                        src={topicImageUrl}
                        alt="topicImage"
                        width="100px"
                        style={{ marginBottom: "30px" }}
                      />
                    ) : null}
                    <div>
                      <label className="uploadTopicImageButton">
                        Upload Topic Image
                        <input
                          type="file"
                          accept="image/*"
                          name="topicImage"
                          onChange={handleImage}
                          style={{ display: "none" }}
                        />
                      </label>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      multiline
                      rows={3}
                      label="Service Details"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      helperText="Please write details for the service."
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    style={{ marginTop: "30px" }}
                  >
                    <button
                      className="saveButtonStyle"
                      onClick={saveService}
                      disabled={
                        name &&
                        price &&
                        option &&
                        network &&
                        dates.length !== 0 &&
                        details &&
                        topicImage
                          ? false
                          : true
                      }
                    >
                      SAVE
                    </button>
                    <button className="cancelButton" onClick={cancelEdit}>
                      CANCEL
                    </button>
                  </Grid>
                </Grid>
              </div>
            </Modal>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
