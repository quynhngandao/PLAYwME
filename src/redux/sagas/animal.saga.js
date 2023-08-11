import axios from "axios";
import { put, takeEvery, takeLatest } from "redux-saga/effects";

// Fetch from Favorite
function* fetchAnimals() {
  try {
    // Loading spinner while page loads
    yield put({ type: "SET_LOADING" });

    const response = yield axios.get("/favorite");
    yield put({ type: "SET_FAVORITE", payload: response.data });
  } catch (error) {
    console.log("Error with animals GET request from redux: ", error);
  } finally {
    yield put({ type: "UNSET_LOADING" });
  }
}

function* addAnimal(action) {
  try {
    yield axios.post("/favorite", action.payload);
    yield put({ type: "FETCH_ANIMALS" });
  } catch (error) {
    console.log("Error with animal POST request from redux", error);
  }
}

function* deleteAnimal(action) {
  try {
    yield axios.delete(`/favorite/${action.payload}`);
    yield put({ type: "FETCH_ANIMALS" });
  } catch (error) {
    console.log("Error with animal DELETE request from redux:", error);
  }
}

function* editRequest(action) {
  try {
    console.log("action.payload.id in animal saga", action.payload.id);

    yield axios.put(`/favorite/${action.payload.id}`, action.payload);

    yield put({ type: "FETCH_ANIMALS" });
  } catch (error) {
    console.log("Error with user's request of PUT request from redux:", error);
  }
}

function* animalSaga() {
  yield takeEvery("FETCH_ANIMALS", fetchAnimals);
  yield takeLatest("ADD_ANIMAL", addAnimal);
  yield takeLatest("DELETE_ANIMAL", deleteAnimal);
  yield takeLatest("SUBMIT_EDIT_REQUEST", editRequest);
}

export default animalSaga;
