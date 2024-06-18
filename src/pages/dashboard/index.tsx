import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Button, Container, Typography } from '@mui/material';
import Image from 'next/image';
import { imagePath } from 'src/constants/imagePath';
import SliderProject from 'src/views/dashboard/SliderProject/SliderProject';
import ParticipatedCampaign from 'src/views/dashboard/ParticipatedCampaign/ParticipatedCampaign';

export default function Dashboard() {
    return (
        <Container sx={{ pt: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
                <Typography variant="h1" textTransform={'uppercase'} maxWidth={'614px'}>
                    Project dashboard
                </Typography>
                <Box>
                    <Image src={imagePath.THUMBNAIL3} alt="auxo thumbnail" style={{ maxWidth: '256px', height: 'auto', width: '100%' }} />
                </Box>
            </Box>

            <Box>
                <SliderProject />
            </Box>

            <Box my={5}>
                <ParticipatedCampaign />
            </Box>
        </Container>
    );
}
