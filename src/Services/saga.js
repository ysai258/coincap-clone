import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_DATA_REQUEST, fetchDataSuccess, fetchDataFailure } from './action';
import apiService from './apiService';

function* fetchData(action) {
  const { limit,offset } = action.payload;

  try {
    const data = yield call(apiService.fetchData, limit,offset);
    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error));
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_DATA_REQUEST, fetchData);
}
