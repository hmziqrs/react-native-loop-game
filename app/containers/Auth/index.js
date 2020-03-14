import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';

import actions from './actions';

const selector = createSelector(
  (state) => state.get('auth'),
  (subState) => subState.toJS(),
);

export default function useAuth() {
  const auth = useSelector(selector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.init && !auth.loading) {
      dispatch(actions.init());
    }
  });

  return {
    ...auth,
    signIn: (p) => dispatch(actions.signIn(p)),
    signUp: (p) => dispatch(actions.signUp(p)),
    signOut: (p) => dispatch(actions.signOut(p)),
  };
}
