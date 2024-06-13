import { url } from 'inspector';
import { apiUrl } from '../url';
import axios from 'axios';
import { getJwt } from '../project/api';

export type TProfileData = {
    address: string;
    name: string;
    role: string;
    link: string;
    description: string;
    img: string;
};

export async function getUserProfile(address: string): Promise<TProfileData> {
    const response: any = (await axios.get(apiUrl.getUserProfile + `/${address}`)).data;
    return {
        address: response.address,
        name: response.name || '',
        description: response.description || '',
        img: response.img?.URL || '',
        link: response.link || '',
        role: response.role || '',
    };
}
export type TProfileInput = {
    name: string;
    link: string;
    description: string;
    role: string;
};
export type TEditResult = {
    address: string;
    name: string;
    link: string;
    description: string;
    img: string;
};
export async function postProfileInfo(input: TProfileInput): Promise<TEditResult> {
    const jwt = getJwt();
    const response: any = await axios.post(apiUrl.editProfile, input, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });
    return response;
}

export async function postProfileAvatar(input: File): Promise<string> {
    const jwt = getJwt();
    const formData = new FormData();
    formData.append('avatar', input);
    const result: any = await axios.post(apiUrl.editProfileImage, formData, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });
    return result.URL;
}

export async function verifyJwt() {
    const jwt = getJwt();
    await axios.get(apiUrl.checkJwt, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });
    return true;
}
