import axios from 'axios';
import { apiUrl } from '../url';
import { LocalStorageKey } from 'src/constants';
import { TFileSaved } from '../type';

export enum KeyProjectInput {
    'solution' = 'solution',
    'problemStatement' = 'problemStatement',
    'challengesAndRisks' = 'challengesAndRisk',
}
//PROJECT LIST ************************************************************************************************************************************************
export type TProjectData = {
    name: string;
    desc: string;
    date: string;
    banner: string;
    avatar: string;
    idProject: string;
};
export const getJwt = () => {
    return localStorage.getItem(LocalStorageKey.AccessToken) || '';
};

export async function getTopProject(): Promise<TProjectData[]> {
    const response: any[] = (await axios.get(apiUrl.getTopProject)).data;
    return response.map((item: any) => ({
        name: item.ipfsData?.name || '',
        avatar: item?.ipfsData?.avatarImage || '',
        banner: item?.ipfsData?.coverImage || '',
        desc: item.ipfsData?.description || '',
        date: new Date().toJSON(),
        idProject: item.projectId + '' || '#',
    }));
}

export async function getAddressProject(address: string): Promise<TProjectData[]> {
    const response: any[] = (await axios.get(apiUrl.getTopProject + `?member=${address}`)).data;
    return response.map((item: any) => ({
        name: item.ipfsData?.name || '',
        avatar: item?.ipfsData?.avatarImage || '',
        banner: item?.ipfsData?.coverImage || '',
        desc: item.ipfsData?.description || '',
        date: new Date().toJSON(),
        idProject: item.projectId + '' || '#',
    }));
}

export async function getProjectNotParticipateCampaign(campaignId: string, address: string): Promise<TProjectData[]> {
    const response: any[] = (await axios.get(apiUrl.getProjectNotParticipateCampaign(campaignId, address))).data;
    return response.map((item: any) => ({
        name: item.ipfsData?.name || '',
        avatar: item?.ipfsData?.avatarImage || '',
        banner: item?.ipfsData?.coverImage || '',
        desc: item.ipfsData?.description || '',
        date: new Date().toLocaleDateString(),
        idProject: item.projectId + '' || '#',
    }));
}

//PROJECT DETAIL ************************************************************************************************************************************************
export type TMemberData = {
    name: string;
    role: string;
    link: string;
    publicKey: string;
};

export type TProjectOverview = {
    raisingAmount?: number;
    campaignAmount?: number;
    description: string;
    documents: TFileSaved[];
    member: TMemberData[];
} & {
    [key in KeyProjectInput]: string;
};

export type TProjectDetail = {
    name: string;
    avatar: string;
    banner: string;
    date: string;
    totalClaimedAmount: number;
    totalFundedAmount: number;
    overview: TProjectOverview;
};
export async function getProjectDetail(projectId: string): Promise<TProjectDetail> {
    const response = (await axios.get(apiUrl.projectDetail + `/${projectId}`)).data;
    return {
        name: response?.ipfsData?.name || '',
        avatar: response?.ipfsData?.avatarImage || '',
        banner: response?.ipfsData?.coverImage || '',
        date: new Date().toLocaleDateString(),
        totalClaimedAmount: response?.totalClaimedAmount || 0,
        totalFundedAmount: response?.totalFundedAmount || 0,
        overview: {
            description: response?.ipfsData?.description || '',
            documents: response?.ipfsData?.documents || [],
            member: response?.ipfsData?.members || [],
            campaignAmount: 0,
            raisingAmount: 0,
            [KeyProjectInput.solution]: response?.ipfsData ? response?.ipfsData[KeyProjectInput.solution] || '' : '',
            [KeyProjectInput.problemStatement]: response?.ipfsData ? response?.ipfsData[KeyProjectInput.problemStatement] || '' : '',
            [KeyProjectInput.challengesAndRisks]: response?.ipfsData ? response?.ipfsData[KeyProjectInput.challengesAndRisks] || '' : '',
        },
    };
}

export type TScopeOfWork = {
    deadline: string;
    information: string;
    milestone: string;
    raisingAmount: string;
};

export type TQuestions = {
    question: string;
    hint: string;
    isRequired: boolean;
};
export type TProjectFundRaising = {
    campaignId: string;
    campaignName: string;
    fundedAmount: number;
    claimedAmount: number;
    targetAmount: number;
    raiseInfo: {
        scope: string;
        budgetRequired: string;
        etc: string;
    }[];
    documents: TFileSaved[];
    scopeOfWorks: TScopeOfWork[];
    questions: TQuestions[];
    answers: string[];
    ownerAddress: string;
    timeline: {
        startParticipation: string;
        startFunding: string;
        startRequesting: string;
    };
    campaignState: number;
};

export async function getFundRaisingProject(projectId: string): Promise<TProjectFundRaising[]> {
    const response = (await axios.get(apiUrl.getParticipationsByProjectId(projectId))).data;
    return response.map((item: any) => ({
        campaignId: item.campaignId + '',
        campaignName: item.campaign?.ipfsData?.name || '',
        fundedAmount: item.fundedAmount / 10 ** 9 || 0,
        claimedAmount: item.claimedAmount / 10 ** 9 || 0,
        targetAmount:
            item.ipfsData?.scopeOfWorks?.reduce((accumulator: number, item: any) => {
                return accumulator + Number(item.raisingAmount);
            }, 0) || 0,
        raiseInfo: item.raiseInfo || [],
        documents: item.ipfsData?.documents || [],
        scopeOfWorks: item.ipfsData?.scopeOfWorks || [],
        questions: item.campaign?.ipfsData?.questions || [],
        answers: item.ipfsData?.answers || [],
        ownerAddress: item.campaign?.owner || '',
        timeline: {
            startParticipation: item.campaign?.ipfsData?.timeline?.startParticipation || '',
            startFunding: item.campaign?.ipfsData?.timeline?.startFunding || '',
            startRequesting: item.campaign?.ipfsData?.timeline?.startRequesting || '',
        },
        campaignState: item.campaign?.state || 0,
    }));
}

