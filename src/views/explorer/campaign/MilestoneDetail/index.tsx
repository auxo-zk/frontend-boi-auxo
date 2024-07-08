import { ChevronLeftRounded } from '@mui/icons-material';
import { Box, Breadcrumbs, Container, Link, MenuItem, Select, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
const CustomEditor = dynamic(() => import('src/components/CustomEditor/CustomEditor'), { ssr: false });

import { useState } from 'react';
import ButtonLoading from 'src/components/ButtonLoading/ButtonLoading';
import { MilestoneData, useMilestoneData, useMilestoneFunctions } from './state';
import ScopeOfWork from './ScopeOfWork';
import AdditionalDoc from './AdditionalDoc';
import Img from 'src/components/Img/Img';
import { IconChevonRight } from 'src/assets/svg/icon';

export default function MilestoneDetail() {
    const { campaignQuestions, projectData, projectImg, campaignBanner } = useMilestoneData();
    const { setAnswerQuestionCampaign, handleSubmitProject } = useMilestoneFunctions();
    const [loading, setLoading] = useState<boolean>(false);
    const [submiting, setSubmiting] = useState<boolean>(false);

    const handleSubmitClick = async () => {
        setSubmiting(true);
        await handleSubmitProject();
        setSubmiting(false);
    };
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
            <Box sx={{ display: 'flex', mt: 2, flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Breadcrumbs>
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
                    <Typography variant="h1">Milestones Details</Typography>
                </Box>
                <Box sx={{ display: 'flex', placeItems: 'center', gap: 2, ml: 'auto' }}>
                    <Img src={projectImg} alt="project avatar" sx={{ width: { xs: '60px', sm: '97px' }, height: { xs: '60px', sm: '97px' }, borderRadius: '50%' }} />
                    <IconChevonRight sx={{ fontSize: '45px', color: 'secondary.main' }} />
                    <Img src={campaignBanner} alt="campaign banner" sx={{ height: { xs: '60px', sm: '97px' }, aspectRatio: '272/97', borderRadius: '12px' }} />
                </Box>
            </Box>
            {campaignQuestions.map((question, index) => {
                return (
                    <Box key={question.question + index}>
                        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                            <Box dangerouslySetInnerHTML={{ __html: question.question }} />
                            {question.isRequired && (
                                <Typography color={'secondary'} ml={1}>
                                    *
                                </Typography>
                            )}
                        </Box>
                        {question.hint ? <Typography color={'text.secondary'}>Hint: {question.hint}</Typography> : <></>}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                            <Select
                                size="small"
                                defaultValue={'customAnswer'}
                                onChange={(e) => {
                                    const selectVal = String(e.target.value || '');
                                    setAnswerQuestionCampaign(index, projectData[selectVal as keyof MilestoneData['projectData']] || '');
                                }}
                                sx={{ minWidth: '210px' }}
                            >
                                <MenuItem value={'problemStatement'}>Problem statement</MenuItem>
                                <MenuItem value={'solution'}>Solution</MenuItem>
                                <MenuItem value={'challengeAndRisk'}>Challenges & Risks</MenuItem>
                                <MenuItem value={'customAnswer'}>Custom Answer</MenuItem>
                            </Select>
                        </Box>
                        <CustomEditor
                            value={question.answer || ''}
                            onChange={(v: string) => {
                                setAnswerQuestionCampaign(index, String(v || ''));
                            }}
                        />
                    </Box>
                );
            })}
            <Box sx={{ mt: 5 }}>
                <ScopeOfWork />
            </Box>
            <Box sx={{ mt: 8 }}>
                <AdditionalDoc />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                {/* <ButtonLoading muiProps={{ variant: 'contained', onClick: handleSaveButton, sx: { mr: 1 } }} isLoading={loading}>
                    Save
                </ButtonLoading>
               */}
                <ButtonLoading isLoading={submiting} muiProps={{ variant: 'contained', onClick: handleSubmitClick }}>
                    Submit
                </ButtonLoading>
            </Box>
        </Container>
    );
}
