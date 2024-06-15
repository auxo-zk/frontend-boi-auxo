import axios from 'axios';
import { apiUrl } from './url';
import { getJwt } from './project/api';

export type TCommitteeData = {
    id: string;
    idCommittee: string;
    name: string;
    status: 'Active' | 'Pending';
    threshold: number;
    numberOfMembers: number;
    creator: string;
    members: { publicKey: string; alias: string; lastActive: string }[];
};
export async function getListCommittees(): Promise<TCommitteeData[]> {
    const response = await axios.get(apiUrl.listCommittee);

    return response.data.map((item: any) => {
        return {
            id: item['_id'],
            idCommittee: (item.committeeId + '').padStart(2, '0') || '---',
            name: item.ipfsData?.name || 'Unknown',
            status: item.active ? 'Active' : 'Pending',
            threshold: item.threshold || 0,
            numberOfMembers: item.numberOfMembers || 0,
            creator: item.ipfsData?.creator || 'Unknown',
            members: item.members || [],
        };
    });
}

export async function postCreateCommittee(data: { name: string; creator: string; network: string }) {
    const response = await axios.post(apiUrl.createCommittee, data);
    console.log('post new committee', response.data);
    return response.data;
}

type RTSeverSig = {
    msg: string[];
    signature: string;
};
export async function getServerSig(): Promise<RTSeverSig> {
    const response = (await axios.get(apiUrl.serverSigNature)).data as RTSeverSig;
    return response;
}

type RTGetTokenFromSig = string;
export async function getTokenFromSig(data: {
    address: string;
    role: number;
    signature: {
        r: string;
        s: string;
    };
    serverSignature: {
        msg: string[];
        signature: string;
    };
}): Promise<RTGetTokenFromSig> {
    console.log('🚀 ~ file: services.ts:60 ~ apiUrl.getTokenFromSig:', apiUrl.getTokenFromSig);
    const response = (await axios.post(apiUrl.getTokenFromSig, data)).data as RTGetTokenFromSig;
    return response;
}

//TODO ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export type TWitness = {
    path: string[];
    isLeft: boolean[];
};

export async function getProjectMemberWitness(projectId: string, memberId: string): Promise<TWitness[]> {
    const response = await axios.get(apiUrl.getProjectMemberWitness(projectId, memberId));
    return response.data || [];
}

export async function getParticipationZkappWitness(): Promise<TWitness[]> {
    const response = await axios.get(apiUrl.getParticipationZkappWitness);
    return response.data;
}

export async function getProjectMemLvl1(): Promise<TWitness[]> {
    const res: TWitness[] = (await axios.get(apiUrl.getProjectMemLvl1)).data || [];
    return res;
}

export async function getProjectMemLvl2(projectId: string): Promise<TWitness[]> {
    const res: TWitness[] = (await axios.get(apiUrl.getProjectMemLvl2(projectId || ''))).data || [];
    return res;
}

export async function getParticipationZkApp(): Promise<TWitness[]> {
    const res: TWitness[] = (await axios.get(apiUrl.getParticipationZkApp)).data || [];
    return res;
}

export type TProjectParticipation = {
    Name: 'string';
    Hash: 'string';
    Size: number;
};
export type TProjectParticipationInput = {
    answers: string[];
    scopeOfWorks: {
        information: string[];
        milestone: string;
        raisingAmount: string;
        deadline: string;
    }[];
    documents: TFileSaved[];
};
export async function postProjectparticipation(projectId: string, input: TProjectParticipationInput): Promise<TProjectParticipation> {
    const jwt = getJwt();
    const res: TProjectParticipation = (
        await axios.post(apiUrl.postProjectParticipation(projectId), input, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
    ).data;
    return res;
}

export async function getWitnessIndex(): Promise<TWitness[]> {
    const res: TWitness[] = (await axios.get(apiUrl.getWitnessIndex)).data;
    return res;
}

export type TFileSaved = { fileName: string; fileSize: number; URL: string };
export async function saveFile(file: File): Promise<TFileSaved> {
    const formData = new FormData();
    formData.append('file', file);
    const res = (await axios.post(apiUrl.saveFile, formData)).data;
    return res;
}
