import axios from "axios";
import React, { useReducer, useEffect } from "react";
import CarContext from "./carContext";
import searchReducer from "./searchReducer";

const cache = {};

const CarState = (props) => {
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
    <CarContext.Provider value={{ state: state, dispatch }}>
      {props.children}
    </CarContext.Provider>
  );
};

export default CarState;
