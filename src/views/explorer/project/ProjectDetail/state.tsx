import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { KeyProjectInput, TProjectDetail } from 'src/services/project/api';

const initData: TProjectDetail = {
    name: '',
    avatar: '',
    date: '',
    banner: '',
    overview: {
        description: '',
        documents: [],
        member: [],
        campaignAmount: 0,
        raisingAmount: 0,
        [KeyProjectInput.solution]: '',
        [KeyProjectInput.challengesAndRisks]: '',
        [KeyProjectInput.problemStatement]: '',
    },
};

const projectDetail = atom<TProjectDetail>(initData);

export default function InitProjectDetailData({ data }: { data: TProjectDetail }) {
    const setProjectDetailData = useSetAtom(projectDetail);
    useEffect(() => {
        setProjectDetailData(data);
        console.log('set:', data);
    }, [data]);
    return <></>;
}

export const useProjectDetailData = () => useAtomValue(projectDetail);
