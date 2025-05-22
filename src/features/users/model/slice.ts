import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User, UserState } from '@/common/types/user';

const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsers: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.loading = false;
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchUserById: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
      // We need the action parameter for the saga, but we're not using it in the reducer
      void action;
    },
    fetchUserByIdSuccess: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
      state.loading = false;
    },
    fetchUserByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserById,
  fetchUserByIdSuccess,
  fetchUserByIdFailure,
} = userSlice.actions;

export default userSlice.reducer;
