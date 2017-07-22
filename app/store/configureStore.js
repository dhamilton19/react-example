import { applyMiddleware, createStore } from 'redux';

import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
let middleware;

const enableLogger = false;

if (__DEV__ || enableLogger) {
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
