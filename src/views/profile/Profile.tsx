import { LinkedIn, Telegram } from '@mui/icons-material';
import { Box, Button, Container, Grid, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { IconEdit } from 'src/assets/svg/icon';
import Avatar from 'src/components/Avatar/Avatar';
import { useProfileData, useProfileFunction } from './state';
import Card from 'src/components/Card/Card';
import NoData from 'src/components/NoData';
import { useModalData, useModalFunction } from 'src/states/modal';
import EditForm from './EditForm';

export default function Profile() {
    const profileProjects = useProfileData();

    const { fetchDraft, fetchProject } = useProfileFunction();
    async function getData() {
        try {
            await fetchDraft();
            await fetchProject();
        } catch (err) {
            console.log(err);
        }
    }
    const { description, name, img } = useProfileData();
    const { getProfileData, setProfileData, submitProfileAvatar } = useProfileFunction();
    const {} = useModalData();
    const { setModalData } = useModalFunction();

    const handleOpenModal = () => {
        setModalData({ content: <EditForm />, open: true, title: 'Edit your profile' });
    };
    useEffect(() => {
        getProfileData();
    }, [getProfileData]);

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Container sx={{ pt: 5, pb: 3 }}>
            <Typography variant="h1" textTransform={'uppercase'}>
                Builder Profile
            </Typography>
            <Box sx={{ display: 'flex', placeItems: 'center', gap: 4, mt: 4 }}>
                <Avatar
                    src={img}
                    size={150}
                    onChange={async (file) => {
                        try {
                            if (file![0]) {
                                await submitProfileAvatar(file![0]);
                                getProfileData();
                            }
                        } catch (error) {}
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h4" fontWeight={600}>
                            {name}
                        </Typography>
                        <IconButton onClick={handleOpenModal}>
                            <IconEdit color="primary" sx={{ cursor: 'pointer' }} />
                        </IconButton>
                    </Box>
                    <Typography mt={1.5}>{description}</Typography>

                    {/* <Box sx={{ display: 'flex', gap: 1.5, placeItems: 'center', mt: 2 }}>
                        <LinkedIn fontSize="large" sx={{ color: 'primary.light' }} />
                        <Telegram fontSize="large" sx={{ color: 'primary.light' }} />
                    </Box> */}
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 5 }}>
                <Typography variant="h6">Owner Projects</Typography>
                <Link href="/explorer/projects/create" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <Button variant="contained">Create Projects</Button>
                </Link>
            </Box>
            <Grid container spacing={2}>
                {profileProjects?.project?.map((item, index) => {
                    return (
                        <Grid key={index} item xs={12} sm={3}>
                            <Card avatar={item.avatar} banner={item.banner}>
                                <Box sx={{ height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ width: '100%' }}>
                                        <Typography mb={1} variant="h6">
                                            {item.name || 'No name'}
                                        </Typography>

                                        <Box dangerouslySetInnerHTML={{ __html: item.overviewDesc }}></Box>
                                    </Box>
                                    <Button fullWidth variant="outlined" size="small">
                                        Edit
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    );
                })}
                {(profileProjects?.project?.length || 0) === 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <NoData text="No Project Found!" />
                    </Box>
                )}
            </Grid>
            <Grid container spacing={2} mt={2}>
                {profileProjects?.draft?.map((item, index) => {
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
                                            <Typography variant="body3" color="secondary.main">
                                                Drafting...
                                            </Typography>
                                        </Box>
                                        <Box dangerouslySetInnerHTML={{ __html: item.overviewDesc }}></Box>
                                    </Box>
                                    <Button fullWidth variant="outlined" size="small">
                                        Edit
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    );
                })}
                {(profileProjects?.draft?.length || 0) === 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <NoData text="No Draft Found!" />
                    </Box>
                )}
            </Grid>
        </Container>
    );
}