//PROJECT EDIT ******************************************************************************************************************************************
export type MemberDataType = {
    profileName: string;
    role: string;
    socialLink: string;
    publicKey: string;
};
export type TEditProjectData = {
    draftId?: string;
    name: string;
    avatarImage: string;
    coverImage: string;
    publicKey: string;
    overViewDescription: string;
    problemStatement: string;
    solution: string;
    challengeAndRisk: string;
    customSections: {
        [key: string]: {
            title: string;
            description?: string;
        };
    };
    members: MemberDataType[];
    documents: TFileSaved[];
};
export async function saveProject(address: string, project: TEditProjectData) {
    if (!project.draftId || !address) {
        return;
    }
    const jwt = getJwt();
    await axios.post(
        apiUrl.saveProject + `${address}/drafts/${project.draftId}`,
        {
            address: address,
            name: project.name,
            publicKey: project.publicKey,
            description: project.overViewDescription,
            problemStatement: project.problemStatement,
            solution: project.solution,
            challengeAndRisks: project.challengeAndRisk,
            members: project.members,
            documents: project.documents,
        },
        {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        }
    );
    return { success: true };
}

// ****************************************************************************************************************************************************
export async function createProject(id: string = '', address: string, project: TEditProjectData) {
    if (!address) {
        return;
    }
    const jwt = getJwt();
    await axios.post(
        apiUrl.saveProject + `/drafts${id ? `/${id}` : ''}`,
        {
            address: address,
            name: project.name,
            avatarImage: project.avatarImage,
            coverImage: project.coverImage,
            publicKey: project.publicKey,
            description: project.overViewDescription,
            problemStatement: project.problemStatement,
            solution: project.solution,
            challengeAndRisk: project.challengeAndRisk,
            members: project.members.map((member) => {
                return { name: member.profileName, role: member.role, link: member.socialLink, publicKey: member.publicKey };
            }),
            documents: project.documents,
        },
        {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        }
    );
    return { success: true };
}

// ****************************************************************************************************************************************************
export async function getDraftProjectDetail(draftId: string): Promise<TEditProjectData | undefined> {
    const jwt = getJwt();
    const response: any = (
        await axios.get(apiUrl.getDraftDetail(draftId), {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
    ).data;
    return {
        name: response.name,
        challengeAndRisk: response.challengeAndRisk,
        overViewDescription: response.description,
        problemStatement: response.problemStatement,
        publicKey: response.publicKey,
        solution: response.solution,
        documents: response.documents,
        draftId: response._id,
        members: (response.members || []).map((member: any) => ({
            profileName: member.name,
            role: member.role,
            socialLink: member.link,
            publicKey: member.publicKey,
        })),
        avatarImage: response.avatarImage,
        coverImage: response.coverImage,
        customSections: {},
    };
}

// ****************************************************************************************************************************************************
export type ProjectMetaData = {
    name: string;
    avatar: string;
    banner: string;
    type: 'project' | 'draft';
    overviewDesc: string;
    idProject: string;
    id?: string;
};
export async function getDraftProject(): Promise<ProjectMetaData[]> {
    const response: any[] = (await axios.get(apiUrl.getDraft, { headers: { Authorization: `Bearer ${getJwt()}` } })).data || [];
    return response.map((item) => ({
        name: item.name,
        avatar: item.avatarImage || '',
        banner: item.coverImage || '',
        type: 'draft',
        overviewDesc: item.description,
        id: item._id,
        idProject: '#',
    }));
}

// ****************************************************************************************************************************************************
export async function getUserProject(address: string): Promise<ProjectMetaData[]> {
    const response: any[] = (await axios.get(apiUrl.getProject + `?member=${address}`, { headers: { Authorization: `Bearer ${getJwt()}` } })).data || [];
    return response.map((item) => ({
        name: item.ipfsData?.name || '',
        avatar: item?.ipfsData?.avatarImage || '',
        banner: item?.ipfsData?.coverImage || '',
        overviewDesc: item.ipfsData?.description || '',
        date: new Date().toLocaleDateString(),
        idProject: item.projectId + '' || '#',
        type: 'project',
    }));
}

// ****************************************************************************************************************************************************

export type IPFSProjectInput = {
    name: string;
    avatarImage: string;
    coverImage: string;
    publicKey: string;
    description: string;
    members: {
        name: string;
        role: string;
        link: string;
        publicKey: string;
    }[];
    documents: TFileSaved[];
    //
} & { [key in KeyProjectInput]: string };

export async function postProjectsToIpfs(input: IPFSProjectInput): Promise<{
    Name: string;
    Hash: string;
    Size: 0;
}> {
    const response = await axios.post(apiUrl.postProjectToIpfs, input, {
        headers: { Authorization: `Bearer ${getJwt()}` },
    });
    return response.data;
}
