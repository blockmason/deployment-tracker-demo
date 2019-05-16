import ActionReducers from './action-reducers';

const reducer = (initialState = {}) => (state = initialState, action) => {
  const { [action.type]: actionReducer } = ActionReducers;

  if (actionReducer) {
    return actionReducer(state, action);
  }

  return state;
};

export default reducer;
