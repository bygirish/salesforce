import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home.screen';
import Friends from '../screens/Friends/Friends.screen';
import Settings from '../screens/Settings/Settings.screen';
import FriendDetails from '../screens/FriendDetails/FriendDetails.screen';
import { NavigationRoutes, NavigationScreensParamList } from './ScreenParams';
import { navigationRef } from './Navigator';
import useSyncOfflineData from '../hooks/useSyncOfflineData';
import { Linking } from 'react-native';
import ImagePickerScreen from '../screens/ImagePicker/ImagePicker.screen';
import IonIcons, { ION_ICONS } from '../components/Icons/IonIcons';

const Stack = createNativeStackNavigator<NavigationScreensParamList>();
const Tab = createBottomTabNavigator<NavigationScreensParamList>();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={NavigationRoutes.HomeTab}
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }: any) => {
            return <IonIcons iconName={ION_ICONS.homeOutline} size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={NavigationRoutes.FriendsTab}
        component={Friends}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }: any) => {
            return <IonIcons iconName={ION_ICONS.peopleOutline} size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={NavigationRoutes.SettingsTab}
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }: any) => {
            return <IonIcons iconName={ION_ICONS.settingsOutline} size={25} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

const MainNavigation = () => {

  useSyncOfflineData(); 

  const DEEP_LINKS = {
    screens: {
      [NavigationRoutes.FriendDetails]: 'user/:userId',
    }
  };

  const linking: LinkingOptions<{}> = {
      prefixes: [
        "mysalesforceapp://",
      ],
      async getInitialURL() {
        const url = await Linking.getInitialURL();
        return url;
      },
      subscribe(listener: (arg0: string) => void) {
        const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
          listener(url);
        });

        return () => {
          // Clean up the event listeners
          linkingSubscription.remove();
        };

      },
      config: DEEP_LINKS
  };

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={NavigationRoutes.Dashboard}
          options={{ headerShown: false }}
          component={MyTabs}
        />
        <Stack.Screen
          name={NavigationRoutes.FriendDetails}
          options={{ headerShown: false }}
          component={FriendDetails}
        />
        <Stack.Screen 
          name={NavigationRoutes.ImagePickerScreen}
          options={{headerShown: false}}
          component={ImagePickerScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;



