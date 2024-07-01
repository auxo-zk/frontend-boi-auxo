import { Typography } from '@mui/material';
import React from 'react';

export default function StatusFund({ amountFund, timeAllocation }: { amountFund: number; timeAllocation: number }) {
    const now = Date.now();
    // console.log('now', now, timeAllocation, amountFund);
    if (now < timeAllocation) {
        return <Typography color={'secondary'}>On-going</Typography>;
    }

    if (amountFund > 0) {
        return <Typography color={'success'}>Funded</Typography>;
    }

    return <Typography color={'text.secondary'}>Not Funded</Typography>;
}
