import { createSelector } from 'reselect';

import { useSelector, useDispatch } from 'react-redux';
import actions from './actions';

const selector = createSelector(
  (state) => state.get('locale'),
  (subState) => subState.toJS(),
);

function Locale() {
  const locale = useSelector(selector);
  const dispatch = useDispatch();

  return {
    ...locale,
    init: (p) => dispatch(actions.init(p)),
    change: (p) => dispatch(actions.change(p)),
  };
}
export default Locale;
