import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TProjectData, getAddressProject } from 'src/services/project/api';
import { useModalFunction } from 'src/states/modal';
import { useWalletData } from 'src/states/wallet';

export default function ProjectSelect() {
    const [project, setProject] = useState<number | string>();
    const [listProject, setListProject] = useState<TProjectData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { userAddress } = useWalletData();
    const router = useRouter();
    const { closeModal } = useModalFunction();
    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const res = await getAddressProject(userAddress);
                setListProject(res);
            } catch (error) {}
            setLoading(false);
        };
        fetchProjects();
    }, [userAddress]);
    return (
        <Box>
            <Typography variant="body1" mb={3}>
                {`Select a project to apply for this fundraising campaignYou will be required to provide answers to the organizer's questions to complete the application process`}
            </Typography>

            <Autocomplete
                options={listProject.map((pj) => ({ label: pj.name, value: pj.idProject }))}
                renderInput={(params) => <TextField {...params} color="secondary" placeholder="Select project" />}
                onChange={(e, value) => setProject(value?.value)}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, justifyContent: 'flex-end' }}>
                <Button
                    disabled={!project}
                    variant="contained"
                    onClick={() => {
                        closeModal();
                        router.push(`${router.asPath}/milestones-detail/${project}`);
                    }}
                >
                    Continue
                </Button>
            </Box>
        </Box>
    );
}
