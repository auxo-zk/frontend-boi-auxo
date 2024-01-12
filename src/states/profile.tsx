import { atom, useAtomValue, useSetAtom } from 'jotai';
import { TProfileData } from 'src/services/profile/api';

const profileInitData: TProfileData = {
    address: '',
    description: '',
    img: '',
    link: '',
    name: '',
    role: '',
};

const profileData = atom<TProfileData>(profileInitData);

const useProfileData = () => useAtomValue(profileData);

const useProfileFunction = () => {
    const _setProfileData = useSetAtom(profileData);

    const setProfileData = (data: Partial<TProfileData>) => {
        _setProfileData((prev) => {
            return {
                ...prev,
                ...data,
            };
        });
    };
    const changeProfileImage = async () => {};
    const updateprofile = async () => {};
    return { setProfileData };
};
