import React from "react";
import "./Home.css";

import Nav from "./components/Nav";
import InfoCard from "./components/InfoCard";
import info from "./assets/InfoCardInfo";

function Home() {

  return (
    <div>
      <Nav currentPage={"Home"} />
      <div className="homeScreen">
        <img
          src="https://images.squarespace-cdn.com/content/v1/6298447c50073672a0100c93/c72b6774-ea25-4de7-9674-0f2665c67b99/Web_Start-Chicago23.JPG"
          alt="people running"
          className="background-image"
        ></img>
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
        {info.map(item => <InfoCard text={item.text} header={item.header} image={item.image} interation={item.interation} />)}
      </div>
    </div>
  );
}

export default Home;
