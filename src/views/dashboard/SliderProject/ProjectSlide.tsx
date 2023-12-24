import { Box, Typography } from '@mui/material';
import React from 'react';
import Img from 'src/components/Img/Img';

export default function ProjectSlide() {
    return (
        <Box
            sx={{
                width: '210px',
                height: '176px',
                pr: 1.5,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Box
                className={'content-slide'}
                sx={{
                    height: '136px',
                    borderRadius: '12px',
                    bgcolor: 'background.secondary',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                    transition: 'height 0.3s, border 0.3s',
                    '&:hover': { height: '155px', border: '1px solid', borderColor: 'primary.light', boxShadow: '0px 4px 8px 0px rgba(44, 151, 143, 0.48)' },
                }}
            >
                <Img src="https://pbs.twimg.com/profile_images/1732964434363248640/UtVeR8Io_200x200.jpg" alt="" sx={{ width: '66px', height: '66px', borderRadius: '50%' }} />
                <Typography variant="h6" fontWeight={500}>
                    Watcher.Guru
                </Typography>
            </Box>
        </Box>
    );
}
