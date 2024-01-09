import { ChevronLeft, ChevronLeftRounded } from '@mui/icons-material';
import { Box, Breadcrumbs, Container, Typography } from '@mui/material';
import { GetServerSideProps, GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import React from 'react';
import ButtonGroup from 'src/components/ButtonGroup/ButtonGroup';
import Img from 'src/components/Img/Img';
import { TProjectDetail, getProjectDetail } from 'src/services/project/api';
import OverviewProject from 'src/views/explorer/DetailProject/OverviewProject/OverviewProject';
import ProjectDetail from 'src/views/project/ProjectDetail/ProjectDetail';
import InitProjectDetailData from 'src/views/project/ProjectDetail/state';

export default function DetailProject({ data }: InferGetStaticPropsType<typeof getServerSideProps>) {
    return (
        <>
            <InitProjectDetailData data={data} />;
            <ProjectDetail />
        </>
    );
}

export const getServerSideProps = (async (context) => {
    const res = await getProjectDetail('0');
    const data = res;

    return {
        props: { data },
    };
}) satisfies GetServerSideProps<{
    data: TProjectDetail;
}>;
