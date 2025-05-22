import type { RootState } from '@/app/store';
import type { UserState } from '@/common/types/user';

// Select the entire users state slice
export const selectUsersState = (state: RootState) => state.users as UserState;
