import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { fetchUsers } from '../../stores/users/actions';
import {
  fetchUsersErrorSelector,
  getFetchedUsersSelector,
  isFetchingUsersSelector,
} from '../../stores/users/selectors';

const useGetUsers = (): [string[], boolean, string, () => void] => {
  const dispatch = useAppDispatch();

  const userIds = useAppSelector(getFetchedUsersSelector);
  const isLoadingUsers = useAppSelector(isFetchingUsersSelector);
  const error = useAppSelector(fetchUsersErrorSelector);

  const fetchUsersData = useCallback(() =>{ dispatch(fetchUsers()) }, [dispatch]);

  useEffect(() => {
    fetchUsersData();
  }, []);

  return [userIds, isLoadingUsers, error, fetchUsersData];
};

export default useGetUsers;

