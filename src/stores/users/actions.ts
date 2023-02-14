import store, { AppDispatch, AppThunk, RootState } from "..";
import { UserType } from "../../screens/Friends/types";
import { useAppDispatch } from "../hooks";
import { usersSlice } from "./reducer";
import { usersMapSelector } from "./selectors";

// Actions generated from the user slice
const {
    updateUserAction,
    updateUserFailAction,
    updateUserSuccessAction,
    fetchUsersAction,
    fetchUsersSuccessAction,
    fetchUsersFailAction
} = usersSlice.actions;


export {
    updateUserAction,
    updateUserFailAction,
    updateUserSuccessAction,
    fetchUsersAction,
    fetchUsersSuccessAction,
    fetchUsersFailAction
};


export const fetchUsers = (): AppThunk => async (dispatch: AppDispatch,) => {
    try {
        dispatch(fetchUsersAction());
        const response = await fetch(
            'https://rnapp-mock-developer-edition.ap24.force.com/services/apexrest/apiservice',
        );
        const data: UserType[] = await response.json();
        dispatch(fetchUsersSuccessAction(data));
    } catch (error) {
        dispatch(fetchUsersFailAction(String(error)));
    }
};


export const updateUser = (user: UserType): AppThunk => async (dispatch: AppDispatch,) => {
    delete(user.isUserSynced);
    try {
        dispatch(updateUserAction(user));
        const response = await fetch('https://rnapp-mock-developer-edition.ap24.force.com/services/apexrest/apiservice', {
            method: 'POST',
            body: JSON.stringify([user]), 
        });
        const data: any = await response.json();
        if(data?.[0].errorCode) {
            throw new Error(data?.[0].message)
        }
        dispatch(updateUserSuccessAction(user.Id));
    } catch (error) {
        dispatch(updateUserFailAction(String(error)));
    }
};



export const syncUsers = (): AppThunk => async (dispatch: AppDispatch) => {
    console.log("Syncing users...");
    try {
        const rootState: RootState =  store.getState();
        const usersMap = usersMapSelector(rootState);
        Object.keys(usersMap).forEach((userId: string) => {
            const user = usersMap[userId];
            if(!user.isUserSynced) {
                console.log(`Syncing users ${user.First_Name__c}`);
                dispatch(updateUser(user));
            }
        });
    } catch (error) {

    }
};



