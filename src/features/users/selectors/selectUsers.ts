import type { RootState } from '@/app/store';

// Select all users from the state
export const selectUsers = (state: RootState) => state.users.users;
