import { takeLatest, call, put } from 'redux-saga/effects';
import { storage } from 'rn-hgl/services';

import constants, { CACHE } from './constants';
import actions from './actions';
import * as api from './api';

const init = function* initSaga() {
  try {
    const data = yield call(storage.getItem, CACHE.AUTH_TOKEN);
    yield put(actions.initSuccess(data));
  } catch (e) {
    yield put(actions.initFailure(e));
  }
};

const signIn = function* signInSaga({ payload }) {
  try {
    const { success, data } = yield call(api.signIn, payload);
    if (success) {
      yield call(storage.setItem, CACHE.AUTH_TOKEN, data);
      yield put(actions.signInSuccess(data));
    } else {
      yield put(actions.signInFailure());
    }
  } catch (e) {
    yield put(actions.signInFailure(e));
  }
};

const signUp = function* signUpSaga({ payload }) {
  try {
    const { success, data } = yield call(api.signUp, payload);
    if (success) {
      yield call(storage.setItem, CACHE.AUTH_TOKEN, data);
      yield put(actions.signUpSuccess(data));
    } else {
      yield put(actions.signUpFailure());
    }
  } catch (e) {
    yield put(actions.signUpFailure(e));
  }
};

const signOut = function* signOutSaga() {
  try {
    yield call(storage.removeItem, CACHE.AUTH_TOKEN);
    yield put(actions.signOutSuccess());
  } catch (e) {
    yield put(actions.signOutFailure(e));
  }
};

let didRun = false;
export const defaultAuthSaga = function* defaultAuthSaga() {
  if (didRun) {
    return;
  }
  didRun = true;
  yield takeLatest(constants.INIT, init);
  yield takeLatest(constants.SIGN_IN, signIn);
  yield takeLatest(constants.SIGN_UP, signUp);
  yield takeLatest(constants.SIGN_OUT, signOut);
};

export default defaultAuthSaga;
