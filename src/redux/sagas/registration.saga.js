import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    yield put({ type: "CLEAR_REGISTRATION_ERROR" });

    // Register the user
    yield axios.post("/api/user/register", action.payload);

    // Login the user
    yield put({ type: "LOGIN", payload: action.payload });

    // After successful registration and login,
    // trigger a saga to update the new user status
    yield put({ type: "UPDATE_NEW_USER_STATUS", payload: true });
  } catch (error) {
    console.log("Error with user registration:", error);
    yield put({ type: "REGISTRATION_FAILED" });
  }
}

function* registrationSaga() {
  yield takeLatest("REGISTER", registerUser);
}

function* updateNewUserStatus(action) {
  try {
    // Dispatch action to update user's new user status
    yield put({ type: "SET_NEW_USER_STATUS", payload: action.payload });

    if (action.payload) {
      // If the user is new, redirect to Petfinder page
      yield put({ type: "REDIRECT_TO_PETFINDER" });
    } else {
      // If the user is returning, redirect to User page
      yield put({ type: "REDIRECT_TO_USER" });
    }
  } catch (error) {
    console.log("Error updating new user status:", error);
  }
}

function* userStatusSaga() {
  yield takeLatest("UPDATE_NEW_USER_STATUS", updateNewUserStatus);
}

export default registrationSaga;
