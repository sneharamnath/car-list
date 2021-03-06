import "./CarDetail.css";
import React, { useState, useEffect } from "react";

function CarDetailComponent({ carDetails }) {
  const [selectedCarIdx, setSelectedCarIdx] = useState(0);

  return (
    <div>
      <div className="car-details-container">
        {carDetails.map((item, index) => (
          <div
            className={`car-detail-card ${
              selectedCarIdx === index ? "selected" : ""
            } `}
            key={index}
            onClick={() => setSelectedCarIdx(index)}
          >
            <div>
              <div className="car-heading">
                <h3>
                  {item.make} {item.model}
                </h3>
              </div>
              <div className="flex car-subheading-container">
                <div className="subheading-text">Fuel Type: </div>
                <div>{item.fuelType}</div>
              </div>
              <div className="flex car-subheading-container">
                <div className="subheading-text">Engine Power(PS): </div>
                <div>{item.enginePowerPS}</div>
              </div>
              <div className="flex car-subheading-container">
                <div className="subheading-text">Engine Power(KW): </div>
                <div>{item.enginePowerKW}</div>
              </div>
              <div className="flex car-subheading-container">
                <div className="subheading-text">Capacity: </div>
                <div>{item.engineCapacity}</div>
              </div>
              <div className="flex car-subheading-container">
                <div className="subheading-text">Body Type: </div>
                <div>{item.bodyType}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarDetailComponent;
