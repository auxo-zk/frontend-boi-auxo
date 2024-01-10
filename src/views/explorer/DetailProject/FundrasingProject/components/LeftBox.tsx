import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { FontInter } from 'src/assets/fonts';
import CustomAccordion from 'src/components/CustomAccordion/CustomAccordion';
import { formatDate } from 'src/utils/format';
import { useProjectDetailData } from 'src/views/project/ProjectDetail/state';

export default function LeftBox() {
    const { fundrasing } = useProjectDetailData();

    return (
        <Box>
            <Box sx={{ width: '100%', backgroundColor: '#FFF8F6', borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ backgroundColor: 'secondary.light', p: 2, my: 0 }}>
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
                <Box sx={{ m: 0, p: 2 }}>
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
                                        {item.etc ? formatDate(item.etc, 'dd MMM yyyy') : 'Not specific'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        );
                    })}
                </Box>
            </Box>
            <Box sx={{ my: 1 }}>
                <CustomAccordion
                    title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod?"
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
            </Box>
            <Box sx={{ my: 1 }}>
                <CustomAccordion
                    title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod?"
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
            </Box>{' '}
            <Box sx={{ my: 1 }}>
                <CustomAccordion
                    title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod?"
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
            </Box>{' '}
            <Box sx={{ my: 1 }}>
                <CustomAccordion
                    title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod?"
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
            </Box>
        </Box>
    );
}
