import "./SearchCar.css";
import React, { useReducer, useEffect, useContext } from "react";
import {} from "../../context/searchActions";
import SelectComponent from "../SelectComponent/SelectComponent";
import CarDetailComponent from "../CarDetailsComponent/CarDetailComponent";
import axios from "axios";
import searchReducer from "../../context/searchReducer";

const cache = {};

const SearchCarContainer = () => {
  const initialState = {
    carList: [],
    carBrandList: [],
    selectedBrand: null,
    selectedCar: null,
    selectedCarFromButtonClick: null,
    carDetails: [],
    error: "",
  };

  const [state, dispatch] = useReducer(searchReducer, initialState);

  // FETCH THE CAR MAKES
  useEffect(() => {
    const url = `http://localhost:8080/api/makes`;
    if (cache[url]) {
      const data = cache[url];
      dispatch({ type: "FETCH_CAR_MAKE_LIST", payload: data });
    } else {
      axios
        .get(url)
        .then((response) => {
          cache[url] = response.data;
          dispatch({ type: "FETCH_CAR_MAKE_LIST", payload: response.data });
        })
        .catch((err) => {
          dispatch({ type: "FETCH_ERROR", payload: {} });
        });
    }
    return () => {};
  }, []);

  //FETCH THE CAR MODELS FOR A PARTICULAR MAKE
  useEffect(() => {
    const url = `http://localhost:8080/api/models?make=${state.selectedBrand}`;
    if (cache[url]) {
      const data = cache[url];
      dispatch({ type: "FETCH_CAR_LIST", payload: data });
    } else {
      if (state.selectedBrand) {
        axios
          .get(url)
          .then((response) => {
            cache[url] = response.data;
            dispatch({ type: "FETCH_CAR_LIST", payload: response.data });
          })
          .catch((err) => {
            dispatch({ type: "FETCH_ERROR", payload: {} });
          });
      }
    }
    return () => {};
  }, [state.selectedBrand]);

  //FETCH THE CAR DETAILS
  useEffect(() => {
    const url = `http://localhost:8080/api/vehicles?make=${state.selectedBrand}&model=${state.selectedCarFromButtonClick}`;
    if (cache[url]) {
      const data = cache[url];
      dispatch({ type: "FETCH_CAR_DETAILS", payload: data });
    } else {
      if (state.selectedCarFromButtonClick) {
        axios
          .get(url)
          .then((response) => {
            cache[url] = response.data;
            dispatch({ type: "FETCH_CAR_DETAILS", payload: response.data });
          })
          .catch((err) => {
            dispatch({ type: "FETCH_ERROR", payload: {} });
          });
      }
    }
    return () => {};
  }, [state.selectedCarFromButtonClick]);

  return (
    <div>
      <div className="search-container">
        <div className="select-container">
          <SelectComponent
            options={state.carBrandList}
            defaultText="Brand"
            value={state.selectedBrand}
            onChange={(value) => {
              dispatch({ type: "SET_CAR_MAKE", value: value });
            }}
          />
          <SelectComponent
            options={state.carList}
            defaultText="Model"
            value={state.selectedCar}
            onChange={(value) => {
              dispatch({ type: "SET_CAR_NAME", value: value });
            }}
          />
        </div>
        <div className="button-container">
          <button
            className={`button ${
              !state.selectedBrand || !state.selectedCar ? "disabled" : ""
            }`}
            onClick={() => dispatch({ type: "SET_SELECTED_CAR_BUTTON_CLICK" })}
          >
            Search
          </button>
        </div>
      </div>
      <div>
        {state.carDetails.length ? (
          <CarDetailComponent carDetails={state.carDetails} />
        ) : (
          <p className="text-center no-search-results">No search results</p>
        )}
      </div>
    </div>
  );
};

export default SearchCarContainer;
