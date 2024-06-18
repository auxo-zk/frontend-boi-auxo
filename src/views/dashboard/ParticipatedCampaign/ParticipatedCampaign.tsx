import { Box, Typography } from '@mui/material';
import React from 'react';
import TableCell from 'src/components/Table/TableCell';
import TableHeader from 'src/components/Table/TableHeader';
import TableWrapper from 'src/components/Table/TableWrapper';

const tableCellRatio = [2, 2, 2, 2, 2, 2];

export default function ParticipatedCampaign() {
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
                            Raised
                        </Typography>
                    </TableCell>
                    <TableCell xs={tableCellRatio[4]}>
                        <Typography variant="body2" color={'text.secondary'}>
                            Funded
                        </Typography>
                    </TableCell>
                    <TableCell xs={tableCellRatio[5]}>
                        <Typography variant="body2" color={'text.secondary'}>
                            Milestones
                        </Typography>
                    </TableCell>
                </TableHeader>
            </TableWrapper>
        </Box>
    );
}
