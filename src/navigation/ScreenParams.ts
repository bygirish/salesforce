import { UserType } from "../screens/Friends/types";


export const NavigationRoutes = {
    Dashboard: 'Dashbaord',
    HomeTab: 'Home',
    FriendsTab: 'Friends',
    SettingsTab: 'Settings',

    FriendDetails: 'FriendDetails',
    ImagePickerScreen: "ImagePickerScreen",

} as const;


export type NavigationScreensParamList = {
    
    [NavigationRoutes.FriendDetails]: {
        userId: string;
    },
    [NavigationRoutes.Dashboard]: undefined,

   
    [NavigationRoutes.SettingsTab]: undefined,
    [NavigationRoutes.FriendsTab]: undefined,
    [NavigationRoutes.HomeTab]: undefined,

    [NavigationRoutes.ImagePickerScreen]: undefined,


};


