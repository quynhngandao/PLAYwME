const searchResultReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_SEARCH_RESULT":
      return action.payload;
      case "CLEAR_SEARCH_RESULT": 
      return []; // IMPORTANT to clear search 
    default:
      return state;
  }
};

// searchResult will be on the redux state at:
// state.searchResult
export default searchResultReducer;
