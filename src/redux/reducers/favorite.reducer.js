const favoriteReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_FAVORITE':
        return action.payload;
      default:
        return state;
    }
  };

  // favorite will be on the redux state at:
  // state.favorite
  export default favoriteReducer;
  