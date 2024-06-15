import { Box } from '@mui/material';
import React from 'react';
import LeftBox from './components/LeftBox';
import RightBox from './components/RightBox';
import { TProjectFundRaising } from 'src/services/project/api';

export default function FundRaisingProject() {
    const [fundrasing, setFundrasing] = React.useState<TProjectFundRaising>({
        raisedAmount: 0,
        targetAmount: 0,
        documents: [],
        raiseInfo: [],
    });

    return (
        <Box sx={{ display: 'flex', gap: 3.5, mt: 3, position: 'relative', zIndex: 0 }}>
            <LeftBox fundrasing={fundrasing} />
            <RightBox fundrasing={fundrasing} />
        </Box>
    );
}
