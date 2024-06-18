import { Avatar, Box, Button, Grid, IconButton, SxProps, TextField, Theme, Typography } from '@mui/material';
import { useCreateProjectData, useCreateProjectFunctions } from './state';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import { IconRemove } from 'src/assets/svg/icon';
import { MemberDataType } from 'src/services/project/api';
import { useEffect } from 'react';
import { useProfileData } from 'src/views/profile/state';

const rowStyle: SxProps<Theme> = (theme) => ({
    display: 'flex',
    alignItems: 'center',
});

export default function TeamMember() {
    const userProfile = useProfileData();
    const { members } = useCreateProjectData();
    const { addTeamMember, setProjectData, editTeamMember, removeTeamMember } = useCreateProjectFunctions();

    const handleAddTeamMember = () => {};

    const handleRemoveMember = (index: number) => {
        removeTeamMember(index);
    };

    const handleEditTeamMember = (index: number, value: Partial<MemberDataType>) => {
        editTeamMember(index, value);
    };

    useEffect(() => {
        if (members.length === 0) {
            addTeamMember({
                profileName: userProfile?.name || '',
                role: userProfile?.role || '',
                publicKey: userProfile?.address || '',
                socialLink: userProfile?.website || '',
            });
        } else {
            editTeamMember(0, { profileName: userProfile?.name || '', role: userProfile?.role || '', publicKey: userProfile?.address || '', socialLink: userProfile?.website || '' });
        }
    }, [userProfile.name, userProfile.role, userProfile.address, userProfile.website]);
    return (
        <Box
            sx={{
                '& .member-row': {
                    my: 1,
                },
            }}
        >
            <Typography variant="h6" mb={2}>
                Team members
            </Typography>
            <Grid
                container
                sx={{
                    '& .MuiGrid-item': {
                        display: 'flex',
                        alignItems: 'center',
                    },
                }}
                className="member-row"
                spacing={2}
            >
                <Grid item xs={12} md={3.5}></Grid>
                <Grid item xs={12} md={3}></Grid>
                <Grid item xs={12} md={4}></Grid>
                <Grid item xs={12} md={1.5} sx={{ justifyContent: 'flex-end' }}>
                    <Button sx={{ minWidth: '100px' }} variant="outlined" onClick={handleAddTeamMember}>
                        Add
                    </Button>
                </Grid>
            </Grid>
            {members.map((member, index) => {
                return (
                    <Grid
                        key={member.publicKey + index}
                        container
                        spacing={2}
                        sx={{
                            '& .MuiGrid-item': {
                                display: 'flex',
                                alignItems: 'center',
                            },
                        }}
                        className="member-row"
                    >
                        <Grid item xs={12} md={3.5}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ width: '50px', height: '50px' }} />
                                <TextField
                                    sx={{ ml: 2 }}
                                    label="Profile Name"
                                    onChange={(e) => {
                                        handleEditTeamMember(index, {
                                            profileName: e.target.value,
                                        });
                                    }}
                                    defaultValue={member.profileName}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Role"
                                onChange={(e) => {
                                    handleEditTeamMember(index, {
                                        role: e.target.value,
                                    });
                                }}
                                defaultValue={member.role}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Social Link"
                                onChange={(e) => {
                                    handleEditTeamMember(index, {
                                        socialLink: e.target.value,
                                    });
                                }}
                                defaultValue={member.socialLink}
                            />
                        </Grid>
                        <Grid item xs={12} md={1.5} sx={{ justifyContent: 'flex-end' }}>
                            <Box sx={{ minWidth: '100px', display: 'flex', justifyContent: 'center' }}>
                                <IconButton
                                    onClick={() => {
                                        handleRemoveMember(index);
                                    }}
                                >
                                    <IconRemove sx={{ fontSize: '2rem', color: 'background.primary' }} />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                );
            })}
        </Box>
    );
}
