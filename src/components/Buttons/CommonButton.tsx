import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

type Props = {
  children: React.ReactElement;
  onPress: () => void;
  style?: ViewStyle;
};

const CommonButton: React.FC<Props> = ({ onPress, style, children }) => {

  return (
    <TouchableOpacity onPress={onPress} style={{...sytles.container, ...style}}>
      {children}
    </TouchableOpacity>
  );
};

export default CommonButton;

const sytles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
    }
});
