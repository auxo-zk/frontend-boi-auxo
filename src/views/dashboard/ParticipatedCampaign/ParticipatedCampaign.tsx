import { Box, Typography } from '@mui/material';
import React from 'react';
import TableCell from 'src/components/Table/TableCell';
import TableHeader from 'src/components/Table/TableHeader';
import TableWrapper from 'src/components/Table/TableWrapper';
import { useDashboardPageData, useDashboardPageFunction } from '../state/state';
import TableRow from 'src/components/Table/TableRow';
import StatusFund from './components/StatusFund';
import { formatAddress } from 'src/utils/format';

const tableCellRatio = [2, 2, 2, 2, 2, 2];

export default function ParticipatedCampaign({ projectId }: { projectId: string }) {
    const { getListCampaignOptions } = useDashboardPageFunction();
    const { listCampaign } = useDashboardPageData();

    React.useEffect(() => {
        if (projectId) {
            getListCampaignOptions(projectId);
        }
    }, [projectId]);
    return (
        <Box mt={3}>
            <Typography variant="h6" mb={1}>
                Partipated Campaign
            </Typography>

            <TableWrapper sx={{ overflow: 'auto' }}>
                <TableHeader sx={{ minWidth: '900px' }}>
                    <TableCell xs={tableCellRatio[0]}>
                        <Typography variant="body2" color={'text.secondary'}>
                            Campaign
                        </Typography>
                    </TableCell>
                    <TableCell xs={tableCellRatio[1]}>
                        <Typography variant="body2" color={'text.secondary'}>
                            Organizer
                        </Typography>
                    </TableCell>
                    <TableCell xs={tableCellRatio[2]}>
                        <Typography variant="body2" color={'text.secondary'}>
                            Status
                        </Typography>
                    </TableCell>
                    <TableCell xs={tableCellRatio[3]}>
                        <Typography variant="body2" color={'text.secondary'}>
                            Target
                        </Typography>
                    </TableCell>
                    <TableCell xs={tableCellRatio[4]}>
                        <Typography variant="body2" color={'text.secondary'}>
                            Funded
                        </Typography>
                    </TableCell>
                    <TableCell xs={tableCellRatio[5]}>
                        <Typography variant="body2" color={'text.secondary'}>
                            #
                        </Typography>
                    </TableCell>
                </TableHeader>

                {listCampaign.map((campaign, index) => {
                    return (
                        <TableRow key={index + 'campaignfund'} sx={{ minWidth: '900px' }}>
                            <TableCell xs={tableCellRatio[0]}>
                                <Typography>{campaign.campaignName}</Typography>
                            </TableCell>
                            <TableCell xs={tableCellRatio[1]}>
                                <Typography>{formatAddress(campaign.ownerAddress)}</Typography>
                            </TableCell>
                            <TableCell xs={tableCellRatio[2]}>
                                <StatusFund amountFund={campaign.fundedAmount} timeAllocation={new Date(campaign.timeline.startRequesting).getTime()} />
                            </TableCell>
                            <TableCell xs={tableCellRatio[3]}>
                                <Typography>{campaign.targetAmount} MINA</Typography>
                            </TableCell>
                            <TableCell xs={tableCellRatio[4]}>
                                <Typography>{campaign.fundedAmount} MINA</Typography>
                            </TableCell>
                            <TableCell xs={tableCellRatio[5]}>
                                <Box textAlign={'right'}></Box>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableWrapper>
        </Box>
    );
}
