const apiSearchReducer = (state = [], action ) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULT':
            return action.payload;
        default:
            return state;
    }
}

// apiSearchReducer will be on the redux state at:
// state.apiSearchReducer
export default apiSearchReducer;