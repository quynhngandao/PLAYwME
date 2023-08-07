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
    console.log("ACTION.PAYLOAD", action.payload);
    // Send the payload with the correct date_time format
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
    console.log(
      "Error with user's request of DELETE request from redux:",
      error
    );
  }
}

function* editRequest(action) {
  try {
    const animalIds = action.payload.animal_ids
    console.log("action.payload.id in saga", action.payload.id);
    console.log("animalIds in saga:", animalIds);
    // Perform multiple UPDATE queries for each animal ID
    for (const animalId of animalIds) {
      yield axios.put(`/request/${action.payload.id}`, {
        ...action.payload,
        animal_id: animalId, // Update one animal_id at a time
      });
    }
    console.log("animalId in sage", animalId)
    yield put({ type: "FETCH_REQUESTS" });
  } catch (error) {
    console.log("Error with user's request of PUT request from redux:", error);
  }
}

function* requestSaga() {
  yield takeEvery("FETCH_REQUESTS", fetchRequests);
  yield takeLatest("ADD_REQUEST", addRequest);
  yield takeLatest("SUBMIT_EDIT_REQUEST", editRequest);
}

export default requestSaga;
