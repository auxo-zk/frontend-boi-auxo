import { Box, Button } from '@mui/material';
import React from 'react';
import { useWalletData, useWalletFunction } from 'src/states/wallet';
import { formatAddress } from 'src/utils/format';
import ConnectedWalletButton from './ConnectedWalletButton';

export default function ButtonConnectWallet() {
    const { userAddress, isConnecting } = useWalletData();
    const { connectWallet } = useWalletFunction();

    return (
        <Box ml={'auto'}>
            {isConnecting ? (
                <Button variant="outlined" disabled>
                    Connecting...
                </Button>
            ) : (
                <>
                    {userAddress ? (
                        <ConnectedWalletButton />
                    ) : (
                        <Button variant="contained" onClick={connectWallet}>
                            Connect wallet
                        </Button>
                    )}
                </>
            )}
        </Box>
    );
}
