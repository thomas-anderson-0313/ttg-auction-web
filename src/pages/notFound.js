import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";

export default function NotFound() {
  return (
    <div className="App" style={{ color: "#fff" }}>
      <Header />
      <div style={{ marginTop: "30vh" }}>
        <h1>404 - Oops, Not Found!</h1>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#fff",
            padding: "10px",
            background:
              "linear-gradient(91.47deg, #007dfb 0%, #06345f 28%, #00152998 88%)",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {" "}
          Go Home
        </Link>
      </div>
    </div>
  );
}
