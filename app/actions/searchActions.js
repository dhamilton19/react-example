import { createAction } from 'redux-actions';
import ActionTypes from '../constants/ActionTypes';

export const updateQuery = createAction(ActionTypes.UPDATE_SEARCH_QUERY);
