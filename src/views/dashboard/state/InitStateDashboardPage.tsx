import React, { useEffect } from 'react';
import { useWalletData } from 'src/states/wallet';
import { useDashboardPageFunction } from './state';
import { FetchStatus } from 'src/constants';

export default function InitStateDashboardPage() {
    const { isConnecting, userAddress } = useWalletData();
    const { getListProjectOptions } = useDashboardPageFunction();

    useEffect(() => {
        if (userAddress) {
            getListProjectOptions(userAddress, FetchStatus.FETCHING);
        }
    }, [userAddress]);
    return <></>;
}
