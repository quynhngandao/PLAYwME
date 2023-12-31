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
    console.log("Error with GET request in redux: ", error);
  } finally {
    yield put({ type: "UNSET_LOADING" });
  }
}

function* addRequest(action) {
  try {
    console.log("ACTION.PAYLOAD", action.payload);
    // Send the payload with the correct date_time format
    yield axios.post("/request", action.payload);
    yield put({ type: "FETCH_REQUESTS" });
  } catch (error) {
    console.log("Error with POST request in redux", error);
  }
}

function* deleteRequest(action) {
  try {
    yield axios.delete(`/request/${action.payload}`);
    yield put({ type: "FETCH_REQUESTS" });
  } catch (error) {
    console.log(
      "Error with DELETE request in redux:",
      error
    );
  }
}

function* editRequest(action) {
  try {
    console.log("action.payload.id in saga", action.payload.id);

    yield axios.put(`/request/${action.payload.id}`, action.payload);

    yield put({ type: "FETCH_REQUESTS" });
  } catch (error) {
    console.log("Error with user's request of PUT request from redux:", error);
  }
}

function* requestSaga() {
  yield takeEvery("FETCH_REQUESTS", fetchRequests);
  yield takeLatest("ADD_REQUEST", addRequest);
  yield takeLatest("SUBMIT_EDIT_REQUEST", editRequest);
  yield takeLatest('DELETE_REQUEST', deleteRequest)
}

export default requestSaga;
