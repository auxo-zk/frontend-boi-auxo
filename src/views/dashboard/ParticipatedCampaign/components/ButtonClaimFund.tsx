import { Button } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ButtonLoading from 'src/components/ButtonLoading/ButtonLoading';
import { getDataClaimFund } from 'src/services/services';
import { useAppContract } from 'src/states/contracts';
import { useWalletData } from 'src/states/wallet';

export default function ButtonClaimFund({ campaignId, projectId, disabled }: { campaignId: string; projectId: string; disabled: boolean }) {
    const { userAddress } = useWalletData();
    const { workerClient } = useAppContract();
    const [loading, setLoading] = React.useState(false);
    const [claimed, setClaimed] = useState<boolean>(false);

    async function handleClaimFund() {
        setLoading(true);
        const idtoast = toast.loading('Create transaction and proving...', { position: 'top-center', type: 'info' });
        try {
            if (!userAddress) throw Error('Please connect your wallet first!');
            if (!workerClient) throw Error('Worker client is dead, reload page again!');

            const dataBackend = await getDataClaimFund(campaignId, projectId);
            await workerClient.claimFund({
                campaignId: campaignId,
                projectId: projectId,
                sender: userAddress,
                dataBackend: dataBackend,
            });

            await workerClient.proveTransaction();

            toast.update(idtoast, { render: 'Prove successfull! Sending the transaction...' });
            const transactionJSON = await workerClient.getTransactionJSON();
            console.log(transactionJSON);

            const { transactionLink } = await workerClient.sendTransaction(transactionJSON);
            console.log(transactionLink);
            toast.update(idtoast, { render: 'Send transaction successfull!', isLoading: false, type: 'success', autoClose: 3000, hideProgressBar: false });
            setClaimed(true);
        } catch (error) {
            console.error(error);
            toast.update(idtoast, { render: (error as Error).message, type: 'error', position: 'top-center', isLoading: false, autoClose: 3000, hideProgressBar: false });
        }
        setLoading(false);
    }
    if (claimed) {
        return (
            <Button variant="contained" disabled>
                Claimed
            </Button>
        );
    }
    return (
        <ButtonLoading isLoading={loading} muiProps={{ size: 'small', variant: 'contained', onClick: handleClaimFund, disabled: disabled }}>
            Claim Fund
        </ButtonLoading>
    );
}
