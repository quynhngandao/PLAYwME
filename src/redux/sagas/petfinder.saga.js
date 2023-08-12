import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

// Fetch from API for cats and dogs
function* getAnimalsInMN(action) {
  try {
    // Loading spinner while page loads
    yield put({ type: "SET_LOADING" });

    // Fetch for cats // dogs // rabbits
    if (action.payload === "cat") {
      const cat = action.payload;
      const catResponse = yield axios.get(
        `/api/animal?type/${cat}`
      );
      console.log("action.payload for CAT", catResponse);
      yield put({ type: "SET_CAT", payload: catResponse.data });
    } else if (action.payload === "dog") {
      const dog = action.payload;
      const dogResponse = yield axios.get(
        `/api/animal?type/${dog}`
      );
      console.log("action.payload for DOG", dogResponse);
      yield put({ type: "SET_DOG", payload: dogResponse.data });
    } else if (action.payload === "rabbit") {
      const rabbit = action.payload;
      const rabbitResponse = yield axios.get(
        `/api/animal?type/${rabbit}`
      );
      console.log("action.payload for RABBIT", rabbitResponse);
      yield put({ type: "SET_RABBIT", payload: rabbitResponse.data });
    } else {
      // Make the API call with a default search
      const response = yield axios.get(
        "/api/animal"
      );
      yield put({ type: "SET_ANIMAL", payload: response.data });
      console.log("action.payload for all", response);
    }
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
