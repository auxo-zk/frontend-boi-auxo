import { Box } from '@mui/material';
import { GetServerSideProps, InferGetStaticPropsType } from 'next';
import { useEffect, useMemo } from 'react';
import { getCampaignOverview } from 'src/services/campaign/api';
import { getProjectDetail } from 'src/services/project/api';
import MilestoneDetail from 'src/views/explorer/campaign/MilestoneDetail';
import { InitMileStoneData, useMilestoneFunctions } from 'src/views/explorer/campaign/MilestoneDetail/state';

export default function MilestoneDetailPage({ campaignDetail, projectDetail }: InferGetStaticPropsType<typeof getServerSideProps>) {
    const { setMilestoneData } = useMilestoneFunctions();
    useEffect(() => {
        const questions = campaignDetail.questions
            .map((i) => ({
                question: i.question,
                required: i.isRequired,
                hint: i.hint,
                answer: '',
            }))
            .reduce((current, i, index) => {
                return {
                    ...current,
                    [index]: {
                        question: i.question,
                        hint: i.hint,
                        required: i.required,
                        answer: i.answer,
                    },
                };
            }, {});

        setMilestoneData({
            campaignBanner: campaignDetail.banner,
            campaignQuestions: Object.assign({}, questions),
            projectData: {
                challengeAndRisk: projectDetail?.overview?.challengesAndRisk || '',
                problemStatement: projectDetail?.overview?.problemStatement || '',
                solution: projectDetail?.overview?.solution || '',
                customAnswer: '',
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [campaignDetail, projectDetail]);
    return (
        <>
            <MilestoneDetail />
        </>
    );
}

export const getServerSideProps = (async (context) => {
    try {
        const campaignId = String(context.params?.campaignId || '');
        const projectId = String(context.params?.projectId || '');
        const result = await Promise.all([getCampaignOverview(campaignId), getProjectDetail(projectId)]);
        return {
            props: {
                campaignDetail: result[0],
                projectDetail: result[1],
            },
        };
    } catch (error) {
        console.log(error);
        return { notFound: true };
    }
}) satisfies GetServerSideProps;
