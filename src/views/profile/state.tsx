import { atom, useAtomValue, useSetAtom } from 'jotai';
import { ProjectMetaData, getDraftProject, getUserProject } from 'src/services/project/api';
import { useWalletData } from 'src/states/wallet';

export type TProfileProjects = { ownerProject: { project: ProjectMetaData[]; draft: ProjectMetaData[] }; participatingProject: ProjectMetaData[] };
const initData: TProfileProjects = {
    ownerProject: { project: [], draft: [] },
    participatingProject: [],
};

const profileProjects = atom<TProfileProjects>(initData);

export const useProfileProjectsData = () => useAtomValue(profileProjects);

export const useProfileProjectsFunction = () => {
    const _setProfileProjects = useSetAtom(profileProjects);
    const profileProjectsData = useProfileProjectsData();
    const { userAddress } = useWalletData();
    const setProfileProjects = (data: Partial<TProfileProjects>) => {
        _setProfileProjects((prev) => {
            return {
                ...prev,
                ...data,
            };
        });
    };
    const fetchDraft = async () => {
        const res = await getDraftProject();
        setProfileProjects({ ownerProject: { draft: res, project: profileProjectsData.ownerProject.project } });
    };
    const fetchProject = async () => {
        const res = await getUserProject(userAddress);
        setProfileProjects({ ownerProject: { project: res, draft: profileProjectsData.ownerProject.draft } });
    };
    return { fetchDraft, fetchProject };
};
