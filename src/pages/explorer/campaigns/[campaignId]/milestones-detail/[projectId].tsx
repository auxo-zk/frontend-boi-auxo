import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';
import { getCampaignOverview } from 'src/services/campaign/api';
import { getProjectDetail } from 'src/services/project/api';
import MilestoneDetail from 'src/views/explorer/campaign/MilestoneDetail';

export default function MilestoneDetailPage() {
    return <MilestoneDetail />;
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
