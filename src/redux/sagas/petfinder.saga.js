import axios from "axios";
import { put, takeEvery, takeLatest } from "redux-saga/effects";

// Fetch from API for cats and dogs
function* getAnimalsInMN(action) {
  try {
    // Loading spinner while page loads
    yield put({ type: "SET_LOADING" });
    // Make the API call
    const response = yield axios.get("/api/animal");
    yield put({ type: "SET_ANIMAL", payload: response.data });
  } catch (error) {
    console.log("Error with animals GET request from redux: ", error);
  } finally {
    yield put({ type: "UNSET_LOADING" });
  }
}

function* petfinderSaga() {
  yield takeEvery("FETCH_API", getAnimalsInMN);
}

export default petfinderSaga;
