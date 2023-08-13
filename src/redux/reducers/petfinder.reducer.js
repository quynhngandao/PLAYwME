const petfinderReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ANIMAL":
      console.log("Updating petfinder ALL state:", action.payload);
      return action.payload;
    default:
      return state;
  }
};


// petfinder will be on the redux state at:
// state.petfinder
export default petfinderReducer;
