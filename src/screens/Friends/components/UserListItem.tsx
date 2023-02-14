import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Clipboard,
} from 'react-native';
import CommonButton from '../../../components/Buttons/CommonButton';
import Navigator from '../../../navigation/Navigator';
import { NavigationRoutes } from '../../../navigation/ScreenParams';
import { useAppSelector } from '../../../stores/hooks';
import { getUserByIdSelector } from '../../../stores/users/selectors';
import { UserType } from '../types';

type Props = {
  userId: string;
};

const UserListItem: React.FC<Props> = React.memo(({ userId }: Props) => {
  const userData: UserType = useAppSelector(state =>
    getUserByIdSelector(state, userId),
  );

  const { First_Name__c, Last_Name__c, Age__c, Id, isUserSynced } = userData;

  const onPress = () => {
    Navigator.navigate(NavigationRoutes.FriendDetails, {
      userId: userId,
    });
  };

  return (
    <View style={styles.itemContainer}>
      <CommonButton onPress={onPress}>
        <>
          <Text
            style={{
              ...styles.text,
              ...(!isUserSynced ? styles.notSync : {}),
            }}>
            {`First Name: ${First_Name__c}`}
          </Text>
          <Text
            style={{
              ...styles.text,
              ...(!isUserSynced ? styles.notSync : {}),
            }}>
            {`Last Name: ${Last_Name__c}`}
          </Text>
          <Text
            style={{
              ...styles.text,
              ...(!isUserSynced ? styles.notSync : {}),
            }}>
            {`Age: ${Age__c}`}
          </Text>
          <Text
            style={{
              ...styles.text,
              ...(!isUserSynced ? styles.notSync : {}),
            }}>
            {`User-ID: ${Id}`}
          </Text>
        </>
      </CommonButton>
      <CommonButton
        onPress={() => Clipboard.setString(`mysalesforceapp://user/${Id}`)}>
        <Text
          style={{
            ...styles.deeplink,
            ...(!isUserSynced ? styles.notSync : {}),
          }}>
          {`User Link: mysalesforceapp://user/${Id}`}
        </Text>
      </CommonButton>
    </View>
  );
});

export default UserListItem;

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    color: '#808080',
    fontWeight: 'bold',
  },
  notSync: {
    color: '#FF0000',
  },
  deeplink: {
    marginVertical: 10,
    fontSize: 18,
    color: '#808080',
    fontWeight: 'bold',
  },
});
