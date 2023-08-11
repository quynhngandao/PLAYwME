const apiResultReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_DOG_RESULT":
      return action.payload;
    case "SET_CAT_RESULT":
      return action.payload;
    default:
      return state;
  }
};

// apiResultReducer will be on the redux state at:
// state.apiResultReducer
export default apiResultReducer;
