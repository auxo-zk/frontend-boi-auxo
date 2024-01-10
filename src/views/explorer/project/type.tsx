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
        [id: string]: {
            profileName: string;
            role: string;
            socialLink: string;
        };
    };
    additionalDocument?: any;
};

export const projectInitData: ProjectDataType = {
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
    teamMember: {
        root: {
            profileName: 'You',
            role: 'Product Owner',
            socialLink: '',
        },
    },
    additionalDocument: {},
};
