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
  } catch (error) {
    yield put(fetchUsersFailure(error instanceof Error ? error.message : 'An unknown error occurred'));
  }
}

function* fetchUserByIdSaga(action: PayloadAction<string>) {
  try {
    const user: User = yield call(fetchUserByIdApi, action.payload);
    yield put(fetchUserByIdSuccess(user));
  } catch (error) {
    yield put(fetchUserByIdFailure(error instanceof Error ? error.message : 'An unknown error occurred'));
  }
}

export function* userSaga() {
  yield takeLatest(fetchUsers.type, fetchUsersSaga);
  yield takeLatest(fetchUserById.type, fetchUserByIdSaga);
}
