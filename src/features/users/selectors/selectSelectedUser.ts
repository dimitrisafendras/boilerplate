import type { RootState } from '@/app/store';

// Select the selected user from the state
export const selectSelectedUser = (state: RootState) => state.users.selectedUser;
