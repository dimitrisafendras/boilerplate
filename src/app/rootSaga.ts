import { all, fork } from 'redux-saga/effects';
import { userSaga } from '@/models/users';
import { notificationSaga } from '@/models/notification';

export function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(notificationSaga),
    // Add more sagas here
  ]);
}
