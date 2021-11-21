const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_CAR_MAKE_LIST":
      return {
        ...state,
        carBrandList: action.payload,
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
        selectedBrand: null,
        selectedCar: null,
        selectedCarFromButtonClick: null,
        carList: [],
        carBrandList: [],
        error: "",
      };
    case "SET_CAR_MAKE":
      return { ...state, selectedBrand: action.value, selectedCar: null };
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

export default reducer;