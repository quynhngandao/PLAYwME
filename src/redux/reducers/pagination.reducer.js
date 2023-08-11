const paginationReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload.pagination.currentPage,
      };
    case "SET_TOTAL_PAGES":
      return {
        ...state,
        totalPages: action.payload.pagination.total_pages,
      };
    case "SET_PREVIOUS":
      return {
        ...state,
        previous: action.payload.pagination,
      };
    case "SET_NEXT":
      return {
        ...state,
        next: action.payload.pagination,
      };
    default:
      return state;
  }
};

// pagination will be on the redux state at:
// state.pagination
export default paginationReducer;
