import { Box, Grid, Typography } from '@mui/material';
import { useMemo } from 'react';
import { IconDone } from 'src/assets/svg/icon';

import { TCampaignDetail } from 'src/services/campaign/api';
import { formatDate } from 'src/utils/format';
import Img from 'src/components/Img/Img';
import { imagePath } from 'src/constants/imagePath';
import ParticipatingProjects from './ParticipatingProjects';

export default function CampaignOverview({ data, idCampaign }: { data: TCampaignDetail['overview']; idCampaign: string }) {
    const activeSteps = useMemo(() => {
        const timeNow = Date.now();
        if (timeNow > data.timeline.startRequesting) return 2;
        if (timeNow > data.timeline.startFunding) return 1;
        if (timeNow > data.timeline.startParticipation) return 0;

        return -1;
    }, [data]);
    return (
        <Box>
            <Grid container sx={{ mt: 2 }} spacing={2}>
                <Grid item xs={12} sm={6} sx={{ zIndex: -1 }}>
                    <Box sx={{ display: 'flex' }}>
                        <Img
                            src={data.organizer.avatar || imagePath.DEFAULT_AVATAR.src}
                            alt="organizer avatar"
                            sx={{ minWidth: '96px', width: '96px', height: '96px', mr: 2.2, borderRadius: '50%' }}
                        />
                        <Box sx={{ width: '-webkit-fill-available' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, gap: 1.5 }}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="body1" color={'text.secondary'} mb={1}>
                                        Organizer
                                    </Typography>
                                    <Typography variant="h6">{data.organizer.name}</Typography>
                                </Box>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="body1" color={'text.secondary'} mb={1}>
                                        Capacity
                                    </Typography>
                                    <Typography variant="h6">{data.capacity} projects</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Box
                                    sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical' }}
                                    dangerouslySetInnerHTML={{ __html: data.description }}
                                ></Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box ml={3}>
                        <Typography color={'text.secondary'} mb={1}>
                            Timeline
                        </Typography>
                        <StepView
                            activeStep={activeSteps}
                            steps={[
                                { title: 'Participation', content: `Start at: ${formatDate(Number(data.timeline.startParticipation || 0), 'MMMM dd, YYY')}` },
                                { title: 'Investment', content: `Start at: ${formatDate(Number(data.timeline.startFunding || 0), 'MMMM dd, YYY')}` },
                                { title: 'Allocation', content: `Start at: ${formatDate(Number(data.timeline.startRequesting || 0), 'MMMM dd, YYY')}` },
                            ]}
                        />
                    </Box>
                </Grid>
            </Grid>

            <ParticipatingProjects campaignId={idCampaign} timeForJoinCampaign={activeSteps == 0} />
        </Box>
    );
}

function StepView({ steps, activeStep }: { steps: { title: string; content: string }[]; activeStep: number }) {
    return (
        <Box>
            {steps.map((item, index) => {
                const IconStep =
                    index < activeStep ? (
                        <IconDone sx={{ fontSize: '24px', color: 'primary.light' }} />
                    ) : index == activeStep ? (
                        <Box sx={{ border: '2px solid', width: '24px', height: '24px', borderRadius: '50%', borderColor: 'primary.light' }} />
                    ) : (
                        <Box sx={{ border: '1px solid', width: '24px', height: '24px', borderRadius: '50%', borderColor: 'text.primary' }} />
                    );
                return (
                    <Box key={'step' + item.title + index}>
                        <Box sx={{ display: 'flex', placeItems: 'center', gap: 3 }}>
                            <Box sx={{ display: 'flex', placeItems: 'center', gap: 1.3 }}>
                                {IconStep}
                                <Typography
                                    variant="h6"
                                    sx={{
                                        minWidth: '140px',
                                        fontWeight: index < activeStep ? 700 : 500,
                                        color: index < activeStep ? 'primary.light' : index == activeStep ? 'text.primary' : 'text.secondary',
                                    }}
                                >
                                    {item.title}
                                </Typography>
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: '400', color: index < activeStep ? 'primary.light' : index == activeStep ? 'text.primary' : 'text.secondary' }}>
                                {item.content}
                            </Typography>
                        </Box>
                        {index < steps.length - 1 ? (
                            <Box sx={{ height: '40px', width: '24px', justifyContent: 'center', display: 'flex' }}>
                                <Box
                                    sx={{
                                        width: '0px',
                                        height: '100%',
                                        border: index < activeStep ? '0.5px solid' : '0.5px dashed',
                                        borderColor: index < activeStep ? 'primary.light' : 'text.secondary',
                                    }}
                                ></Box>
                            </Box>
                        ) : null}
                    </Box>
                );
            })}
        </Box>
    );
}
