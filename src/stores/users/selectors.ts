import { RootState } from "..";


export const usersSelector = (state: RootState) => state.users;
export const usersMapSelector = (state: RootState) => state.users.usersMap;
export const getUserByIdSelector = (state: RootState, userId: string) => state.users.usersMap[userId];


export const getFetchedUsersSelector = (state: RootState): string[] => state.users.users; 
export const isFetchingUsersSelector = (state: RootState): boolean => state.users.loaders.fetchUsers;
export const fetchUsersErrorSelector = (state: RootState): string =>  state.users.errors.fetchUsers;


export const isUpdatingUserSelector = (state: RootState): boolean => state.users.loaders.updateUser;
export const UpdateUserErrorSelector = (state: RootState): string =>  state.users.errors.updateUser;




