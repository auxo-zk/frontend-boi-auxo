import axios from 'axios';
import { apiUrl } from './url';
import { getJwt } from './project/api';
import { TFileSaved, TRef, TWitness } from './type';

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

export type TProjectParticipation = {
    Name: string;
    Hash: string;
    Size: number;
};
export type TScopeOfWorks = {
    information: string;
    milestone: string;
    raisingAmount: string;
    deadline: string;
};
export type TProjectParticipationInput = {
    answers: string[];
    scopeOfWorks: TScopeOfWorks[];
    documents: TFileSaved[];
};
export async function postProjectparticipation(projectId: string, input: TProjectParticipationInput): Promise<TProjectParticipation> {
    const jwt = getJwt();
    const res = await axios.post(apiUrl.postProjectParticipation(projectId), input, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });
    return res.data;
}

export async function saveFile(file: File): Promise<TFileSaved> {
    const formData = new FormData();
    formData.append('file', file);
    const res = (await axios.post(apiUrl.saveFile, formData)).data;
    return res;
}

export type TDataParticipateCampaign = {
    timeline: {
        startParticipation: number;
        startFunding: number;
        startRequesting: number;
    };
    timelineWitness: TWitness;
    memberWitnessLevel1: TWitness;
    memberWitnessLevel2: TWitness;
    projectIndexWitness: TWitness;
    projectCounter: number;
    projectCounterWitness: TWitness;
    campaignContractRef: TRef;
    projectContractRef: TRef;
};

export async function getDataParticipateCampaign(campaignId: string, projectId: string): Promise<TDataParticipateCampaign> {
    const res = await axios.get(apiUrl.getDataParticipateCampaign(campaignId, projectId));
    return res.data;
}
