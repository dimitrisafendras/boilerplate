import type { RootState } from '@/app/store';
import type { UserState } from '@/common/types/user';

// Select the selected user from the state
export const selectSelectedUser = (state: RootState) => (state.users as UserState).selectedUser;
