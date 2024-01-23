import axios from 'axios';
import { apiUrl } from '../url';
import { BACKEND_BASE_URL } from '../baseUrl';

export type TCampaignData = { name: string; type: string; date: string; capacity: string; avatar: string; banner: string; status: number; campaignId: string };
export const apiLatestFundingCampaigns = '';

export async function getLatestFundingCampaigns(active: boolean = true): Promise<TCampaignData[]> {
    const response: any[] = (await axios.get(apiUrl.getCampaignAll + `?active=${active}`)).data;
    console.log(response);
    return response.map((item) => ({
        name: item.ipfsData?.name || '---',
        type: 'Public, grans',
        capacity: String(item.ipfsData?.capacity || ''),
        date: new Date().toLocaleDateString(),
        avatar: item.ipfsData?.avatarImage || '',
        banner: item.ipfsData?.coverImage || '',
        status: item.status || 0,
        campaignId: item.campaignId + '' || '#',
    }));
}

export type TCampaignDetailOverview = {
    organizer: string;
    capacity: string;
    description: string;

    allocation: {
        from: number;
        to: number;
    };
    investment: {
        from: number;
        to: number;
    };
    participation: {
        from: number;
        to: number;
    };
};
export type TCampaignResult = {};
export type TCampaignDetail = {
    campaignId: string;
    name: string;
    banner: string;
    avatar: string;
    overview: TCampaignDetailOverview;
    result: TCampaignResult;
};
export async function getCampaignOverview(campaignId: string): Promise<TCampaignDetail> {
    const response = (await axios.get(apiUrl.campaignDetail + `/${campaignId}`)).data;
    return {
        campaignId: response.campaignId + '' || '',
        name: response.ipfsData?.name || '----',
        banner: response?.ipfsData?.coverImage || '',
        avatar: response?.ipfsData?.avatarImage || '',
        overview: {
            organizer: response.owner || '',
            capacity: response.ipfsData?.capacity || '',
            description: response.ipfsData?.description || '',
            allocation: {
                from: new Date(response.ipfsData?.timeline?.allocation?.from || 0).getTime(),
                to: new Date(response.ipfsData?.timeline?.allocation?.to || 0).getTime(),
            },
            participation: {
                from: new Date(response.ipfsData?.timeline?.participation?.from || 0).getTime(),
                to: new Date(response.ipfsData?.timeline?.participation?.to || 0).getTime(),
            },
            investment: {
                from: new Date(response.ipfsData?.timeline?.investment?.from || 0).getTime(),
                to: new Date(response.ipfsData?.timeline?.investment?.to || 0).getTime(),
            },
        },
        result: {},
    };
}
