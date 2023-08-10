import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from './reducers/_root.reducer'; // imports ./redux/reducers/index.js
import rootSaga from './sagas/_root.saga'; // imports ./redux/sagas/index.js
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'petfinder',
  storage,
  whitelist: ['petfinder'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


// this line creates an array of all of redux middleware you want to use
// we don't want a whole ton of console logs in our production code
// logger will only be added to your project if your in development mode
const middlewareList = process.env.NODE_ENV === 'development' ?
  [sagaMiddleware, logger] :
  [sagaMiddleware];

const store = createStore(
  persistedReducer,
  // tells the saga middleware to use the rootReducer
  // rootSaga contains all of our other reducers

  // adds all middleware to our project including saga and logger
  applyMiddleware(...middlewareList),
);


// tells the saga middleware to use the rootSaga
// rootSaga contains all of our other sagas
sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export  { store, persistor }