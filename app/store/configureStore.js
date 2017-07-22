import 'regenerator-runtime/runtime';

import { applyMiddleware, createStore } from 'redux';

import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/root';
import rootSaga from '../sagas/root';

const sagaMiddleware = createSagaMiddleware();
let middleware;

if (__DEV__) {
  middleware = applyMiddleware(sagaMiddleware, createLogger());
} else {
  middleware = applyMiddleware(sagaMiddleware);
}

export default function configureStore(initialState = {}) {
  const store = {
    ...createStore(rootReducer, initialState, middleware),
  };

  sagaMiddleware.run(rootSaga);

  return store;
}
