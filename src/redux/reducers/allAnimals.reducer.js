const allAnimalsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_ANIMALS':
        return action.payload;
      default:
        return state;
    }
  };

  // allAnimals will be on the redux state at:
  // state.allAnimals
  export default allAnimalsReducer;
  