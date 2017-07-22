import { createAction } from 'redux-actions';
import ActionTypes from '../constants/ActionTypes';

export const fetchArticles = createAction(ActionTypes.FETCH_ARTICLES_PENDING);
export const populateArticles = createAction(
  ActionTypes.FETCH_ARTICLES_SUCCEEDED,
);
