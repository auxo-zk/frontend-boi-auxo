import { Box } from '@mui/material';
import { GetServerSideProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { getCampaignOverview } from 'src/services/campaign/api';
import { KeyProjectInput, getProjectDetail } from 'src/services/project/api';
import MilestoneDetail from 'src/views/explorer/campaign/MilestoneDetail';
import { InitMileStoneData, useMilestoneFunctions } from 'src/views/explorer/campaign/MilestoneDetail/state';

export default function MilestoneDetailPage({ campaignDetail, projectDetail }: InferGetStaticPropsType<typeof getServerSideProps>) {
    const { setMilestoneData } = useMilestoneFunctions();
    const router = useRouter();
    const projectId = String(router.query.projectId || '');
    const campaignId = String(router.query.campaignId || '');
    useEffect(() => {
        const questions = campaignDetail.questions.map((item) => ({
            ...item,
            answer: '',
        }));

        setMilestoneData({
            campaignBanner: campaignDetail.banner,
            campaignQuestions: questions,
            campaignId: campaignId,
            projectData: {
                challengeAndRisk: projectDetail?.overview ? projectDetail?.overview[KeyProjectInput.challengesAndRisks] || '' : '',
                problemStatement: projectDetail?.overview ? projectDetail?.overview[KeyProjectInput.problemStatement] || '' : '',
                solution: projectDetail?.overview ? projectDetail?.overview[KeyProjectInput.solution] || '' : '',
                customAnswer: '',
                projectId: projectId,
            },
            projectImg: projectDetail.avatar,
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
