import { call, put, takeLatest } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserById,
  fetchUserByIdSuccess,
  fetchUserByIdFailure,
} from './slice';
import type { User } from '@/common/types/user';
import { API_BASE_URL } from '@/common/utils/env';
import { addNotification } from '@/models/notification';

// API calls would normally be in a separate file, but for simplicity, we'll define them here
const fetchUsersApi = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

const fetchUserByIdApi = async (id: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user with id ${id}`);
  }
  return response.json();
};

function* fetchUsersSaga() {
  try {
    const users: User[] = yield call(fetchUsersApi);
    yield put(fetchUsersSuccess(users));
    yield put(addNotification({
      type: 'success',
      message: 'Users fetched successfully',
      duration: 3000
    }));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(fetchUsersFailure(errorMessage));
    yield put(addNotification({
      type: 'error',
      message: `Failed to fetch users: ${errorMessage}`,
      duration: 5000
    }));
  }
}

function* fetchUserByIdSaga(action: PayloadAction<string>) {
  try {
    const user: User = yield call(fetchUserByIdApi, action.payload);
    yield put(fetchUserByIdSuccess(user));
    yield put(addNotification({
      type: 'success',
      message: `User ${user.name} fetched successfully`,
      duration: 3000
    }));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(fetchUserByIdFailure(errorMessage));
    yield put(addNotification({
      type: 'error',
      message: `Failed to fetch user: ${errorMessage}`,
      duration: 5000
    }));
  }
}

export function* userSaga() {
  yield takeLatest(fetchUsers.type, fetchUsersSaga);
  yield takeLatest(fetchUserById.type, fetchUserByIdSaga);
}
