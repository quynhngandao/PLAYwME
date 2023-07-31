const petfinderReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ANIMAL':
        return action.payload.animals;
      default:
        return state;
    }
  };

  // petfinder will be on the redux state at:
  // state.petfinder
  export default petfinderReducer;
  