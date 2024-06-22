import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Button, Container, Typography } from '@mui/material';
import Image from 'next/image';
import { imagePath } from 'src/constants/imagePath';
import SliderProject from 'src/views/dashboard/SliderProject/SliderProject';
import ParticipatedCampaign from 'src/views/dashboard/ParticipatedCampaign/ParticipatedCampaign';
import AutoCompleteSearchProject from 'src/views/dashboard/AutoCompleteSearchProject/AutoCompleteSearchProject';
import BoxPrivateData from 'src/components/BoxPrivateData/BoxPrivateData';
import InitStateDashboardPage from 'src/views/dashboard/state/InitStateDashboardPage';
import { useDashboardPageData } from 'src/views/dashboard/state/state';

export default function Dashboard() {
    const { selectedProject } = useDashboardPageData();
    return (
        <Container sx={{ pt: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h1" textTransform={'uppercase'} maxWidth={'614px'}>
                        Project dashboard
                    </Typography>
                    <AutoCompleteSearchProject />
                </Box>

                <Box sx={{ display: { xs: 'none', xsm: 'block' } }}>
                    <Image src={imagePath.THUMBNAIL3} alt="auxo thumbnail" style={{ maxWidth: '256px', height: 'auto', width: '100%' }} />
                </Box>
            </Box>

            <BoxPrivateData>
                <InitStateDashboardPage />
                {selectedProject ? (
                    <>
                        <Box my={5}>
                            <ParticipatedCampaign projectId={selectedProject.idProject} />
                        </Box>
                    </>
                ) : (
                    <Box>
                        <Typography textAlign={'center'} variant="h5">
                            Select a project to continute!
                        </Typography>
                    </Box>
                )}
            </BoxPrivateData>
        </Container>
    );
}
