import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Underline } from "../../components/theme";
import { Button1 } from "../../components/theme";

import Header from "../../components/header";

export default function Faq() {
  const [goback, setGoback] = useState("");

  useEffect(() => {
    setGoback("Go Back");
  }, []);
  return (
    <div className="App App-height1">
      <Header />
      <div className="faq_title">FAQ</div>
      <Underline />
      <div className="faq_contents">
        <div className="faq_topic">What does LOREM mean?</div>
        <div className="faq_main">
          Lorem Ipsum was originally taken from a Latin text by the Roman
          philosopher Cicero. ... The word 'lorem', for example, isn't a real
          Latin word, it's a shortened version of the word 'dolorem', meaning
          pain. This makes the current dummy text impossible to translate into
          English
        </div>
        <hr className="hr_custom" />
        <div className="faq_topic">What does LOREM mean?</div>
        <div className="faq_main">
          Lorem Ipsum was originally taken from a Latin text by the Roman
          philosopher Cicero. ... The word 'lorem', for example, isn't a real
          Latin word, it's a shortened version of the word 'dolorem', meaning
          pain. This makes the current dummy text impossible to translate into
          English
        </div>
        <hr className="hr_custom" />

        <div className="faq_topic">What does LOREM mean?</div>
        <div className="faq_main">
          Lorem Ipsum was originally taken from a Latin text by the Roman
          philosopher Cicero. ... The word 'lorem', for example, isn't a real
          Latin word, it's a shortened version of the word 'dolorem', meaning
          pain. This makes the current dummy text impossible to translate into
          English
        </div>
        <hr className="hr_custom" />

        <div style={{ textAlign: "center" }}>
          <Link to="/calendar" style={{ textDecoration: "none" }}>
            <Button1 btnContent={goback} btn1Class="go_back_btn" />
          </Link>
        </div>
      </div>
    </div>
  );
}
