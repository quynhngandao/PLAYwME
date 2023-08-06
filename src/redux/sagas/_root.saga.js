import { all } from 'redux-saga/effects';
import animalSaga from './animal.saga';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import requestsSaga from './request.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
// the user triggers getting the user
// the animal triggers getting and setting the animal 
// the request triggers getting and setting the request

export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    animalSaga(),
    requestsSaga()
  ]);
}