import type { RootState } from '@/app/store';

// Select the error state
export const selectError = (state: RootState) => state.users.error;
