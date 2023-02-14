import { UsersState } from "./types";
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { UserType } from "../../screens/Friends/types";

export const initialState: UsersState = {
    users: [],
    usersMap: {},
    loaders: {
        fetchUsers: false,
        updateUser: false,
    },
    errors: {
        fetchUsers: "",
        updateUser: ""
    }
};


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateUserAction: (state, action: PayloadAction<UserType>) => {
            const user: UserType = action.payload;
            state.loaders.updateUser = true;
            state.errors.updateUser = "";
            state.usersMap[user.Id] = {...user, isUserSynced: false};
        },

        updateUserSuccessAction: (state, action: PayloadAction<string>) => {
            console.log(" updateUserSuccessAction ");
            const updatedUserId = action.payload;
            state.loaders.updateUser = false;
            state.usersMap[updatedUserId] = {...state.usersMap[updatedUserId], isUserSynced: true};
        },

        updateUserFailAction: (state, action: PayloadAction<string>) => {
            console.log(" updateUserFailAction ");
            const updatedUserError = action.payload;
            state.loaders.updateUser = false;
            state.errors.updateUser = updatedUserError;
        },


        fetchUsersAction: (state, action: PayloadAction) => {
            state.loaders.fetchUsers = true;
            state.errors.fetchUsers = "";
        },

        fetchUsersSuccessAction: (state, action: PayloadAction<UserType[]>) => {
            const users = action.payload;

            const userIds: string[] = [];
            users.forEach((user: UserType) => {
                const userId = user.Id;
                userIds.push(userId);
                state.usersMap[userId] = {...user, isUserSynced: true};
            });

            state.users = userIds;
            state.loaders.fetchUsers = false;
        },

        fetchUsersFailAction: (state, action: PayloadAction<string>) => {
            const fetchUsersError = action.payload;
            state.loaders.fetchUsers = false;
            state.errors.fetchUsers = fetchUsersError;
        },
    },
});

const userReducer = usersSlice.reducer

export default userReducer;


