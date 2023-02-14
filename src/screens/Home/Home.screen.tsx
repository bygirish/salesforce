import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import { NavigationRoutes } from '../../navigation/ScreenParams';
import { BottomTabNavigatorPropsType } from '../../navigation/types';
import CommonScreenWrapper from '../../components/ScreenWrappers/CommonScreenWrapper';
import Navigator from '../../navigation/Navigator';
import CommonButton from '../../components/Buttons/CommonButton';

type Props = BottomTabNavigatorPropsType<typeof NavigationRoutes.HomeTab>;

const Home = (props: Props) => {

  const navigateToImagePickerScreen = () => Navigator.navigate(NavigationRoutes.ImagePickerScreen);

  return (
    <CommonScreenWrapper contentContainerStyle={styles.contentContainer}>
      <>
      <Text>{'Home Screen'}</Text>
      <CommonButton onPress={navigateToImagePickerScreen} style={styles.imagePickerContaier}>
        <Text>{"Go to Image picker"}</Text>
      </CommonButton>
      </>
    </CommonScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePickerContaier: {
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1
  },
});

export default Home;
