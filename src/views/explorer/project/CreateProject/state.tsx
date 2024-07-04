import { atom, useSetAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { KeyProjectInput, MemberDataType, TEditProjectData, createProject, postProjectsToIpfs } from 'src/services/project/api';
import { saveFile } from 'src/services/services';
import { TFileSaved } from 'src/services/type';
import { useAppContract } from 'src/states/contracts';
import { useWalletData } from 'src/states/wallet';

export const projectInitData: TEditProjectData & {
    avatarFile?: File;
    bannerFile?: File;
    documentFiles: { name: string; file: File }[];
} = {
    name: '',
    avatarImage: '',
    coverImage: '',
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
    members: [],
    documents: [],
    documentFiles: [],
};

const createProjectData = atom<
    TEditProjectData & {
        avatarFile?: File;
        bannerFile?: File;
        documentFiles: { name: string; file: File }[];
    }
>(projectInitData);

export const useCreateProjectFunctions = () => {
    const _setProjectData = useSetAtom(createProjectData);
    const projectData = useCreateProjectData();
    const walletData = useWalletData();
    const router = useRouter();
    const { workerClient } = useAppContract();

    const setProjectData = (
        data: Partial<
            TEditProjectData & {
                avatarFile?: File;
                bannerFile?: File;
                documentFiles: { name: string; file: File }[];
            }
        >
    ) => {
        _setProjectData((prev) => ({
            ...prev,
            ...data,
        }));
    };
    const setCustomSection = (data: TEditProjectData['customSections']) => {
        _setProjectData((prev) => ({
            ...prev,
            customSections: {
                ...prev.customSections,
                ...data,
            },
        }));
    };
    const addTeamMember = (data: MemberDataType) => {
        _setProjectData((prev) => ({
            ...prev,
            members: [...prev.members, data],
        }));
    };
    const editTeamMember = (index: number, data: Partial<MemberDataType>) => {
        _setProjectData((prev) => {
            const newMembers = [...prev.members];
            newMembers[index] = {
                ...newMembers[index],
                ...data,
            };
            return {
                ...prev,
                members: newMembers,
            };
        });
    };
    const removeTeamMember = (index: number) => {
        _setProjectData((prev) => {
            const newMembers = [...prev.members];
            newMembers.splice(index, 1);
            return {
                ...prev,
                members: newMembers,
            };
        });
    };

    const addDocumentFiles = (files: { name: string; file: File }[]) => {
        _setProjectData((prev) => {
            return {
                ...prev,
                documentFiles: [...prev.documentFiles, ...files],
            };
        });
    };

    const deleteDocumentFiles = (index: number) => {
        _setProjectData((prev) => {
            const newDoc = [...prev.documentFiles];
            newDoc.splice(index, 1);
            return {
                ...prev,
                documentFiles: newDoc,
            };
        });
    };

    const deleteDocuments = (index: number) => {
        _setProjectData((prev) => {
            const newDoc = [...prev.documents];
            newDoc.splice(index, 1);
            return {
                ...prev,
                documents: newDoc,
            };
        });
    };

    const handleSaveDraftProject = async (id: string | undefined) => {
        let avatarUrl = '';
        let banner = '';
        let documents: TFileSaved[] = [];
        if (projectData.avatarFile) {
            avatarUrl = (await saveFile(projectData.avatarFile)).URL;
        }
        if (projectData.bannerFile) {
            banner = (await saveFile(projectData.bannerFile)).URL;
        }
        if (projectData.documentFiles.length > 0) {
            documents = await Promise.all(projectData.documentFiles.map((i) => saveFile(i.file)));
        }
        const result = await createProject(id, walletData.userAddress, {
            ...projectData,
            avatarImage: avatarUrl || projectData.avatarImage || '',
            coverImage: banner || projectData.coverImage || '',
            documents: [...projectData.documents, ...documents],
        });
        toast('Create Project Success', { type: 'success' });
        resetProjectData();
    };
    const checkData = () => {
        if (!projectData.name) {
            return { valid: false, message: 'Project Name' };
        }
        if (!projectData.publicKey) {
            return { valid: false, message: 'Project PublicKey' };
        }
        if (!projectData.overViewDescription) {
            return { valid: false, message: 'Overview Description' };
        }
        if (!projectData.problemStatement) {
            return { valid: false, message: 'Problem Statement' };
        }
        if (!projectData.solution) {
            return { valid: false, message: 'Solution' };
        }
        if (!projectData.challengeAndRisk) {
            return { valid: false, message: 'Challenge and risk' };
        }
        return { valid: true, message: '' };
    };

    const handleSubmitProject = async () => {
        const idtoast = toast.loading('Create transaction and proving...', { position: 'top-center', type: 'info' });
        try {
            if (!walletData.userAddress) {
                throw Error('Login');
            }
            if (workerClient === null) {
                throw Error('Worker client failed');
            }
            const checkResult = checkData();
            if (!checkResult.valid) {
                throw Error(`Missing input: ${checkResult.message}`);
            }
            if (!(await workerClient.checkValidAddress(projectData.publicKey))) {
                throw Error(`Project PublicKey is invalid!`);
            }
            //safe image and file
            //avatar and banner
            let avatarUrl = '';
            let bannerUrl = '';
            let documentUrls: TFileSaved[] = [];

            if (projectData.avatarFile) {
                avatarUrl = (await saveFile(projectData.avatarFile)).URL;
            } else {
                if (projectData.avatarImage) {
                    avatarUrl = projectData.avatarImage;
                } else {
                    throw Error('Avatar required!');
                }
            }

            if (projectData.bannerFile) {
                bannerUrl = (await saveFile(projectData.bannerFile)).URL;
            } else {
                if (projectData.coverImage) {
                    bannerUrl = projectData.coverImage;
                } else {
                    throw Error('Banner required!');
                }
            }

            console.log({ bannerUrl, avatarUrl });

            documentUrls = await Promise.all(projectData.documentFiles.map((i) => saveFile(i.file)));

            const ipfsData = await postProjectsToIpfs({
                description: projectData.overViewDescription,
                documents: [...projectData.documents, ...documentUrls],
                avatarImage: avatarUrl,
                coverImage: bannerUrl,
                members: projectData.members.map((member) => ({
                    name: member.profileName,
                    link: member.socialLink,
                    role: member.role,
                    publicKey: member.publicKey,
                })),
                name: projectData.name,
                publicKey: projectData.publicKey,
                [KeyProjectInput.challengesAndRisks]: projectData.challengeAndRisk,
                [KeyProjectInput.problemStatement]: projectData.problemStatement,
                [KeyProjectInput.solution]: projectData.solution,
            });
            const result = await workerClient.submitProject({
                sender: walletData.userAddress,
                ipfsHash: ipfsData.Hash,
                members: [walletData.userAddress],
                projectId: '',
                treasuryAddress58: projectData.publicKey,
            });

            await workerClient.proveTransaction();
            const transactionJSON = await workerClient.getTransactionJSON();
            console.log(transactionJSON);
            toast.update(idtoast, { render: 'Prove successfull! Sending the transaction...' });
            const { transactionLink } = await workerClient.sendTransaction(transactionJSON);
            console.log(transactionLink);
            toast.update(idtoast, { render: 'Send transaction successfull!', isLoading: false, type: 'success', autoClose: 3000, hideProgressBar: false });
            router.push('/profile');
        } catch (error) {
            console.log(error);
            toast.update(idtoast, { render: (error as Error).message, type: 'error', position: 'top-center', isLoading: false, autoClose: 5000, hideProgressBar: false });
        }
    };

    const resetProjectData = () => {
        setProjectData(projectInitData);
    };
    return {
        setProjectData,
        setCustomSection,
        addTeamMember,
        handleSaveDraftProject,
        handleSubmitProject,
        addDocumentFiles,
        deleteDocumentFiles,
        resetProjectData,
        deleteDocuments,
        editTeamMember,
        removeTeamMember,
    };
};

export const useCreateProjectData = () => useAtomValue(createProjectData);
