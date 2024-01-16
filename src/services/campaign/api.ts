import axios from 'axios';
import { apiUrl } from '../url';
import { BACKEND_BASE_URL } from '../baseUrl';

export type TCampaignData = { name: string; type: string; date: string; capacity: string; img?: string; banner?: string; status?: number };
export const apiLatestFundingCampaigns = '';
export async function getLatestFundingCampaigns(): Promise<TCampaignData[]> {
    const response: any[] = (await axios.get(apiUrl.getCampaign + '?owner=B62qmtfTkHLzmvoKYcTLPeqvuVatnB6wtnXsP6jrEi6i2eUEjcxWauH')).data;

    return response.map((item) => ({
        name: item.ipfsData.name || '',
        type: 'Public, grans',
        capacity: String(item.ipfsData.capacity || ''),
        date: new Date().toLocaleDateString(),
        img: item.ipfsData.img || '',
        banner: '',
        status: item.status || 0,
    }));
}

export type TCampaignDetailOverview = {
    organizer: string;
    capacity: string;
    description: string;
    application: {
        from: string;
        to: string;
    };
    investment: {
        from: string;
        to: string;
    };
    allocation: {
        from: string;
        to: string;
    };
};
export type TCampaignResult = {};
export type TCampaignDetail = {
    name: string;
    banner?: string;
    overview: TCampaignDetailOverview;
    result: TCampaignResult;
};
export async function getCampaignOverview(campaignId: string): Promise<TCampaignDetail> {
    const responseOverview: any = (await axios.get(apiUrl.campaignDetail + `/${campaignId}`)).data;
    // const responseResult: any = (await axios.get(apiUrl.campaignDetail + `/${campaignId}/result`)).data;
    return {
        name: responseOverview.ipfsData.name,
        banner: '',
        overview: {
            organizer: responseOverview.owner,
            capacity: responseOverview.ipfsData.capacity,
            description: responseOverview.ipfsData.description,
            allocation: responseOverview.ipfsData?.timeline?.allocation || '',
            application: responseOverview.ipfsData?.timeline?.application || '',
            investment: responseOverview.ipfsData?.timeline?.investment || '',
        },
        result: {},
    };
}
