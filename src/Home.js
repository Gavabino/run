import React from "react";
import "./Home.css";
import background from "./assets/layered-waves-haikei.svg"

import Nav from "./components/Nav";
import InfoCard from "./components/InfoCard";
import info from "./assets/InfoCardInfo";

function Home() {

  return (
    <div>
      <Nav currentPage={"Home"} />
      <div className="homeScreen">
        <div className="info">
          <p>
            {" "}
            <span className="title">Run!</span>
            <br />
            <span className="caption">Training made simple</span>
          </p>
        </div>
      </div>
      <div className="features">
        {info.map(item => <InfoCard text={item.text} header={item.header} image={item.image} interation={item.interation} className="infocard" />)}
      </div>
    </div>
  );
}

export default Home;
