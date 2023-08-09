import axios from "axios";
import { put, takeEvery, takeLatest } from "redux-saga/effects";

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
    yield put({ type: "SET_TOTAL_PAGES", payload: response.data.pagination.total_pages });
    yield put({ type: "SET_CURRENT_PAGE", payload: response.data.pagination.current_page });
    yield put({ type: "SET_COUNT_PER_PAGE", payload: response.data.pagination.count_per_page})
  } catch (error) {
    console.log("Error with animals GET request from redux: ", error);
  } finally {
    yield put({ type: "UNSET_LOADING" });
  }
}

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

function* animalSaga() {
  yield takeEvery("FETCH_API", getAnimalsInMN);
  yield takeEvery("FETCH_ANIMALS", fetchAnimals);
  yield takeLatest("ADD_ANIMAL", addAnimal);
  yield takeLatest("DELETE_ANIMAL", deleteAnimal);
}

export default animalSaga;
