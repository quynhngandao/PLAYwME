import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

// Fetch animals based on type
function* getAnimalsByType(action) {
  try {
    // Loading spinner while page loads
    yield put({ type: "SET_LOADING" });

    if (!action.payload) {
      // Fetch all animals
      const response = yield axios.get("/api/animal");
      yield put({ type: "SET_ANIMAL", payload: response.data });
    } else if (action.payload === "cat") {
      // Fetch cat
      const cat = yield axios.get(`/api/animal/cat?type=${action.payload}`);
      yield put({
        type: "SET_SEARCH_RESULT",
        payload: cat.data,
      });
    } else if (action.payload === "dog") {
      // Fetch dog
      const dog = yield axios.get(`/api/animal/dog?type=${action.payload}`);
      yield put({
        type: "SET_SEARCH_RESULT",
        payload: dog.data,
      });
    } else if (action.payload === "rabbit") {
      // Fetch rabbit
      const rabbit = yield axios.get(
        `/api/animal/rabbit?type=${action.payload}`
      );
      yield put({
        type: "SET_SEARCH_RESULT",
        payload: rabbit.data,
      });
    } else if (action.payload === "bird") {
      // Fetch bird
      const bird = yield axios.get(
        `/api/animal/bird?type=${action.payload}`
      );
      yield put({
        type: "SET_SEARCH_RESULT",
        payload: bird.data,
      });
    }
  } catch (error) {
    console.log("Error with animals GET request from redux: ", error);
  } finally {
    yield put({ type: "UNSET_LOADING" });
  }
}

function* petfinderSaga() {
  yield takeEvery("FETCH_ALL", getAnimalsByType); // fetch for all animals
  yield takeEvery("FETCH_TYPE", getAnimalsByType); // fetch for animal type 
}

export default petfinderSaga;
