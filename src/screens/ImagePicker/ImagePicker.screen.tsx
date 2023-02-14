import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CommonScreenWrapper from '../../components/ScreenWrappers/CommonScreenWrapper';
import { StackNavigatorScreenPropsType } from '../../navigation/types';
import { NavigationRoutes } from '../../navigation/ScreenParams';
import useImagePicker from './useImagePicker';
import CommonButton from '../../components/Buttons/CommonButton';
import CommonScreenHeader from '../../components/ScreenHeaders/CommonScreenHeader';
import IconButton from '../../components/Buttons/IconButton';
import IonIcons, { ION_ICONS } from '../../components/Icons/IonIcons';
import Navigator from '../../navigation/Navigator';

type Props = StackNavigatorScreenPropsType<
  typeof NavigationRoutes.ImagePickerScreen
>;

const IMAGE_WIDTH = Dimensions.get('window').width * 0.5;
const IMAGE_HEIGHT = Dimensions.get('window').width * 0.5;

const ImagePickerScreen = (props: Props) => {
  const [imageURIs, openCamera, openGallery ] = useImagePicker();

  return (
    <CommonScreenWrapper contentContainerStyle={styles.contentContainer}
    
    header={
      <CommonScreenHeader
        headerTitle={"Image Pickers"}
        leftElement={
          <IconButton onPress={() => Navigator.goBack()}>
            <IonIcons iconName={ION_ICONS.chevronBackOutline} size={25} />
          </IconButton>
        }
      />
    }>
      <>
        <View style={styles.pickersContainer}>
          <CommonButton onPress={openCamera}>
            <Text>{'Camera'}</Text>
          </CommonButton>
          <CommonButton onPress={openGallery}>
            <Text>{'Gallery'}</Text>
          </CommonButton>
        </View>
        <FlatList
          data={imageURIs}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} />
          )}
          keyExtractor={item => item}
          numColumns={2}
        />
      </>
    </CommonScreenWrapper>
  );
};

export default ImagePickerScreen;

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    height: '100%',
  },
  pickersContainer: {
    marginVertical: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    margin: 5,
    borderWidth: 1,
    resizeMode: 'contain',
  },
});
