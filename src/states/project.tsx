import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

export type ProjectDataType = {
    name: string;
    banner: string;
    publicKey: string;
    overViewDescription: string;
    problemStatement: string;
    solution: string;
    challengeAndRisk: string;
    customSections: {
        [key: string]: {
            title: string;
            description?: string;
        };
    };
    teamMember?: {
        profileName: string;
        role: string;
        socialLink: string;
    }[];
    additionalDocument?: any;
};

const initData: ProjectDataType = {
    name: '',
    banner: '',
    publicKey: '',
    overViewDescription: '',
    problemStatement: '',
    solution: '',
    challengeAndRisk: '',
    customSections: {
        '0': {
            title: '',
            description: '',
        },
    },
    teamMember: [
        {
            profileName: '',
            role: '',
            socialLink: '',
        },
    ],
    additionalDocument: {},
};

const projectData = atom<ProjectDataType>(initData);

export default function InitProjectData({ data }: { data?: ProjectDataType }) {
    const setProjectData = useSetAtom(projectData);
    setProjectData(data || initData);
}
export const useProjectFunctions = () => {
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
    return {
        setProjectData,
        setCustomSection,
    };
};

export const useProjectData = () => useAtomValue(projectData);
