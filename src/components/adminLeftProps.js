import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import AdminLeftBar from "./adminLeftBar";

import Burger from "../assets/img/menu.png";

export default function AdminLeftBarProps(props) {
  const { id } = props;
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1280px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);
    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  return (
    <div>
      <button onClick={toggleNav} className="Burger">
        <img src={Burger} alt="burgerIcon" style={{ width: "80px" }} />
      </button>
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav" style={{ position: "relative", zIndex: "98" }}>
          <AdminLeftBar id={id} />
        </nav>
      </CSSTransition>
    </div>
  );
}
