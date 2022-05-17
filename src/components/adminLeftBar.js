import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "../main.css";

import Admin_logo from "../assets/img/logo_light 1.png";

export default function AdminLeftBar(props) {
  const { id, leftbar_style } = props;

  useEffect(() => {
    if (!window.sessionStorage.getItem("loggedin")) {
      window.preventBackButton = function () {
        try {
          if (
            document &&
            (!document.cookie || document.cookie.indexOf("_tc=1") < 0)
          ) {
            window.document.body.style.display = "none";
            window.location = "/admin";
          }
        } catch (e) {}
      };
      window.preventBackButton();
    }    
  }, []);

  return (
    <div className={leftbar_style}>
      <div className="admin_left_bar">
        <center className="admin_logo">
          <img src={Admin_logo} alt="Admin_logo" className="Admin_logo" />
        </center>

        <Link
          to="/admin/dashboard"
          className={id === 1 ? "Admin_Links detect" : "Admin_Links"}
        >
          <div   className={id === 1 ? "Admin_Links detect" : "Admin_Links"} style={{ marginTop: "10px" }}><div className="admin_router_name">Dashboard</div></div>
        </Link>
        <Link
          to="/admin/bid-record"
          className={id === 2 ? "Admin_Links detect" : "Admin_Links"}
        >
          <div  className={id === 2 ? "Admin_Links detect" : "Admin_Links"} style={{ marginTop: "10px" }}><div className="admin_router_name">Bid Record</div></div>
        </Link>
        <Link to="/admin/winner-record"  className={id === 3 ? "Admin_Links detect" : "Admin_Links"}>
          <div className={id === 3 ? "Admin_Links detect" : "Admin_Links"} style={{ marginTop: "10px" }}><div className="admin_router_name">Winner Record</div></div>
        </Link>
        <Link to="/admin/edit-service"  className={id === 4 ? "Admin_Links detect" : "Admin_Links"}>
          <div className={id === 4 ? "Admin_Links detect" : "Admin_Links"} style={{ marginTop: "10px" }}><div className="admin_router_name">Edit Services</div></div>
        </Link>
        <Link to="/admin/admin-accounts"  className={id === 5 ? "Admin_Links detect" : "Admin_Links"}>
          <div className={id === 5 ? "Admin_Links detect" : "Admin_Links"} style={{ marginTop: "10px" }}><div className="admin_router_name">Admin Account</div></div>
        </Link>
        <Link to="/" className="Admin_Links">
          <div
            className="log_out"
            onClick={() => window.sessionStorage.removeItem("loggedin")}
          >
            LOG OUT
          </div>
        </Link>
      </div>
    </div>
  );
}
