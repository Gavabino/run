import React from "react";
import "./InfoCard.css";

function InfoCard({ text, image, header, interation }) {

    if (interation % 2 === 0) {
        return (
            <div className="container-left">
          <div className="image-container">
            <img src={image} className="image" alt="product-image" />
          </div>
          <div className="info-container">
            <p className="header">{header}</p>
            <p className="description">{text}</p>
          </div>
        </div>
        )
    } else {
        return (
            <div className="container-right">
          <div className="image-container">
            <img src={image} className="image" alt="product-image" />
          </div>
          <div className="info-container">
            <p className="header">{header}</p>
            <p className="description">{text}</p>
          </div>
        </div>
        )
    }
}

export default InfoCard;
