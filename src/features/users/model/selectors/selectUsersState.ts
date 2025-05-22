import type { RootState } from '@/app/store';

// Select the entire users state slice
export const selectUsersState = (state: RootState) => state.users;
