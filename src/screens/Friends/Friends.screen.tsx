import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import UserListItem from './components/UserListItem';
import useGetUsers from './useGetUsers';
import CommonScreenWrapper from '../../components/ScreenWrappers/CommonScreenWrapper';
import { NavigationRoutes } from '../../navigation/ScreenParams';
import { BottomTabNavigatorPropsType } from '../../navigation/types';
import CommonScreenHeader from '../../components/ScreenHeaders/CommonScreenHeader';

type Props = BottomTabNavigatorPropsType<typeof NavigationRoutes.FriendsTab>;

const Friends = (props: Props) => {
  const [friends, isLoading, error, fetchUsersData] = useGetUsers();

  return (
    <CommonScreenWrapper
      header={
        <CommonScreenHeader
          headerTitle={"My Friends"}
        />
      }>
      <>
        <FlatList
          data={friends}
          renderItem={({ item }) => <UserListItem userId={item} />}
          keyExtractor={item => item}
          style={styles.friendList}
          refreshing={isLoading}
          onRefresh={() => fetchUsersData()}
        />
      </>
    </CommonScreenWrapper>
  );
};

export default Friends;

const styles = StyleSheet.create({
  friendList: {
    width: '100%',
  },
});
