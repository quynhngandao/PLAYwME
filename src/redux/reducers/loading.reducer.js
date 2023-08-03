const loadingReducer = (state = false, action) => {
  switch (action.type) {  
    case "UNSET_LOADING":
      return false;
    case "SET_LOADING":
      return true;
    default:
      return state;
  }
};

// loading will be on the redux state at:
// state.loading
export default loadingReducer;
