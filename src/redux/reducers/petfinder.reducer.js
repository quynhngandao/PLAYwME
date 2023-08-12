import { combineReducers } from "redux";

const petfinder = (state = [], action) => {
  switch (action.type) {
    case "SET_ANIMAL":
      console.log("Updating petfinder ALL state:", action.payload);
      return action.payload;
    default:
      return state;
  }
};

const searchResult = (state = {}, action) => {
  switch (action.type) {
    case "SET_DOG":
      console.log("Updating petfinder DOG state:", action.payload);
      return action.payload;
    case "SET_CAT":
      console.log("Updating petfinder CAT state:", action.payload);
      return action.payload;
    case "SET_RABBIT":
      console.log("Updating petfinder RABBIT state:", action.payload);
      return action.payload;
    default:
      return state;
  }
};

// make one object that has keys petfinder, searchResult
// these will be on the redux state at:
// state.petfinder.petfinder and state.petfinder.searchResult
export default combineReducers({
  petfinder,
  searchResult,
});
