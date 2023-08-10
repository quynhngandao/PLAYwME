const userReducer = (state = { isNewUser: false }, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
      };
    case "UNSET_USER":
      return {};
    case "SET_NEW_USER_STATUS":
      return {
        ...state,
        isNewUser: action.payload,
      };
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;
