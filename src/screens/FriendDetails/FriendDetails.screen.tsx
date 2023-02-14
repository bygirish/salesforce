import React, { useEffect, useRef, useState } from 'react';
import { Text, TextInput } from 'react-native';
import CommonScreenHeader from '../../components/ScreenHeaders/CommonScreenHeader';
import CommonScreenWrapper from '../../components/ScreenWrappers/CommonScreenWrapper';
import { NavigationRoutes } from '../../navigation/ScreenParams';
import { StackNavigatorScreenPropsType } from '../../navigation/types';
import { UserType } from '../Friends/types';
import styles from './FriendDetails.style';
import Navigator from '../../navigation/Navigator';
import useUpdateUser from './useEditFriend';
import { useAppSelector } from '../../stores/hooks';
import { getUserByIdSelector } from '../../stores/users/selectors';
import useGetUsers from '../Friends/useGetUsers';
import IonIcons, { ION_ICONS } from '../../components/Icons/IonIcons';
import IconButton from '../../components/Buttons/IconButton';
import CommonButton from '../../components/Buttons/CommonButton';

enum InputFieldTypes {
  textInput = 'TEXT_INPUT',
}

type CurrentDataType = Record<
  string,
  {
    value: string | number;
    type: string;
  }
>;

type UserTypeKeys = 'First_Name__c' | 'Last_Name__c' | 'Age__c';

const FormFieldIds: { [key: string]: UserTypeKeys } = {
  firstName: 'First_Name__c',
  lastName: 'Last_Name__c',
  age: 'Age__c',
};

const FormFields: {
  id: UserTypeKeys;
  type: InputFieldTypes;
}[] = [
  {
    id: FormFieldIds.firstName,
    type: InputFieldTypes.textInput,
  },
  {
    id: FormFieldIds.lastName,
    type: InputFieldTypes.textInput,
  },
  {
    id: FormFieldIds.age,
    type: InputFieldTypes.textInput,
  },
];

type Props = StackNavigatorScreenPropsType<
  typeof NavigationRoutes.FriendDetails
>;

export default function FriendDetails(props: Props) {
  const { route } = props;

  const fieldRefs = useRef([]);
  const [isUpdatingUsers, error, updateUserData] = useUpdateUser();

  const userId = route?.params?.userId;
  const userData = useAppSelector(state => getUserByIdSelector(state, userId));

  const [, , , fetchUsersData] = useGetUsers();
  useEffect(() => {
    if (!userData) fetchUsersData();
  }, [userData]);

  const [currentUserFormData, setCurrentUserFormData] =
    useState<CurrentDataType>({});

  useEffect(() => {
    if (userData) {
      console.log('userData', userData);
      const data = {} as CurrentDataType;
      FormFields.forEach(field => {
        const value = userData[field.id];
        data[field.id] = {
          value,
          type: typeof value,
        };
      });
      setCurrentUserFormData(data);
    }
  }, [userData?.Id]);

  if (!userData) return null;

  const onChangeData = (data: {
    fieldId: string;
    type: InputFieldTypes;
    value: any;
  }) => {
    const { fieldId, type, value } = data;

    switch (type) {
      case InputFieldTypes.textInput:
        const typedValue =
          currentUserFormData[fieldId].type === 'number'
            ? parseInt(value)
            : String(value);
        setCurrentUserFormData({
          ...currentUserFormData,
          [fieldId]: {
            ...currentUserFormData[fieldId],
            value: typedValue,
          },
        });
        return;
    }
  };

  const onPressUpdateDetails = () => {
    console.log('updated details are', currentUserFormData);
    const user: UserType = {
      ...userData,
    };

    FormFields.forEach(field => {
      const fieldId = field.id;
      user[fieldId] = currentUserFormData[fieldId].value;
    });

    updateUserData(user);
  };

  const isNewFriend = Object.keys(userData).length === 0;

  const onPressBack = () => {
    Navigator.canGoBack()
      ? Navigator.goBack()
      : Navigator.navigate(NavigationRoutes.Dashboard);
  };

  return (
    <CommonScreenWrapper
      contentContainerStyle={styles.contentContainer}
      header={
        <CommonScreenHeader
          leftElement={
            <IconButton onPress={onPressBack}>
              <IonIcons iconName={ION_ICONS.chevronBackOutline} size={25} />
            </IconButton>
          }
          headerTitle={
            isNewFriend
              ? 'Add New Friend Details'
              : `Update Details of ${userData.First_Name__c}`
          }
        />
      }>
      <>
        {FormFields.map((fieldData, index) => {
          switch (fieldData.type) {
            case InputFieldTypes.textInput:
              const currentFieldValue =
                currentUserFormData?.[fieldData.id]?.value;

              const onChange = (text: string) => {
                onChangeData({
                  fieldId: fieldData.id,
                  type: fieldData.type,
                  value: text,
                });
              };
              const onSubmitEditing = (data: any) => {
                if (index < FormFields.length) {
                  fieldRefs.current[index + 1]?.focus();
                }
              };
              return (
                <TextInput
                  ref={el => (fieldRefs.current[index] = el)}
                  key={fieldData.id}
                  style={styles.formFieldContainer}
                  onChangeText={onChange}
                  onSubmitEditing={onSubmitEditing}
                  keyboardType={
                    typeof currentFieldValue === 'number'
                      ? 'number-pad'
                      : 'default'
                  }
                  value={String(currentFieldValue) ?? ''}
                />
              );
            default:
              return null;
          }
        })}

        <CommonButton
          onPress={onPressUpdateDetails}
          style={styles.updateButton}>
          {<Text>{isNewFriend ? 'Add New Friend' : 'Update'}</Text>}
        </CommonButton>

        {isUpdatingUsers && (
          <Text>
            {isNewFriend ? '...Adding New Friend' : '...updating Friend Data'}
          </Text>
        )}
      </>
    </CommonScreenWrapper>
  );
}
