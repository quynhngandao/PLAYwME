import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import petfinder from './petfinder.reducer';
import favorite from './favorite.reducer'
import loading from './loading.reducer'
import requests from './requests.reducer';
import editRequest from './editRequest.reducer';
import searchResult from './searchResult.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  petfinder, // petfinder reducer will store animals from petfinder api
  favorite, // favorite reducer will store favorite animals
  loading, // loading reducer will perform loading spinner for API 
  requests, // requests reducer will store user's animal requests
  editRequest, // edit request reducer will store user's edit infos
  searchResult, // searchResult reducer store searched results
});

export default rootReducer;