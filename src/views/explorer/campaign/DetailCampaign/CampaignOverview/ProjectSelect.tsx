import { Autocomplete, Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useModalData, useModalFunction } from 'src/states/modal';

const mockOptions = [
    {
        label: 'Mina hackathon 1',
        value: 1,
    },
    {
        label: 'Mina hackathon 2',
        value: 2,
    },
    {
        label: 'Mina hackathon 3',
        value: 3,
    },
];

export default function ProjectSelect() {
    const [project, setProject] = useState<number | string>();
    const router = useRouter();
    const { closeModal } = useModalFunction();
    return (
        <Box>
            {/* <Typography variant="h6">Select your project</Typography> */}
            <Typography variant="body1" mb={3}>
                {`Select a project to apply for this fundraising campaignYou will be required to provide answers to the organizer's questions to complete the application process`}
            </Typography>
            {/* <Select>
                {mockOptions.map((item, index) => {
                    return (
                        <MenuItem key={item.value} value={item.value}>
                            {item.label}
                        </MenuItem>
                    );
                })}
            </Select> */}
            <Autocomplete options={mockOptions} renderInput={(params) => <TextField {...params} color="secondary" placeholder="Select project" />} onChange={(e, value) => setProject(value?.value)} />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, justifyContent: 'flex-end' }}>
                <Button
                    disabled={!project}
                    variant="contained"
                    onClick={() => {
                        closeModal();
                        router.push(`/${router.asPath}/milestones-detail/${project}`);
                    }}
                >
                    Continue
                </Button>
            </Box>
        </Box>
    );
}
