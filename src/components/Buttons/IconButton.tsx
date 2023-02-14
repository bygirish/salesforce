import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';

type Props = {
  children: React.ReactElement;
  onPress: () => void;
  style?: ViewStyle;
};

const IconButton: React.FC<Props> = ({ onPress, style, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{...sytles.container, ...style}}>
      {children}
    </TouchableOpacity>
  );
};

export default IconButton;

const sytles = StyleSheet.create({
    container: {

    }
});

