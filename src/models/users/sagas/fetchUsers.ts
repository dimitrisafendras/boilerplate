import { call, put, takeLatest } from "redux-saga/effects";
import { fetchUsers, fetchUsersSuccess, fetchUsersFailure } from "../slice";
import type { User } from "@/common/types/user";
import { addNotification } from "@/models/notification";
import { fetchUsersApi } from "@/api/users";

export function* fetchUsersSaga() {
  try {
    const users: User[] = yield call(fetchUsersApi);
    yield put(fetchUsersSuccess(users));
    yield put(
      addNotification({
        type: "success",
        message: "Users fetched successfully",
        duration: 3000,
      }),
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    yield put(fetchUsersFailure(errorMessage));
    yield put(
      addNotification({
        type: "error",
        message: `Failed to fetch users: ${errorMessage}`,
        duration: 5000,
      }),
    );
  }
}

export function* watchFetchUsers() {
  yield takeLatest(fetchUsers.type, fetchUsersSaga);
}
