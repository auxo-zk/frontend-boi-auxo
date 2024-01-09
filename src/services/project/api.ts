import axios from 'axios';
import { apiUrl } from '../url';

// export type TProjectData = { name: string; date: string; desc: string };
export type TProjectData = {
    // projectId: string;
    // members: string[];
    // payeeAccount: 'string';
    // ipfsHash: 'string';
    // ipfsData: {
    //     name: string;
    //     publicKey: string;
    //     description: string;
    //     problemStatement: string;
    //     solution: string;
    //     challengesAndRisks: string;
    //     members: {
    //         name: string;
    //         role: string;
    //         link: string;
    //     }[];
    //     documents: any[];
    // };
    // active: true;
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
