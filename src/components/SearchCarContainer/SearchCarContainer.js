import "./SearchCar.css";
import React, { useReducer, useState, useContext } from "react";
import {} from "../../context/searchActions";
import SelectComponent from "../SelectComponent/SelectComponent";
import CarDetailComponent from "../CarDetailsComponent/CarDetailComponent";
import carContext from "../../context/carContext";

const SearchCarContainer = () => {
  const context = useContext(carContext);

  return (
    <div>
      <div className="search-container">
        <div className="select-container">
          <SelectComponent
            options={context.state.carBrandList}
            defaultText="Brand"
            value={context.state.selectedBrand}
            onChange={(value) => {
              context.dispatch({ type: "SET_CAR_MAKE", value: value });
            }}
          />
          <SelectComponent
            options={context.state.carList}
            defaultText="Model"
            value={context.state.selectedCar}
            onChange={(value) => {
              context.dispatch({ type: "SET_CAR_NAME", value: value });
            }}
          />
        </div>
        <div className="button-container">
          <button
            className={`button ${
              !context.state.selectedBrand || !context.state.selectedCar
                ? "disabled"
                : ""
            }`}
            onClick={() =>
              context.dispatch({ type: "SET_SELECTED_CAR_BUTTON_CLICK" })
            }
          >
            Search
          </button>
        </div>
      </div>
      <div>
        {context.state.carDetails.length ? (
          <CarDetailComponent carDetails={context.state.carDetails} />
        ) : (
          <p className="text-center no-search-results">No search results</p>
        )}
      </div>
    </div>
  );
};

export default SearchCarContainer;
