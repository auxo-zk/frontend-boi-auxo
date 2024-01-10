import { atom, useSetAtom, useAtomValue } from 'jotai';
import { ProjectDataType, projectInitData } from '../type';

const projectData = atom<ProjectDataType>(projectInitData);

export const useCreateProjectFunctions = () => {
    const _setProjectData = useSetAtom(projectData);

    const setProjectData = (data: Partial<ProjectDataType>) => {
        _setProjectData((prev) => ({
            ...prev,
            ...data,
        }));
    };

    const setCustomSection = (data: ProjectDataType['customSections']) => {
        _setProjectData((prev) => ({
            ...prev,
            customSections: {
                ...prev.customSections,
                ...data,
            },
        }));
    };
    const setTeamMember = (data: ProjectDataType['teamMember']) => {
        _setProjectData((prev) => ({
            ...prev,
            teamMember: {
                ...prev.teamMember,
                ...data,
            },
        }));
    };
    return {
        setProjectData,
        setCustomSection,
        setTeamMember,
    };
};

export const useCreateProjectData = () => useAtomValue(projectData);
