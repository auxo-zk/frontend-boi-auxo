import { atom, useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { TProfileInput, getUserProfile, postProfileAvatar, postProfileInfo } from 'src/services/profile/api';
import { ProjectMetaData, getDraftProject, getUserProject } from 'src/services/project/api';
import { useWalletData } from 'src/states/wallet';

export type TProfile = {
    project: ProjectMetaData[];
    draft: ProjectMetaData[];
    participatingProject: ProjectMetaData[];
    address: string;
    name: string;
    website: string;
    description: string;
    role: string;
    img: string;
    imgFile?: File;
};
const initData: TProfile = {
    project: [],
    draft: [],
    participatingProject: [],
    address: '',
    name: '',
    website: '',
    description: '',
    img: '',
    role: '',
};

const profileProjects = atom<TProfile>(initData);

export const useProfileData = () => useAtomValue(profileProjects);

export const useProfileFunction = () => {
    const _setProfileProjects = useSetAtom(profileProjects);
    const profileProjectsData = useProfileData();
    const { imgFile } = useProfileData();
    const { userAddress } = useWalletData();
    const setProfileData = (data: Partial<TProfile>) => {
        _setProfileProjects((prev) => {
            return {
                ...prev,
                ...data,
            };
        });
    };
    const fetchDraft = async () => {
        const res = await getDraftProject();
        setProfileData({ draft: res });
    };
    const fetchProject = async () => {
        const res = await getUserProject(userAddress);
        setProfileData({ project: res });
    };
    const getProfileData = useCallback(async () => {
        if (userAddress) {
            try {
                const result = await getUserProfile(userAddress);
                console.log('🚀 ~ getProfileData ~ userAddress:', userAddress);
                console.log('🚀 ~ getProfileData ~ result:', result);
                setProfileData({
                    address: userAddress,
                    description: result.description,
                    img: result.img,
                    name: result.name,
                });
            } catch (error) {}
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAddress]);

    const submitProfileInfo = async (input: TProfileInput) => {
        try {
            const result = await postProfileInfo(input);
            toast('Edit Profile Successfully: ', { type: 'success' });
            return result;
        } catch (error) {
            toast('Edit Profile Failed: ' + (error as Error).message, { type: 'error' });
        }
    };

    const submitProfileAvatar = async (imgFile: File) => {
        try {
            const result = await postProfileAvatar(imgFile);
            toast('Edit Profile Avatar Successfully: ', { type: 'success' });
            return result;
        } catch (error) {
            toast('Edit Profile Avatar Failed: ' + (error as Error).message, { type: 'error' });
        }
    };
    return { fetchDraft, fetchProject, setProfileData, submitProfileInfo, submitProfileAvatar, getProfileData };
};
