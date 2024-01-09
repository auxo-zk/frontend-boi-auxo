import axios from 'axios';
import { apiUrl } from '../url';

// export type TProjectData = { name: string; date: string; desc: string };
//PROJECT LIST ************************************************************************************************************************************************
export type TProjectData = {
    name: string;
    desc: string;
    date: string;
    banner: string;
    avatar: string;
};

export const apiGetTopProject = '';

export async function getTopProject(): Promise<TProjectData[]> {
    const response: any[] = (await axios.get(apiUrl.getTopProject)).data;
    return response.map((item: any) => ({
        name: item.ipfsData?.name || '',
        avatar: item.avatar || '',
        banner: item.banner || '',
        desc: item.ipfsData?.description || '',
        date: new Date().toLocaleDateString(),
    }));
}

//PROJECT DETAIL ************************************************************************************************************************************************
export type TProjectOverview = {
    raisingAmount?: number;
    campaignAmount?: number;
    description: string;
    problemStatement: string;
    solution: string;
    challengesAndRisk: string;
    documents: string[];
    member: {
        name: string;
        role: string;
        link: string;
    }[];
};

export type TProjectFundRaising = {
    raisedAmount?: number;
    targetAmount?: number;
    raiseInfo: {
        scope: string;
        budgetRequired: string;
        etc: string;
    }[];
    documents: string[];
};

export type TProjectDetail = {
    name: string;
    avatar: string;
    date: string;
    overview: TProjectOverview;
    fundrasing: TProjectFundRaising;
};
export async function getProjectDetail(projectId: string): Promise<TProjectDetail> {
    const response = (await axios.get(apiUrl.projectDetail + `/${projectId}`)).data;
    return {
        name: response.ipfsData.name,
        avatar: '',
        date: new Date().toLocaleDateString(),
        fundrasing: {
            raisedAmount: 0,
            targetAmount: 0,
            raiseInfo: [
                {
                    budgetRequired: '30.000 MINA',
                    etc: new Date().toLocaleDateString(),
                    scope: '1',
                },
                {
                    budgetRequired: '30.000 MINA',
                    etc: new Date().toLocaleDateString(),
                    scope: '2',
                },
                {
                    budgetRequired: '30.000 MINA',
                    etc: new Date().toLocaleDateString(),
                    scope: '3',
                },
            ],
            documents: [],
        },
        overview: {
            description: response.ipfsData.description,
            documents: [],
            member: response.ipfsData.members,
            problemStatement: response.ipfsData.problemStatement,
            campaignAmount: 0,
            raisingAmount: 0,
            challengesAndRisk: response.ipfsData.challengesAndRisks,
            solution: response.ipfsData.solution,
        },
    };
}
