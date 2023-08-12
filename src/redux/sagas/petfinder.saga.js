import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

// Fetch animals based on type (e.g., dog, cat, rabbit)
function* getAnimalsByType(action) {
  try {
    // Loading spinner while page loads
    yield put({ type: "SET_LOADING" });

    if (!action.payload) {
      // Fetch all animals
      const response = yield axios.get("/api/animal?limit=20&location=MN");
      yield put({ type: "SET_ANIMAL", payload: response.data });
      console.log("action.payload for SET_ALL", response.data);
    } else if (action.payload === "cat") {
      // Fetch animals based on type
      const cat = yield axios.get(`/api/animal/cat?type=${action.payload}`);
      yield put({
        type: "SET_RESULT",
        payload: cat.data,
      });
      console.log("action.payload for SET_TYPE FOR CAT", cat.data);
    } else if (action.payload === "dog") {
      // Fetch animals based on type
      const dog = yield axios.get(`/api/animal/dog?type=${action.payload}`);
      yield put({
        type: "SET_RESULT",
        payload: dog.data,
      });
      console.log("action.payload for SET_TYPE FOR DOG", dog.data);
    } else if (action.payload === "rabbit") {
      // Fetch animals based on type
      const rabbit = yield axios.get(
        `/api/animal/rabbit?type=${action.payload}`
      );
      yield put({
        type: "SET_RESULT",
        payload: rabbit.data,
      });
      console.log("action.payload for SET_TYPE FOR RABBIT", rabbit.data);
    }
  } catch (error) {
    console.log("Error with animals GET request from redux: ", error);
  } finally {
    yield put({ type: "UNSET_LOADING" });
  }
}

// function* getAnimalsByType(action) {
//   try {
//     // Loading spinner while page loads
//     yield put({ type: "SET_LOADING" });

//     let response;

//     if (!action.payload) {
//       // Fetch all animals
//       response = yield axios.get("/api/animal?limit=20&location=MN");
//     } else {
//       // Fetch animals based on type
//       response = yield axios.get(`/api/animal/${action.payload}?type=${action.payload}`);
//     }

//     yield put({ type: "SET_TYPE", payload: { type: action.payload, data: response.data } });
//     console.log(`action.payload for ${action.payload.toUpperCase()}`, response.data);

//   } catch (error) {
//     console.log("Error with animals GET request from redux: ", error);
//   } finally {
//     yield put({ type: "UNSET_LOADING" });
//   }
// }


function* petfinderSaga() {
  yield takeEvery("FETCH_ALL", getAnimalsByType);
  yield takeEvery("FETCH_TYPE", getAnimalsByType);
}

export default petfinderSaga;
