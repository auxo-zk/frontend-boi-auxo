import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import { TCampaignDetail, getCampaignOverview } from 'src/services/campaign/api';
import DetailCampaigns from 'src/views/explorer/campaign/DetailCampaign/DetailCampaign';

export default function DetailCampaign({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <DetailCampaigns data={data} />;
}

export const getServerSideProps = (async (context) => {
    try {
        const id = context;
        const res = await getCampaignOverview('0');
        const data = res;

        return {
            props: { data },
        };
    } catch (error) {
        console.log(error);
        return { notFound: true };
    }
}) satisfies GetServerSideProps<{
    data: TCampaignDetail;
}>;
