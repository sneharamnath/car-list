import "./App.css";
import React, { useEffect, useReducer } from "react";
import CarDetailComponent from "./components/CarDetailsComponent/CarDetailComponent";
import SelectComponent from "./components/SelectComponent/SelectComponent";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_CAR_MAKE_LIST":
      return {
        ...state,
        carMakeList: action.payload,
        carList: [],
        error: "",
        selectedCar: null,
        carDetails: [],
      };
    case "FETCH_CAR_LIST":
      return { ...state, carList: action.payload, error: "", carDetails: [] };
    case "FETCH_ERROR":
      return {
        ...state,
        selectedMake: null,
        selectedCar: null,
        selectedCarFromButtonClick: null,
        carList: [],
        carMakeList: [],
        error: "",
      };
    case "SET_CAR_MAKE":
      return { ...state, selectedMake: action.value, selectedCar: null };
    case "SET_CAR_NAME":
      return { ...state, selectedCar: action.value };
    case "FETCH_CAR_DETAILS":
      return { ...state, carDetails: action.payload };
    case "SET_SELECTED_CAR_BUTTON_CLICK":
      return { ...state, selectedCarFromButtonClick: state.selectedCar };
    default:
      return state;
  }
};

function App() {
  const initialState = {
    carList: [],
    carMakeList: [],
    selectedMake: null,
    selectedCar: null,
    selectedCarFromButtonClick: null,
    carDetails: [],
    error: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  //FETCH THE CAR MAKES
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/makes`)
      .then((response) => {
        dispatch({ type: "FETCH_CAR_MAKE_LIST", payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_ERROR", payload: {} });
      });
    return () => {};
  }, []);

  //FETCH THE CAR MODELS FOR A PARTICULAR MAKE
  useEffect(() => {
    if (state.selectedMake) {
      axios
        .get(`http://localhost:8080/api/models`, {
          params: { make: state.selectedMake },
        })
        .then((response) => {
          dispatch({ type: "FETCH_CAR_LIST", payload: response.data });
        })
        .catch((err) => {
          dispatch({ type: "FETCH_ERROR", payload: {} });
        });
    }
    return () => {};
  }, [state.selectedMake]);

  //FETCH THE CAR DETAILS
  useEffect(() => {
    if (state.selectedCarFromButtonClick) {
      axios
        .get(`http://localhost:8080/api/vehicles`, {
          params: { make: state.selectedMake, model: state.selectedCar },
        })
        .then((response) => {
          dispatch({ type: "FETCH_CAR_DETAILS", payload: response.data });
        })
        .catch((err) => {
          dispatch({ type: "FETCH_ERROR", payload: {} });
        });
    }
    return () => {};
  }, [state.selectedCarFromButtonClick]);

  return (
    <div className="App">
      <div>
        <div className="search-container">
          <div className="select-container">
            <SelectComponent
              options={state.carMakeList}
              defaultText='Brand'
              value={state.selectedMake}
              onChange={(value) => {
                dispatch({ type: "SET_CAR_MAKE", value: value });
              }}
            />
            <SelectComponent
              options={state.carList}
              defaultText='Model'
              value={state.selectedCar}
              onChange={(value) => {
                dispatch({ type: "SET_CAR_NAME", value: value });
              }}
            />
          </div>
          <div className="button-container">
            <button
              className="button"
              onClick={() =>
                dispatch({ type: "SET_SELECTED_CAR_BUTTON_CLICK" })
              }
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
    </div>
  );
}

export default App;
