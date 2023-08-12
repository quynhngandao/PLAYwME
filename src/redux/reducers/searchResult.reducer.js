const searchResultReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_RESULT":
      return action.payload;
    default:
      return state;
  }
};

// searchResult will be on the redux state at:
// state.searchResult
export default searchResultReducer;
