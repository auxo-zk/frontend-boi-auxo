import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { FontInter } from 'src/assets/fonts';
import { formatDate } from 'src/utils/format';
import { useProjectDetailData } from 'src/views/project/ProjectDetail/state';

export default function LeftBox() {
    const { fundrasing } = useProjectDetailData();

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ backgroundColor: 'secondary.light', p: 2, borderRadius: 2, my: 0 }}>
                <Grid container>
                    <Grid item xs={4}>
                        <Typography variant="body2">Scope</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body2">Budget Required</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body2">ETC</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ backgroundColor: '#FFF8F6', my: 0, px: 2, py: 0 }}>
                {fundrasing?.raiseInfo?.map((item, index) => {
                    return (
                        <Grid key={index} container sx={{ my: 2 }}>
                            <Grid item xs={4}>
                                <Typography variant="body1">{item.scope}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1" fontWeight={600}>
                                    {item.budgetRequired}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1" fontWeight={300}>
                                    {formatDate(new Date().toLocaleDateString(), 'dd MMM yyyy')}
                                </Typography>
                            </Grid>
                        </Grid>
                    );
                })}
            </Box>
        </Box>
    );
}
