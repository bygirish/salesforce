import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationRoutes, NavigationScreensParamList } from "./ScreenParams";



export type StackNavigatorScreenPropsType<T extends keyof typeof NavigationRoutes> = NativeStackScreenProps<NavigationScreensParamList, typeof NavigationRoutes[T]>;

export type BottomTabNavigatorPropsType<T extends keyof typeof NavigationRoutes> = BottomTabScreenProps<NavigationScreensParamList, typeof NavigationRoutes[T]>;


