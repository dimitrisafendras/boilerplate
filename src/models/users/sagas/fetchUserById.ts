import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchUserById,
  fetchUserByIdSuccess,
  fetchUserByIdFailure,
} from "../slice";
import type { User } from "@/common/types/user";
import { addNotification } from "@/models/notification";
import { fetchUserByIdApi } from "@/api/users";

export function* fetchUserByIdSaga(action: PayloadAction<string>) {
  try {
    const user: User = yield call(fetchUserByIdApi, action.payload);
    yield put(fetchUserByIdSuccess(user));
    yield put(
      addNotification({
        type: "success",
        message: `User ${user.name} fetched successfully`,
        duration: 3000,
      }),
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    yield put(fetchUserByIdFailure(errorMessage));
    yield put(
      addNotification({
        type: "error",
        message: `Failed to fetch user: ${errorMessage}`,
        duration: 5000,
      }),
    );
  }
}

export function* watchFetchUserById() {
  yield takeLatest(fetchUserById.type, fetchUserByIdSaga);
}
