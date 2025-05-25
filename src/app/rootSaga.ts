import { all, fork } from 'redux-saga/effects';
import { userSaga } from '@/features/users/model';
import { notificationSaga } from '@/common/features/notification/model';

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(notificationSaga),
    // Add more sagas here
  ]);
}
