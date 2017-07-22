import { all } from 'redux-saga/effects';

import articles from './articlesSagas';

export default function* () {
  yield all([articles()]);
}
