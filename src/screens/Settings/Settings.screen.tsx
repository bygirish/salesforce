import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import { NavigationRoutes } from '../../navigation/ScreenParams';
import { BottomTabNavigatorPropsType } from '../../navigation/types';
import CommonScreenWrapper from '../../components/ScreenWrappers/CommonScreenWrapper';

type Props = BottomTabNavigatorPropsType<typeof NavigationRoutes.SettingsTab>;

const Settings = (props: Props) => {

  return (
    <CommonScreenWrapper contentContainerStyle={styles.contentContainer}>
      {
        <Text>{'Settings Screen'}</Text>
      }
    </CommonScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Settings;
