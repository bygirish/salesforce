import { useState } from 'react';
import ImagePicker, {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';

const useImagePicker = (): [string[], () => void, () => void] => {

    const [imageURIs, setImageURIs] = useState<string[]>([]);

    const openCamera = () => {
        let options: CameraOptions = {
          mediaType: 'photo',
        };
        console.log('ImagePicker', ImagePicker);
    
        launchCamera(options, (response: ImagePickerResponse) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorMessage) {
            console.log('ErroeMessage: ', response.errorMessage);
          } else {
            const assets: ImagePicker.Asset[] | undefined = response.assets;
            console.log('assets', assets);
            const imageProps = assets?.[0];
            if (imageProps) {
              const { uri } = imageProps;
    
              if (uri) setImageURIs([...imageURIs, uri]);
            }
          }
        });
      };
    
      const openGallery = () => {
        let options: ImageLibraryOptions = {
          selectionLimit: 1,
          mediaType: 'photo',
        };
        console.log('ImagePicker', ImagePicker);
    
        launchImageLibrary(options, (response: ImagePickerResponse) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorMessage) {
            console.log('ErroeMessage: ', response.errorMessage);
          } else {
            const assets: ImagePicker.Asset[] | undefined = response.assets;
            console.log('assets', assets);
            const imageProps = assets?.[0];
            if (imageProps) {
              const { uri } = imageProps;
    
              if (uri) setImageURIs([...imageURIs, uri]);
            }
          }
        });
      };

    return [imageURIs, openCamera, openGallery];
}

export default useImagePicker;
