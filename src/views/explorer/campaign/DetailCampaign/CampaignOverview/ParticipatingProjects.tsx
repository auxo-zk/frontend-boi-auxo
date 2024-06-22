import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IconSpinLoading } from 'src/assets/svg/icon';
import NoData from 'src/components/NoData';
import { getParticipatingProjects } from 'src/services/campaign/api';
import { TProjectData } from 'src/services/project/api';
import { useModalFunction } from 'src/states/modal';
import CardProject from 'src/views/common/CardProject';
import ProjectSelect from './ProjectSelect';

export default function ParticipatingProjects({ campaignId }: { campaignId: string }) {
    const [listProject, setListProject] = useState<TProjectData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { openModal } = useModalFunction();
    const handleOpen = () => {
        openModal({
            title: 'Select Project',
            content: <ProjectSelect />,
            modalProps: {
                maxWidth: 'xs',
            },
        });
    };

    async function getListParticipatingProjects() {
        setLoading(true);
        if (campaignId) {
            try {
                const data = await getParticipatingProjects(campaignId);
                setListProject(data);
            } catch (err) {
                console.log(err);
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        getListParticipatingProjects();
    }, []);

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', placeItems: 'center' }} mt={5.5}>
                <Typography variant="h6">Participating Projects ({listProject.length})</Typography>
                <Button sx={{ minWidth: '184px' }} variant="contained" onClick={handleOpen}>
                    Apply New
                </Button>
            </Box>
            {loading ? (
                <Box sx={{ py: 5 }}>
                    <IconSpinLoading sx={{ fontSize: '100px' }} />
                </Box>
            ) : (
                <>
                    {listProject.length == 0 ? (
                        <NoData text="No Project Found!" />
                    ) : (
                        <>
                            <Box mt={3}>
                                <TextField variant="outlined" color="secondary" label="Search project" name="project_name" sx={{ width: '100%', maxWidth: '380px', mb: 3 }} />

                                <Grid container spacing={3}>
                                    {listProject.map((item, index) => {
                                        return (
                                            <Grid key={'projectJoinedcampain' + index + item.name} item xs={12} xsm={6} md={4}>
                                                <CardProject data={item}></CardProject>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Box>
                        </>
                    )}
                </>
            )}
        </>
    );
}
