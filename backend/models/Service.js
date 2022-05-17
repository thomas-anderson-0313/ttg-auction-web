const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let serviceSchema = new Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    option: {
      type: String,
    },
    network: {
      type: String,
    },
    dates: {
      type: Array,
    },
    details: {
      type: String,
    },
    now: {
      type: String,
    },
    topicImage: {
      type: String,
    },
    bidStatus: {
      type: Array,
    },
  },
  {
    collection: "services",
  }
);

module.exports = mongoose.model("Service", serviceSchema);
