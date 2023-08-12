
const editRequestReducer = (state = {}, action) => {
  switch (action.type) {
      case "SET_EDIT_REQUEST":
       // object with properties
        return action.payload;
      case "EDIT_ONCHANGE":
        // Update corresponding property with new value
        return {
          ...state,
          [action.payload.property]: action.payload.value,
        };
      case "RESET_EDIT_REQUEST":
        // Reset to initial state
        return {};
      default:
        return state;
    }
  };

// editRequestReducer will be on the redux state at:
// state.editRequestReducer
export default editRequestReducer;