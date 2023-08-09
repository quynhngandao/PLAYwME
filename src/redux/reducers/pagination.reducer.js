const paginationReducer = (state =  {} , action) => {
  switch (action.type) {
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload
      };
    case "SET_TOTAL_PAGES":
      return {
        ...state,
        totalPages: action.payload,
      };
    case "SET_COUNT_PER_PAGE":
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
};

// pagination will be on the redux state at:
// state.pagination
export default paginationReducer;
