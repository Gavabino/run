import React from "react";
import "./Home.css";

import Nav from "../../components/welcome/Nav";
import InfoCard from "../../components/welcome/InfoCard";
import info from "../../utils/infoCardData";

function Home() {

    return (
        <>
            <Nav activeIndex={0}/>
            <div className="homeScreen">
                <div className="info">
                    <p>
                        <span className="title">Run!</span>
                        <br/>
                        <span className="caption">Training made simple</span>
                    </p>
                </div>
            </div>
            <div className="features">
                {info.map((item) => (
                    <InfoCard
                        text={item.text}
                        header={item.header}
                        image={item.image}
                        interation={item.interation}
                        className="infocard"
                    />
                ))}
            </div>
        </>
    );
}

export default Home;
