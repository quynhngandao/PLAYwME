import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

// Fetch from API for cats and dogs
function* getAnimalsInMN(action) {
  try {
    // Loading spinner while page loads
    yield put({ type: "SET_LOADING" });

    let response;

    if (!action.payload) {
      // Fetch all animals
      response = yield axios.get("/api/animal");
      yield put({ type: "SET_ANIMAL", payload: response.data });
      console.log("action.payload for ALLLLLLLLLLLLL", response.data);

      // } else if (action.payload === "rabbit") {
      //   rabbitResponse = yield axios.get(`/api/animal/rabbit?type=${action.payload}`);
      //   yield put({ type: "SET_RABBIT", payload: rabbitResponse.data });
      //   console.log("action.payload for all", dogResponse.data);
      //   (action.payload === "cat") {
      //   response = yield axios.get(`/api/animal/cat?type=${action.payload}`);
      //   yield put({ type: "SET_CAT", payload: response.data });
      // (action.payload === "dog") {
      //   response = yield axios.get(`/api/animal/dog?type=${action.payload}`);
      //   yield put({ type: "SET_DOG", payload: response.data });
      // }

    } else if (action.payload === "cat") {
      const catResponse = yield axios.get(
        `/api/animal/cat?species=${action.payload}`
      );
      yield put({ type: "SET_CAT", payload: catResponse.data });
      console.log("action.payload for CAT", catResponse.data);

    } else if (action.payload === "dog") {
      const dogResponse = yield axios.get(
        `/api/animal/dog?species=${action.payload}`
      );
      yield put({ type: "SET_DOG", payload: dogResponse.data });
      console.log("action.payload for DOG", dogResponse.data);

    } else if (action.payload === "rabbit") {
      const rabbitResponse = yield axios.get(
        `/api/animal/rabbit?species=${action.payload}`
      );
      yield put({ type: "SET_RABBIT", payload: rabbitResponse.data });
      console.log("action.payload for RABBIT", rabbitResponse.data);

    }
  } catch (error) {
    console.log("Error with animals GET request from redux: ", error);
  } finally {
    yield put({ type: "UNSET_LOADING" });
  }
}

// Fetch dogs
// function* getDogs(action) {
//   try {
//     // Loading spinner while page loads
//     yield put({ type: "SET_LOADING" });

//     if (action.payload === "dog") {
//       const response = yield axios.get(`/api/animal?type=${action.payload}`);
//       yield put({ type: "SET_DOG", payload: response.data });
//     }
//   } catch (error) {
//     console.log("Error with GET DOG request from redux: ", error);
//   } finally {
//     yield put({ type: "UNSET_LOADING" });
//   }
// }

// Fetch cats
// function* getCats(action) {
//   try {
//     // Loading spinner while page loads
//     yield put({ type: "SET_LOADING" });

//     if (action.payload === "cat") {
//       const response = yield axios.get(`/api/animal?type=${action.payload}`);
//       yield put({ type: "SET_CAT", payload: response.data });
//     }
//   } catch (error) {
//     console.log("Error with GET CAT request from redux: ", error);
//   } finally {
//     yield put({ type: "UNSET_LOADING" });
//   }
// }

// Fetch rabbits
// function* getRabbits(action) {
//   try {
//     // Loading spinner while page loads
//     yield put({ type: "SET_LOADING" });

//     if (action.payload === "rabbit") {
//       const response = yield axios.get(`/api/animal?type=${action.payload}`);
//       yield put({ type: "SET_RABBIT", payload: response.data });}
//     }
//   } catch (error) {
//     console.log("Error with GET RABBIT request from redux: ", error);
//   } finally {
//     yield put({ type: "UNSET_LOADING" });
//   }
// }

function* petfinderSaga() {
  yield takeEvery("FETCH_ALL", getAnimalsInMN);
  // yield takeEvery("FETCH_TYPE", getDogs);
  // yield takeEvery("FETCH_TYPE", getRabbits);
  // yield takeEvery("FETCH_TYPE", getCats);
}

export default petfinderSaga;
