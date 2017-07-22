import ActionTypes from '../constants/ActionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_ARTICLES_SUCCEEDED:
      return action.payload;
    default:
      return state;
  }
};
