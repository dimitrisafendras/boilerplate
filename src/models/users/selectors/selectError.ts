import type { RootState } from '@/app/store';
import type { UserState } from '@/common/types/user';

// Select the error state
export const selectError = (state: RootState) => (state.users as UserState).error;
