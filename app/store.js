/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';

import authSagas from 'containers/Auth/saga';

import createReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
  const enhancers = [applyMiddleware(sagaMiddleware)];

  // eslint-disable-next-line
  const composeEnhancers = __DEV__ ? composeWithDevTools : compose;

  const store = createStore(createReducer(), fromJS(initialState), composeEnhancers(...enhancers));

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {};
  store.injectedSagas = {};
  sagaMiddleware.run(authSagas);

  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     store.replaceReducer(createReducer(store.injectedReducers));
  //   });
  // }

  return store;
}
