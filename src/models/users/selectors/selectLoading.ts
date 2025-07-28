import type { RootState } from '@/app/store';
import type { UserState } from '@/common/types/user';

// Select the loading state
export const selectLoading = (state: RootState) => (state.users as UserState).loading;
