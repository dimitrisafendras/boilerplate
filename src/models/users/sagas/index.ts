import { all, fork } from "redux-saga/effects";
import { watchFetchUsers } from "./fetchUsers";
import { watchFetchUserById } from "./fetchUserById";

export * from "./fetchUsers";
export * from "./fetchUserById";

export function* userSaga() {
  yield all([fork(watchFetchUsers), fork(watchFetchUserById)]);
}
