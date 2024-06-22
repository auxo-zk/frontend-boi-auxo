import { Box, Button, Chip, Container, Grid, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IconEdit, IconSpinLoading } from 'src/assets/svg/icon';
import Avatar from 'src/components/Avatar/Avatar';
import { useProfileData, useProfileFunction } from './state';
import Card from 'src/components/Card/Card';
import NoData from 'src/components/NoData';
import { useModalFunction } from 'src/states/modal';
import EditForm from './EditForm';
import { useWalletData } from 'src/states/wallet';
import CardProject from '../common/CardProject';

export default function Profile() {
    const { userAddress } = useWalletData();

    const { description, name, img } = useProfileData();

    const { getProfileData, submitProfileAvatar } = useProfileFunction();

    const { setModalData } = useModalFunction();

    const handleOpenModal = () => {
        setModalData({ content: <EditForm />, open: true, title: 'Edit your profile' });
    };
    useEffect(() => {
        getProfileData();
    }, [userAddress]);

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
                            {name || 'Your name'}
                        </Typography>
                        <IconButton onClick={handleOpenModal}>
                            <IconEdit color="primary" sx={{ cursor: 'pointer' }} />
                        </IconButton>
                    </Box>
                    <Typography mt={1.5}>{description || 'Describe something about yourself.'}</Typography>

                    {/* <Box sx={{ display: 'flex', gap: 1.5, placeItems: 'center', mt: 2 }}>
                        <LinkedIn fontSize="large" sx={{ color: 'primary.light' }} />
                        <Telegram fontSize="large" sx={{ color: 'primary.light' }} />
                    </Box> */}
                </Box>
            </Box>

            <ListProjects />
            <ListDrafts />
        </Container>
    );
}

function ListProjects() {
    const { userAddress } = useWalletData();
    const { project } = useProfileData();
    const { fetchProject } = useProfileFunction();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            setLoading(true);
            await fetchProject();
            setLoading(false);
        })();
    }, [userAddress]);

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 5 }}>
                <Typography variant="h6">Owner Projects</Typography>
                <Link href="/explorer/projects/create" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <Button variant="contained">Create Projects</Button>
                </Link>
            </Box>
            {loading ? (
                <Box>
                    <IconSpinLoading sx={{ fontSize: '100px' }} />
                </Box>
            ) : (
                <>
                    <Grid container spacing={2}>
                        {project.map((item, index) => {
                            return (
                                <Grid key={index} item xs={12} sm={3}>
                                    <CardProject data={{ avatar: item.avatar, banner: item.banner, date: '', desc: item.overviewDesc, idProject: item.idProject, name: item.name }} />
                                    {/* <Card avatar={item.avatar} banner={item.banner}>
                                        <Box sx={{ height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box sx={{ width: '100%' }}>
                                                <Typography
                                                    variant="h6"
                                                    fontWeight={600}
                                                    mt={1}
                                                    component={'p'}
                                                    title={item.name}
                                                    sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                                >
                                                    {item.name || 'No name'}
                                                </Typography>

                                                <Box dangerouslySetInnerHTML={{ __html: item.overviewDesc }}></Box>
                                            </Box>
                                        </Box>
                                    </Card> */}
                                </Grid>
                            );
                        })}
                    </Grid>
                    {project.length === 0 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <NoData text="No Project Found!" />
                        </Box>
                    )}
                </>
            )}
        </>
    );
}

function ListDrafts() {
    const { draft } = useProfileData();
    const { fetchDraft } = useProfileFunction();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            await fetchDraft();
            setLoading(false);
        })();
    }, []);

    return (
        <>
            <Typography variant="h6" mt={5}>
                Draft Projects
            </Typography>
            {loading ? (
                <Box>
                    <IconSpinLoading />
                </Box>
            ) : (
                <>
                    <Grid container spacing={2} mt={2}>
                        {draft.map((item, index) => {
                            return (
                                <Grid key={index} item xs={12} xsm={6} sm={4} lg={3}>
                                    <Card avatar={item.avatar} banner={item.banner} sxBanner={{ minHeight: '102px' }}>
                                        <Box sx={{ height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box sx={{ width: '100%' }}>
                                                <Typography
                                                    variant="h6"
                                                    fontWeight={600}
                                                    mt={1}
                                                    component={'p'}
                                                    title={item.name}
                                                    sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                                >
                                                    {item.name || 'No name'}
                                                </Typography>
                                                <Box textAlign={'right'} my={1}>
                                                    <Chip variant="outlined" color="secondary" label="Drafting..." size="small"></Chip>
                                                </Box>
                                                <Box
                                                    dangerouslySetInnerHTML={{ __html: item.overviewDesc }}
                                                    sx={{
                                                        '& > *': {
                                                            m: 0,
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: '3',
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            height: '60px',
                                                            lineHeight: '20px',
                                                        },
                                                    }}
                                                ></Box>
                                            </Box>
                                            <Link style={{ color: 'inherit', textDecoration: 'none', width: '100%' }} href={`/explorer/projects/edit/${item.id}`}>
                                                <Button fullWidth variant="outlined" size="small">
                                                    Edit
                                                </Button>
                                            </Link>
                                        </Box>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                    {draft.length === 0 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <NoData text="No Draft Found!" />
                        </Box>
                    )}
                </>
            )}
        </>
    );
}
