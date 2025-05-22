import { all, fork } from 'redux-saga/effects';
import { userSaga } from '@/features/users/model';

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    // Add more sagas here
  ]);
}
