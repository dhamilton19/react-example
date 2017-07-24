import ActionTypes from '../constants/ActionTypes';

const initialState = {
  query: 'Space',
  isSearchInFlight: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_SEARCH_QUERY:
      return { ...state, query: action.payload };
    case ActionTypes.FETCH_ARTICLES_PENDING:
      return { ...state, isSearchInFlight: true };
    case ActionTypes.FETCH_ARTICLES_SUCCEEDED:
    case ActionTypes.FETCH_ARTICLES_FAILED:
      return { ...state, isSearchInFlight: false };
    default:
      return state;
  }
};
