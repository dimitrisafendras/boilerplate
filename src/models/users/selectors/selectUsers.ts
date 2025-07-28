import type { RootState } from '@/app/store';
import type { UserState } from '@/common/types/user';

// Select all users from the state
export const selectUsers = (state: RootState) => (state.users as UserState).users;
