import { LinkedIn, Telegram } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { IconEdit } from 'src/assets/svg/icon';
import Avatar from 'src/components/Avatar/Avatar';
import { useProfileProjectsData, useProfileProjectsFunction } from './state';
import Card from 'src/components/Card/Card';
import NoData from 'src/components/NoData';

export default function Profile() {
    const profileProjects = useProfileProjectsData();

    const { fetchDraft, fetchProject } = useProfileProjectsFunction();
    async function getData() {
        try {
            await fetchDraft();
            await fetchProject();
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Container sx={{ pt: 5 }}>
            <Typography variant="h1" textTransform={'uppercase'}>
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
                <Box width={'100%'}>
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 5 }}>
                <Typography variant="h6">Owner Projects</Typography>
                <Link href="/explorer/projects/create" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <Button variant="contained">Create Projects</Button>
                </Link>
            </Box>
            <Grid container spacing={2}>
                {profileProjects?.ownerProject?.project?.map((item, index) => {
                    return (
                        <Grid key={index} item xs={12} sm={3}>
                            <Card avatar={item.avatar} banner={item.banner}>
                                <Box sx={{ height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ width: '100%' }}>
                                        <Typography mb={1} variant="h6">
                                            {item.name || 'No name'}
                                        </Typography>

                                        <Typography variant="body1" mt={1}>
                                            {item.overviewDesc}
                                        </Typography>
                                    </Box>
                                    <Button fullWidth variant="outlined">
                                        Edit
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    );
                })}
                {(profileProjects?.ownerProject?.project?.length || 0) === 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <NoData text="No Project Found!" />
                    </Box>
                )}
            </Grid>
            <Grid container spacing={2} mt={2}>
                {profileProjects?.ownerProject?.draft?.map((item, index) => {
                    return (
                        <Grid key={index} item xs={12} sm={3}>
                            <Card avatar="" banner="">
                                <Box sx={{ height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ width: '100%' }}>
                                        <Typography mb={1} variant="h6">
                                            {item.name || 'No name'}
                                        </Typography>
                                        <Box
                                            sx={{
                                                borderRadius: 4,
                                                border: '1px solid #FFCCBC',
                                                height: '28px',
                                                width: '77px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: '#FFCCBC',
                                            }}
                                        >
                                            <Typography variant="body3" color="inherit">
                                                Drafting...
                                            </Typography>
                                        </Box>
                                        <Typography variant="body1" mt={1}>
                                            {item.overviewDesc}
                                        </Typography>
                                    </Box>
                                    <Button fullWidth variant="outlined">
                                        Edit
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    );
                })}
                {(profileProjects?.ownerProject?.draft?.length || 0) === 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <NoData text="No Draft Found!" />
                    </Box>
                )}
            </Grid>
        </Container>
    );
}
