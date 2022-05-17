import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import Modal from "react-modal";
import { NotificationManager } from "react-notifications";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import MoreIcon from "../assets/img/caret-right.png";
import LessIcon from "../assets/img/caret-down.png";

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

export default function ServiceTableRow(props) {
  const {
    _id,
    name,
    price,
    option,
    network,
    details,
    dates,
    topicImage,
    bidStatus,
  } = props.obj;

  const [name1, setName] = useState("");
  const [price1, setPrice] = useState(0);
  const [option1, setOption] = useState("");
  const [network1, setNetwork] = useState("");
  const [details1, setDetails] = useState("");
  const [dates1, setDates] = useState([]);
  const [topicImageFile, setTopicImageFile] = useState({});
  const [topicImage1, setTopicImage] = useState("");
  const [topicImageUrl, setTopicImageUrl] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [moreDetails, setMoreDetails] = useState(false);
  const [viewDates, setViewDates] = useState(false);

  useEffect(() => {
    setName(name);
    setPrice(price);
    setOption(option);
    setNetwork(network);
    setDetails(details);
    setDates(dates);
    setTopicImage(topicImage);
  }, [name, price, option, network, details, dates, topicImage]);

  const handleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleEdit = () => {
    setModalVisible(!isModalVisible);
  };

  //   to get Base64 URL from uploaded file
  // const getBase64 = (file) =>
  //   new Promise(function (resolve, reject) {
  //     let reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject("Error: ", error);
  //   });

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

  const handleMore = () => {
    setMoreDetails(!moreDetails);
  };
  const handleViewDates = () => {
    setViewDates(!viewDates);
  };
  const updateService = () => {
    for (let i = 0; i < dates1.length; i++) {
      if (dates1[i] < new Date().getTime()) {
        NotificationManager.error("Invalid Date setting error", "Failed", 3000);
        return;
      }
    }
    const serviceObject = {
      name: name1,
      price: price1,
      option: option1,
      network: network1,
      details: details1,
      dates: dates1,
      topicImage: topicImage1,
    };
    axios
      .put(
        process.env.REACT_APP_PROXY + `/services/update-service/` + _id,
        serviceObject
      )
      .then((res) => {
        if (res.status === 200) {
          NotificationManager.success(
            "Service successfully updated !",
            "Success",
            1500
          );
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else Promise.reject();
      })
      .catch((err) =>
        NotificationManager.error("Something went wrong !", "Oops", 2000)
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
  };
  const deleteService = () => {
    if (deleteConfirm === true) {
      axios
        .delete(process.env.REACT_APP_PROXY + `/services/delete-service/` + _id)
        .then((res) => {
          if (res.status === 200) {
            NotificationManager.warning(
              "Service successfully deleted",
              "",
              1500
            );
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else Promise.reject();
        })
        .catch((err) =>
          NotificationManager.error("Something went wrong !", "Oops", 2000)
        );
      setDeleteConfirm(false);
    } else {
      NotificationManager.error(
        "make sure if you want to delete this service",
        "Are you sure ?",
        3000
      );
      setDeleteConfirm(true);
    }
  };
  const handleNetwork = (event) => {
    setNetwork(event.target.value);
  };
  const handleOption = (event) => {
    setOption(event.target.value);
  };
  return (
    <tr>
      <td></td>
      <td>{name}</td>
      <td>{price}</td>
      <td>{option}</td>
      <td>{network}</td>
      <td
        className="container-out"
        style={{
          display: "block",
          overflowY: "auto",
          maxHeight: "100px",
        }}
      >
        {!moreDetails ? (
          <img src={MoreIcon} alt="More" width="20px" onClick={handleMore} />
        ) : (
          <div>
            <img src={LessIcon} alt="Less" width="20px" onClick={handleMore} />
            <br />
            {details}
          </div>
        )}
      </td>
      <td>
        {!viewDates ? (
          <img
            src={MoreIcon}
            alt="More"
            width="20px"
            onClick={handleViewDates}
          />
        ) : (
          <div>
            <img
              src={LessIcon}
              alt="Less"
              width="20px"
              onClick={handleViewDates}
            />
            <br />
            {dates.map((res, i) => {
              return <div key={i}>{new Date(res).toDateString() + ","}</div>;
            })}
          </div>
        )}
      </td>
      <td>
        <div style={{ color: "lightgreen" }}>available</div>
      </td>
      <td>
        <img src={"../img/" + topicImage} alt="topic" width="50px" />
      </td>
      <td>
        {bidStatus.length === 0 ? (
          <span>
            <button
              onClick={handleEdit}
              style={{
                borderRadius: "5px",
                backgroundColor: "#2039e0",
                border: "none",
                outline: "none",
                padding: "7px 20px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
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
                      helperText="Please change the service name."
                      value={name1}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      label="Price"
                      type="number"
                      variant="outlined"
                      helperText="Please update proper price."
                      value={price1}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      select
                      label="option"
                      value={option1}
                      onChange={handleOption}
                      helperText="Please select another option."
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
                      value={network1}
                      onChange={handleNetwork}
                      helperText="Please select another network."
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
                      placeholder="update available dates for the service.."
                      multiple
                      value={dates1}
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
                    <img
                      src={
                        topicImageUrl ? topicImageUrl : "../img/" + topicImage
                      }
                      alt="topicImage"
                      width="100px"
                      style={{ marginBottom: "30px" }}
                    />
                    <div>
                      <label className="uploadTopicImageButton">
                        Change Topic Image
                        <input
                          type="file"
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
                      helperText="Please change details for the service."
                      value={details1}
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
                      onClick={updateService}
                      disabled={
                        name1 &&
                        price1 &&
                        option1 &&
                        network1 &&
                        dates1.length !== 0 &&
                        details1 &&
                        topicImage1
                          ? false
                          : true
                      }
                    >
                      UPDATE
                    </button>
                    <button className="cancelButton" onClick={handleEdit}>
                      CANCEL
                    </button>
                  </Grid>
                </Grid>
              </div>
            </Modal>
            <button
              onClick={deleteService}
              style={{
                borderRadius: "5px",
                backgroundColor: "#e40a58",
                border: "none",
                outline: "none",
                padding: "7px 10px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </span>
        ) : (
          <button
            style={{
              backgroundColor: "#ffa300",
              border: "none",
              outline: "none",
              padding: "7px 10px",
              color: "white",
            }}
            onClick={() => {
              NotificationManager.warning(
                "Bid already started. You can't EDIT/DELETE services",
                "Warning",
                5000
              );
            }}
          >
            Sealed
          </button>
        )}
      </td>
    </tr>
  );
}
