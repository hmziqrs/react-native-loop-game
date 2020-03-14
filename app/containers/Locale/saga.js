import { takeLatest, call, put } from 'redux-saga/effects';

import { storage } from 'services';

import constants, { CACHE } from './constants';
import actions from './actions';

export const init = function* initSaga() {
  try {
    const cache = yield call(storage.getItem, CACHE.DATA);
    if (cache) {
      yield put(actions.change(cache));
    }
  } catch (e) {
    //
  }
};

export const change = function* changeSaga({ payload }) {
  try {
    yield call(storage.setItem, CACHE.DATA, payload);
  } catch (e) {
    //
  }
};

let didRun = false;
export default function* defaultSaga() {
  if (didRun) {
    return;
  }
  didRun = true;
  yield takeLatest(constants.INIT, init);
  yield takeLatest(constants.CHANGE, change);
}
