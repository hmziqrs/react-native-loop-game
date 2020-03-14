import { combineReducers } from 'redux-immutable';

import locale from 'containers/Locale/reducer';
import auth from 'containers/Auth/reducer';

export default function createReducer(injectedReducers) {
  return combineReducers({
    auth,
    locale,
    ...injectedReducers,
  });
}
