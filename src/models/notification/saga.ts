import { put, takeEvery, delay } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import { addNotification, removeNotification } from './slice';
import type { Notification } from '@/common/types/notification';

// Auto-dismiss notifications after their duration
function* autoDismissNotification(action: PayloadAction<Notification>) {
  const { id, duration } = action.payload;

  // Only auto-dismiss if duration is specified
  if (duration) {
    yield delay(duration);
    yield put(removeNotification(id));
  }
}

export function* notificationSaga() {
  yield takeEvery(addNotification.type, autoDismissNotification);
}
