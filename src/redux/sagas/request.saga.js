import axios from "axios";
import { put, takeEvery, takeLatest } from "redux-saga/effects";

// Fetch from user's request 
function* fetchRequests() {
  try {
    // Loading spinner while page loads
    yield put({ type: "SET_LOADING" });

    const response = yield axios.get("/request");
    yield put({ type: "SET_REQUEST", payload: response.data });
  } catch (error) {
    console.log("Error with user's request of GET request from redux: ", error);
  } finally {
    yield put({ type: "UNSET_LOADING" });
  }
}

function* addRequest(action) {
  try {
    yield axios.post("/request", action.payload);
    yield put({ type: "FETCH_REQUESTS" });
  } catch (error) {
    console.log("Error with user's request of POST request from redux", error);
  }
}

function* deleteRequest(action) {
  try {
    yield axios.delete(`/request/${action.payload}`);
    yield put({ type: "FETCH_REQUESTS" });
  } catch (error) {
    console.log("Error with user's request of DELETE request from redux:", error);
  }
}

// function* editRequest(action)


function* requestSaga() {
  yield takeEvery("FETCH_REQUESTS", fetchRequests);
  yield takeLatest("ADD_REQUEST", addRequest);
  yield takeLatest("DELETE_REQUEST", deleteRequest);
//   yield takeLatest("EDIT_REQUEST", editRequest);
}

export default requestSaga;
