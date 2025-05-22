import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { fetchUsers, fetchUserById } from '../slice';
import { selectUsers, selectSelectedUser, selectLoading, selectError } from '../selectors';

export const useUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const selectedUser = useSelector(selectSelectedUser);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const getUsers = useCallback(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const getUserById = useCallback((id: string) => {
    dispatch(fetchUserById(id));
  }, [dispatch]);

  return {
    users,
    selectedUser,
    loading,
    error,
    getUsers,
    getUserById,
  };
};
