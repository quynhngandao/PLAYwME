const editRequestReducer = (state = {}, action) => {
  if (action.type === "SET_EDIT_REQUEST") {
    // Represents a request object
    return action.payload;
  }
  if (action.type === "EDIT_ONCHANGE") {
    return {
      ...state,

      [action.payload.property]: action.payload.value,
    };
  }
  return state;
};

// editRequestReducer will be on the redux state at:
// state.editRequestReducer
export default editRequestReducer;
