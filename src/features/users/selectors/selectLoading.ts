import type { RootState } from '@/app/store';

// Select the loading state
export const selectLoading = (state: RootState) => state.users.loading;
