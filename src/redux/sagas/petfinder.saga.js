import axios from "axios";
import { put, takeEvery, takeLatest } from "redux-saga/effects";

// // Fetch from API for cats and dogs
// function* getAnimalsInMN(action) {
//   try {
//     // Loading spinner while page loads
//     yield put({ type: "SET_LOADING" });
//     // Make the API call
//     const response = yield axios.get("/api/animal");
//     yield put({ type: "SET_ANIMAL", payload: response.data });
//   } catch (error) {
//     console.log("Error with animals GET request from redux: ", error);
//   } finally {
//     yield put({ type: "UNSET_LOADING" });
//   }
// }


// Fetch from API
function* getAnimalsInMN(action) {
    try {
      // Loading spinner while page loads
      yield put({ type: "SET_LOADING" });
      // Make the API call
      const response = yield axios.get("/api/animal", {
        params: {
          location: "MN",
        },
      });
      yield put({ type: "SET_ANIMAL", payload: response.data });
      yield put({ type: "SET_TOTAL_PAGES", payload: response.data});
      yield put({ type: "SET_CURRENT_PAGE", payload:  response.data});
      yield put({ type: "SET_COUNT_PER_PAGE", payload: response.data})
      yield put({type: "SET_PREVIOUS", payload: response.data})
      yield put({type: "SET_NEXT",  payload: response.data})
      yield put({type: "SET_LINK",  payload: response.data})
    } catch (error) {
      console.log("Error with animals GET request from redux: ", error);
    } finally {
      yield put({ type: "UNSET_LOADING" });
    }
  }
  

// Search API
function* searchApi(action) {
  try {
    // Loading spinner while page loads
    yield put({ type: "SET_LOADING" });
    // Make the API call
    const searchResponse = yield axios.get(
      `/api/animal/search/${action.payload}`,
    
    );
    yield put({ type: "SET_SEARCH_", payload: searchResponse.data });
  } catch (error) {
    console.log("Error with GET CAT by types from redux: ", error);
  } finally {
    yield put({ type: "UNSET_LOADING" });
  }
}

// Dog Result 
function* dogResult(action) {
  try {
    // Loading spinner while page loads
    yield put({ type: "SET_LOADING" });
    // Make the API call
    const dogResponse = yield axios.get(
      `/api/animal/search/${action.payload}`
    );
    yield put({ type: "SET_DOG_RESULT", payload: dogResponse.data });
  } catch (error) {
    console.log("Error with GET DOG from redux: ", error);
  } finally {
    yield put({ type: "UNSET_LOADING" });
  }
}

// CAT Result 
function* catResult(action) {
    try {
      // Loading spinner while page loads
      yield put({ type: "SET_LOADING" });
      // Make the API call
      const catResponse = yield axios.get(
        `/api/animal/search/${action.payload}`
      );
      yield put({ type: "SET_CAT_RESULT", payload: catResponse.data });
    } catch (error) {
      console.log("Error with GET CAT from redux: ", error);
    } finally {
      yield put({ type: "UNSET_LOADING" });
    }
  }

function* petfinderSaga() {
  yield takeEvery("FETCH_API", getAnimalsInMN);
  yield takeEvery("SET_SEARCH_RESULT", searchApi);
  yield takeLatest("SET_CAT_RESULT", dogResult);
  yield takeLatest("SET_DOG_RESULT", catResult);
}

export default petfinderSaga;
