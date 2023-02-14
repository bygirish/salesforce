import React from "react";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { updateUser } from "../../stores/users/actions";
import { isUpdatingUserSelector, UpdateUserErrorSelector } from "../../stores/users/selectors";
import { UserType } from "../Friends/types";
import { useCallback } from "react";

const useUpdateUser = () : [boolean, string, (user: UserType) => void]=> {
    const dispatch = useAppDispatch();
    
    const isUpdatingUsers = useAppSelector(isUpdatingUserSelector);
    const error = useAppSelector(UpdateUserErrorSelector);


    const updateUserData = useCallback((user: UserType) => dispatch(updateUser(user)) , [dispatch]);

    return [isUpdatingUsers, error, updateUserData];
}

export default useUpdateUser;
