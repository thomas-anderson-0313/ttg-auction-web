import React from "react";

import Loading from "../assets/img/loadingSmall.gif";

export default function BiddersTableRow(props) {
  const result = props.obj1;
  const bidderAddress = Object.keys(result)[0];
  const resultBidderData = result[bidderAddress];
  var ranking = 1;
  for (let i = 0; i < props.obj.bidStatus.length; i++) {
    if (
      resultBidderData.amount <
      props.obj.bidStatus[i][Object.keys(props.obj.bidStatus[i])[0]].amount
    ) {
      ranking += 1;
    }
  }
  return (
    <tr>
      <td></td>
      <td>{props.obj.name}</td>
      <td>{props.obj.option}</td>
      <td>{resultBidderData.serviceUrl}</td>
      <td>{props.obj.price}</td>
      <td>
        {bidderAddress || (
          <img src={Loading} alt="this bidder missed..." width={30}></img>
        )}
      </td>
      <td>
        {resultBidderData.userBalance !== 0 ? (
          resultBidderData.userBalance + " " + resultBidderData.currency
        ) : (
          <img src={Loading} alt="this bidder missed..." width={30}></img>
        )}
      </td>
      <td>{resultBidderData.amount + " " + resultBidderData.currency}</td>
      <td>{ranking}</td>
      <td>{resultBidderData.date}</td>
      <td>{resultBidderData.dateForService}</td>
      <td>{resultBidderData.contactInfor}</td>
      <td style={{ color: "yellow" }}>process</td>
    </tr>
  );
}
