import axios from "axios";
import { put, takeEvery, takeLatest } from "redux-saga/effects";

// Fetch from API
function* getAnimalsInMN(action) {
  try {
    // Make the API call
    const response = yield axios.get("/api/animal", {
      params: {
        location: "MN",
      },
    });
    yield put({ type: "SET_ANIMAL", payload: response.data });
  } catch (error) {
    console.log("Error with animals GET request from redux: ", error);
  }
}

// Fetch from Favorite
function* fetchAnimals() {
  try {
    const response = yield axios.get("/favorite");
    yield put({ type: "SET_FAVORITE", payload: response.data });
  } catch (error) {
    console.log("Error with animals GET request from redux: ", error);
  }
}

function* addAnimal(action) {
  try {
    const animalToAdd = yield axios.post("/favorite", action.payload);
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

function* animalSaga() {
  yield takeEvery("FETCH_API", getAnimalsInMN);
  yield takeLatest("FETCH_ANIMALS", fetchAnimals);
  yield takeLatest("ADD_ANIMAL", addAnimal);
  yield takeLatest("DELETE_ANIMAL", deleteAnimal);
}

export default animalSaga;