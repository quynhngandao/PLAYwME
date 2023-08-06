const requestsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_REQUEST':
        return action.payload;
      default:
        return state;
    }
  };

  // requests will be on the redux state at:
  // state.requests
  export default requestsReducer;
  