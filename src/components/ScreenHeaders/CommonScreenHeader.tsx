import React from 'react';
import { SafeAreaView, StatusBar, Text, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

type Props = {
  containerStyle?: ViewStyle;
  headerTitle?: string;
  leftElement?: React.ReactElement;
  centerElement?: React.ReactElement;
  rightElement?: React.ReactElement;
};

const CommonScreenHeader: React.FC<Props> = ({
  containerStyle,
  headerTitle,
  leftElement,
  centerElement,
  rightElement
}) => {
  return (
    <View style={{...styles.container, ...containerStyle}}>
      {
        leftElement &&
        <View style={styles.leftElement}>
          {leftElement}
        </View>
      }
      {
        <View style={styles.centerElement}>
          {headerTitle && <Text style={styles.headerTitle}>{headerTitle}</Text>}
          {centerElement && centerElement}
        </View>
      }

      {
        rightElement && 
        <View style={styles.rightElement}>
          {rightElement}
        </View>
      }


    </View>
  );
};

export default CommonScreenHeader;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 20,
    justifyContent: 'center',
  },
  leftElement: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  centerElement: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 4,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: "500",
    flexWrap: 'wrap'
  },
  rightElement: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
