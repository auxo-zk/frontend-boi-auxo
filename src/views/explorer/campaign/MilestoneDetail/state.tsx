import { atom, useSetAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppContract } from 'src/states/contracts';
import { useWalletData } from 'src/states/wallet';

export type MilestoneData = {
    projectImg: string;
    campaignBanner: string;
    campaignQuestions: {
        [id: string]: {
            question: string;
            hint: string;
            required: boolean;
            answer?: string;
        };
    };
    scopeOfWorks: {
        [id: string]: {
            information: string;
            milestone: string;
            raisingAmount: string;
            deadline?: number;
        };
    };
    projectData: {
        problemStatement: string;
        solution: string;
        challengeAndRisk: string;
        customAnswer?: string;
    };
};

export const projectInitData: MilestoneData = {
    projectImg: '',
    campaignBanner: '',
    campaignQuestions: {
        '0': {
            question: 'Test1',
            hint: '',
            required: false,
            answer: '',
        },
        '1': {
            question: 'test2',
            hint: '',
            required: false,
            answer: '',
        },
    },
    scopeOfWorks: {
        '0': {
            information: '',
            milestone: '',
            raisingAmount: '',
            deadline: Date.now(),
        },
        '1': {
            information: '',
            milestone: '',
            raisingAmount: '',
            deadline: Date.now(),
        },
    },
    projectData: {
        problemStatement: '',
        solution: '',
        challengeAndRisk: '',
        customAnswer: '',
    },
};

const mileStoneData = atom<MilestoneData>(projectInitData);

export const useMilestoneFunctions = () => {
    const _setMilestoneData = useSetAtom(mileStoneData);
    const milestoneData = useMilestoneData();
    const walletData = useWalletData();
    const { workerClient } = useAppContract();

    const setMilestoneData = (
        data: Partial<
            MilestoneData & {
                avatarFile?: Blob | MediaSource;
                bannerFile?: Blob | MediaSource;
            }
        >
    ) => {
        _setMilestoneData((prev) => ({
            ...prev,
            ...data,
        }));
    };
    const setCampaignQuestions = (data: MilestoneData['campaignQuestions']) => {
        _setMilestoneData((prev) => ({
            ...prev,
            campaignQuestions: {
                ...prev.campaignQuestions,
                ...data,
            },
        }));
    };
    const setScopeOfWorks = (data: MilestoneData['scopeOfWorks']) => {
        _setMilestoneData((prev) => ({
            ...prev,
            scopeOfWorks: {
                ...prev.scopeOfWorks,
                ...data,
            },
        }));
    };
    // const handleCreateProject = async () => {
    //     try {
    //         const result = await createProject(walletData.userAddress, projectData);
    //         toast('Create Project Success', { type: 'success' });
    //     } catch (error) {
    //         toast('There was an error creating project', { type: 'error' });
    //     }
    // };
    // const checkData = () => {
    //     if (!projectData.name) {
    //         return { valid: false, message: 'Project Name' };
    //     }
    //     if (!projectData.publicKey) {
    //         return { valid: false, message: 'Project PublicKey' };
    //     }
    //     if (!projectData.overViewDescription) {
    //         return { valid: false, message: 'Overview Description' };
    //     }
    //     if (!projectData.problemStatement) {
    //         return { valid: false, message: 'Problem Statement' };
    //     }
    //     if (!projectData.solution) {
    //         return { valid: false, message: 'Solution' };
    //     }
    //     if (!projectData.challengeAndRisk) {
    //         return { valid: false, message: 'Challenge and risk' };
    //     }
    //     return { valid: true, message: '' };
    // };

    // const handleSubmitProject = async () => {
    //     const idtoast = toast.loading('Create transaction and proving...', { position: 'top-center', type: 'info' });
    //     try {
    //         if (!walletData.userAddress) {
    //             throw Error('Login');
    //         }
    //         if (workerClient === null) {
    //             throw Error('Worker client failed');
    //         }
    //         const checkResult = checkData();
    //         if (!checkResult.valid) {
    //             throw Error(`Missing input: ${checkResult.message}`);
    //         }
    //         // const ipfsData = await postProjectsToIpfs({
    //         //     description: projectData.overViewDescription,
    //         //     documents: ['https://storage.googleapis.com/auxo/de373f009ca62b59aef619ec35b826c5e517d738234d39bff64b9a00e40559f5.png'],
    //         //     avatarImage: 'https://storage.googleapis.com/auxo/de373f009ca62b59aef619ec35b826c5e517d738234d39bff64b9a00e40559f5.png',
    //         //     coverImage: 'https://storage.googleapis.com/auxo/de373f009ca62b59aef619ec35b826c5e517d738234d39bff64b9a00e40559f5.png',
    //         //     members: Object.values(projectData.teamMember || {}).map((member) => ({
    //         //         name: member.profileName,
    //         //         link: member.socialLink,
    //         //         role: member.role,
    //         //     })),
    //         //     name: projectData.name,
    //         //     publicKey: projectData.publicKey,
    //         // });
    //         const result = await workerClient.submitProject({
    //             sender: walletData.userAddress,
    //             ipfsHash: String(ipfsData.Hash),
    //             members: [walletData.userAddress],
    //             projectId: '',
    //             projectPubBase58: projectData.publicKey,
    //         });

    //         await workerClient.proveTransaction();
    //         const transactionJSON = await workerClient.getTransactionJSON();
    //         console.log(transactionJSON);
    //         toast.update(idtoast, { render: 'Prove successfull! Sending the transaction...' });
    //         const { transactionLink } = await workerClient.sendTransaction(transactionJSON);
    //         console.log(transactionLink);
    //         toast.update(idtoast, { render: 'Send transaction successfull!', isLoading: false, type: 'success', autoClose: 3000, hideProgressBar: false });
    //     } catch (error) {
    //         if (idtoast) {
    //             toast.update(idtoast, { render: (error as Error).message, type: 'error', position: 'top-center', isLoading: false, autoClose: 3000, hideProgressBar: false });
    //         }
    //     }
    // };
    return {
        setMilestoneData,
        setCampaignQuestions,
        setScopeOfWorks,
        // handleCreateProject,
        // handleSubmitProject,
    };
};

export const InitMileStoneData = ({ data }: { data: MilestoneData }) => {
    const { setMilestoneData } = useMilestoneFunctions();
    useEffect(() => {
        setMilestoneData(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    return;
};
export const useMilestoneData = () => useAtomValue(mileStoneData);
