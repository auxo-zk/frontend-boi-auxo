import { Box, Button, Grid, SxProps, Theme, Typography } from '@mui/material';
import { useCreateProjectData, useCreateProjectFunctions } from './state';
const rowStyle: SxProps<Theme> = (theme) => ({
    display: 'flex',
    alignItems: 'center',
});

export default function TeamMember() {
    const { teamMember } = useCreateProjectData();
    const {} = useCreateProjectFunctions();
    return (
        <Box>
            <Typography>Team members</Typography>
            <Grid container>
                <Grid item xs={12} md={3.5}>
                    <Typography variant="body1" fontWeight={500}>
                        {teamMember!['root']?.profileName}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography variant="body1" fontWeight={500}>
                        {teamMember!['root']?.role}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="body1" fontWeight={500}>
                        {teamMember!['root']?.socialLink}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={1.5}>
                    <Button variant="outlined">Add</Button>
                </Grid>
            </Grid>
        </Box>
    );
}
