import { call, put, takeLatest } from 'redux-saga/effects';
import { getArticles } from '../service/articlesApi';
import { populateArticles } from '../actions/articlesActions';
import ActionTypes from '../constants/ActionTypes';

function* fetchArticles() {
  try {
    const articles = yield call(getArticles);
    yield put(populateArticles(articles));
  } catch (e) {
    yield put({ type: ActionTypes.FETCH_ARTICLES_FAILED, message: e.message });
  }
}

export default function* root() {
  yield takeLatest(ActionTypes.FETCH_ARTICLES_PENDING, ({ payload }) =>
    fetchArticles(payload),
  );
}
