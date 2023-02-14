import React from 'react';
import { SafeAreaView, StatusBar, Text, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import CommonScreenHeader from '../ScreenHeaders/CommonScreenHeader';

type Props = {
  contentContainerStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  children: React.ReactElement;
  header?: React.ReactElement;
};

const CommonScreenWrapper: React.FC<Props> = ({
  contentContainerStyle,
  containerStyle,
  children,
  header
}) => {
  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <StatusBar barStyle="dark-content" backgroundColor={'#cccccc'} />
      <SafeAreaView style={styles.SafeAreaView}>
        {
          header
        }
        <View style={{ ...styles.contentContainer, ...contentContainerStyle }}>
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CommonScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  SafeAreaView: { flex: 1, backgroundColor: '#FFF' },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  headerContainer: {
    borderBottomWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 20,
    justifyContent: 'center',
    // flex: 1,
    // justifyContent: 'space-around'
  },
  leftElement: {
    borderWidth: 1,
    justifyContent: 'flex-start',
    flex: 1
  },
  centerElement: {
    borderWidth: 1,
    justifyContent: 'center',
    flexDirection: 'row',

    flex: 2
  },
  rightElement: {
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
});
