
import React from "react";
import Icon from 'react-native-vector-icons/Ionicons';

type SupportedIonIconsType = typeof ION_ICONS[keyof typeof ION_ICONS];

type Props = {
    iconName: SupportedIonIconsType;
    color?: string;
    size?: number
};

const IonIcons: React.FC<Props> = (props) => {
    const {
        iconName,
        color,
        size
    } = props;

    return (<Icon name={iconName} size={size} color={color} />)
}

export default IonIcons;

export const ION_ICONS = {
    homeOutline: 'home-outline',
    peopleOutline: 'people-outline',
    settingsOutline: 'settings-outline',
    chevronBackOutline: 'chevron-back-outline',
} as const;

