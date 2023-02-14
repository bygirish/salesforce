import { UserType } from "../../screens/Friends/types";

export type UsersState = {
    users: string[];
    usersMap: {[key: string]: UserType };
    loaders: {
        fetchUsers: boolean;
        updateUser: boolean;
    };
    errors: {
        fetchUsers: string;
        updateUser: string;
    }
};

