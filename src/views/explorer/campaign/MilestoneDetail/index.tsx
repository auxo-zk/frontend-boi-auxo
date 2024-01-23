import { ChevronLeftRounded } from '@mui/icons-material';
import { Box, Breadcrumbs, Button, Container, Link, MenuItem, Paper, Select, Switch, TextField, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
const CustomEditor = dynamic(() => import('src/components/CustomEditor/CustomEditor'), { ssr: false });
import Img from 'src/components/Img/Img';

import { useState } from 'react';
import ButtonLoading from 'src/components/ButtonLoading/ButtonLoading';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import BannerInput from './BannerInput';
import { useMilestoneData, useMilestoneFunctions } from './state';
import ScopeOfWork from './ScopeOfWork';

export default function MilestoneDetail() {
    const { campaignQuestions, projectData } = useMilestoneData();
    const { setCampaignQuestions } = useMilestoneFunctions();
    const [loading, setLoading] = useState<boolean>(false);
    const [submiting, setSubmiting] = useState<boolean>(false);
    const router = useRouter();

    // const handleSaveButton = async () => {
    //     try {
    //         setLoading(true);
    //         await handleCreateProject();
    //         setLoading(false);
    //         router.push('/profile');
    //     } catch (error) {
    //         setLoading(false);
    //     }
    // };

    // const handleSubmitClick = async () => {
    //     setSubmiting(true);
    //     await handleSubmitProject();
    //     setSubmiting(false);
    // };
    return (
        <Container
            sx={(theme) => ({
                pb: 5,
                '& .timeline-row': {
                    display: 'flex',
                    alignItems: 'center',
                    my: 4,
                },
                '& .timeline-dot': { width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'background.primary', border: '2px solid ' + theme.palette.primary.light, mr: 1.5 },
            })}
        >
            <Breadcrumbs sx={{ mt: 2 }}>
                <Link color="inherit" href="/explorer/projects" style={{ textDecoration: 'none', color: 'unset' }}>
                    <Box sx={{ display: 'flex', placeItems: 'center' }}>
                        <ChevronLeftRounded color="primary" sx={{ fontSize: '24px' }} />
                        <Typography color={'primary.main'}>All Campaigns</Typography>
                    </Box>
                </Link>
                <Link color="inherit" href="#" style={{ textDecoration: 'none', color: 'unset' }}>
                    <Typography color={'primary.main'} fontWeight={600}>
                        Milestone detail
                    </Typography>
                </Link>
            </Breadcrumbs>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <Typography variant="h1">Milestones' Details</Typography>
            {Object.entries(campaignQuestions || {}).map(([questionKey, question]) => {
                return (
                    <Box key={questionKey}>
                        <Typography variant="h6" mt={6} mb={1}>
                            {question.question}
                            {question.required}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                            <Select
                                onChange={(e) => {
                                    const setValue = String(e.target.value || '');
                                    setCampaignQuestions({
                                        [questionKey]: {
                                            ...question,
                                            answer: setValue,
                                        },
                                    });
                                }}
                                sx={{ minWidth: '210px' }}
                            >
                                <MenuItem value={String(projectData.problemStatement)}>Problem statement</MenuItem>
                                <MenuItem value={String(projectData.solution)}>Solution</MenuItem>
                                <MenuItem value={String(projectData.challengeAndRisk)}>Challenges & Risks</MenuItem>
                            </Select>
                        </Box>
                        <CustomEditor
                            value={question.answer || ''}
                            onChange={(v: string) => {
                                setCampaignQuestions({
                                    [questionKey]: {
                                        ...question,
                                        answer: v,
                                    },
                                });
                            }}
                        />
                    </Box>
                );
            })}
            <Box sx={{ mt: 5 }}>
                <ScopeOfWork />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                {/* <ButtonLoading muiProps={{ variant: 'contained', onClick: handleSaveButton, sx: { mr: 1 } }} isLoading={loading}>
                    Save
                </ButtonLoading>
                <ButtonLoading isLoading={submiting} muiProps={{ variant: 'contained', onClick: handleSubmitClick }}>
                    Submit
                </ButtonLoading> */}
            </Box>
        </Container>
    );
}
