import { LinkedIn, Telegram } from '@mui/icons-material';
import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { IconEdit } from 'src/assets/svg/icon';
import Avatar from 'src/components/Avatar/Avatar';
import Img from 'src/components/Img/Img';

export default function Profile() {
    return (
        <Container sx={{ pt: 5 }}>
            <Typography variant="h1" textTransform={'uppercase'} maxWidth={'614px'}>
                Builder Profile
            </Typography>
            <Box sx={{ display: 'flex', placeItems: 'center', gap: 4, mt: 4 }}>
                <Avatar
                    src="https://pbs.twimg.com/profile_images/1732964434363248640/UtVeR8Io_200x200.jpg"
                    size={150}
                    onChange={(file) => {
                        console.log(file);
                    }}
                />
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h4" fontWeight={600}>
                            Alicia
                        </Typography>
                        <IconEdit color="primary" sx={{ cursor: 'pointer' }} />
                    </Box>
                    <Typography color={'primary.light'}>Business Development</Typography>
                    <Typography mt={1.5}>zkApp & Backend Developer 3 year experience of Typescript and NodejsLooking for a team</Typography>

                    <Box sx={{ display: 'flex', gap: 1.5, placeItems: 'center', mt: 2 }}>
                        <LinkedIn fontSize="large" sx={{ color: 'primary.light' }} />
                        <Telegram fontSize="large" sx={{ color: 'primary.light' }} />
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
