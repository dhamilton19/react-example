import { combineReducers } from 'redux';

import articles from './articlesReducer';
import header from './headerReducer';

export default combineReducers({
  articles,
  header,
});
