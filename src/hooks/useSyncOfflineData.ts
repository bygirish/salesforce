import React, { useEffect } from "react";
import { useNetInfo } from '@react-native-community/netinfo';
import { useAppDispatch } from "../stores/hooks";
import { syncUsers } from "../stores/users/actions";

const useSyncOfflineData = () => {

    const dispatch = useAppDispatch();

    const netInfo = useNetInfo();

    const isInternetConnected = netInfo?.isConnected;

    useEffect(() => {

        if(isInternetConnected) {
            dispatch(syncUsers());
        }

    }, [isInternetConnected])

};

export default useSyncOfflineData;
