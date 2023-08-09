const paginationReducer = (state = [], action) => {
  switch (action.type) {
      case "SET_CURRENT_PAGE":
        return {
          ...state,
          currentPage: action.payload.pagination
        };
      case "SET_TOTAL_PAGES":
        return {
          ...state,
          totalPages: action.payload.pagination
        };
      case "SET_COUNT_PER_PAGE":
        return {
          ...state,
          count: action.payload.pagination
        }; 
        case "SET_LINKS":
        return {
          ...state,
          links: action.payload.pagination
        };
  
        case "SET_PREVIOUS":
        return {
          ...state,
          previous: action.payload.pagination
        };
        case "SET_NEXT":
          return {
            ...state,
            next: action.payload.pagination
          };
    default:
      return state;
  }
};


// const paginationReducer = (state =  {} , action) => {
//   switch (action.type) {
//     case "SET_CURRENT_PAGE":
//       return {
//         ...state,
//         currentPage: action.payload
//       };
//     case "SET_TOTAL_PAGES":
//       return {
//         ...state,
//         totalPages: action.payload,
//       };
//     case "SET_COUNT_PER_PAGE":
//       return {
//         ...state,
//         count: action.payload,
//       }; 
//       case "SET_LINKS":
//       return {
//         ...state,
//         links: action.payload,
//       };

//       case "SET_PREVIOUS":
//       return {
//         ...state,
//         previous: action.payload,
//       };
//       case "SET_NEXT":
//         return {
//           ...state,
//           next: action.payload,
//         };
//     default:
//       return state;
//   }
// };

// pagination will be on the redux state at:
// state.pagination
export default paginationReducer;
