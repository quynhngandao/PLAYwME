const requestReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_REQUEST':
        return action.payload;
      default:
        return state;
    }
  };

  // request will be on the redux state at:
  // state.request
  export default requestReducer;
  