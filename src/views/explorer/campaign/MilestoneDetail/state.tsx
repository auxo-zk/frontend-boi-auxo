import { Constants } from '@auxo-dev/platform';
import { atom, useSetAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { TCampaignQuestion } from 'src/services/campaign/api';
import { TScopeOfWorks, getDataParticipateCampaign, postProjectparticipation, saveFile } from 'src/services/services';
import { useAppContract } from 'src/states/contracts';
import { useWalletData } from 'src/states/wallet';

export type MilestoneData = {
    projectImg: string;
    campaignBanner: string;
    campaignId: string;
    campaignQuestions: (TCampaignQuestion & { answer: string })[];
    scopeOfWorks: (TScopeOfWorks & { id: string })[];
    projectData: {
        problemStatement: string;
        solution: string;
        challengeAndRisk: string;
        projectId: string;
        customAnswer?: string;
    };
    documentFiles: { name: string; file: File }[];
};

export const projectInitData: MilestoneData = {
    projectImg: '',
    campaignBanner: '',
    campaignId: '',
    campaignQuestions: [],
    scopeOfWorks: [
        {
            id: Date.now().toString(),
            information: '',
            milestone: '',
            raisingAmount: '0',
            deadline: Date.now().toLocaleString(),
        },
    ],
    projectData: {
        problemStatement: '',
        solution: '',
        challengeAndRisk: '',
        customAnswer: '',
        projectId: '',
    },
    documentFiles: [],
};

const mileStoneData = atom<MilestoneData>(projectInitData);

export const useMilestoneFunctions = () => {
    const _setMilestoneData = useSetAtom(mileStoneData);
    const { campaignId, projectData, campaignQuestions, scopeOfWorks, documentFiles } = useMilestoneData();
    const { userAddress } = useWalletData();
    const { workerClient } = useAppContract();

    const setMilestoneData = (data: Partial<MilestoneData>) => {
        _setMilestoneData((prev) => ({
            ...prev,
            ...data,
        }));
    };

    function setAnswerQuestionCampaign(index: number, value: string) {
        _setMilestoneData((prev) => ({
            ...prev,
            campaignQuestions: prev.campaignQuestions.map((item, i) => (i === index ? { ...item, answer: value } : item)),
        }));
    }

    function addScopeOfWork(data: MilestoneData['scopeOfWorks'][number]) {
        _setMilestoneData((prev) => ({
            ...prev,
            scopeOfWorks: [...prev.scopeOfWorks, data],
        }));
    }
    function editScopeOfWork(index: number, data: Partial<MilestoneData['scopeOfWorks'][number]>) {
        _setMilestoneData((prev) => ({
            ...prev,
            scopeOfWorks: prev.scopeOfWorks.map((item, i) => (i === index ? { ...item, ...data } : item)),
        }));
    }
    function deleteScopeOfWork(index: number) {
        _setMilestoneData((prev) => ({
            ...prev,
            scopeOfWorks: prev.scopeOfWorks.filter((_, i) => i !== index),
        }));
    }

    const addDocumentFiles = (files: { name: string; file: File }[]) => {
        _setMilestoneData((prev) => {
            return {
                ...prev,
                documentFiles: [...prev.documentFiles, ...files],
            };
        });
    };
    const deleteDocumentFiles = (index: number) => {
        _setMilestoneData((prev) => {
            const newDoc = [...prev.documentFiles];
            newDoc.splice(index, 1);
            return {
                ...prev,
                documentFiles: newDoc,
            };
        });
    };

    const handleSubmitProject = async () => {
        const idtoast = toast.loading('Create transaction and proving...', { position: 'top-center', type: 'info' });
        try {
            if (!userAddress) throw Error('Please connect your wallet first!');
            if (!workerClient) throw Error('Worker client is dead, reload page again!');
            const documents = await Promise.all(documentFiles.map((i) => saveFile(i.file)));

            const postResult = await postProjectparticipation(projectData.projectId, {
                answers: campaignQuestions.map((i) => {
                    return i.answer || '';
                }),
                documents: documents,
                scopeOfWorks: scopeOfWorks.map((i) => ({
                    deadline: i.deadline || '',
                    information: i.information,
                    milestone: i.milestone,
                    raisingAmount: i.raisingAmount,
                })),
            });

            const dataBackend = await getDataParticipateCampaign(campaignId, projectData.projectId);
            await workerClient.joinCampaign({
                campaignId: campaignId,
                projectId: projectData.projectId,
                sender: userAddress,
                participationInfo: String(postResult.Hash),
                dataBackend: dataBackend,
            });
            await workerClient.proveTransaction();

            toast.update(idtoast, { render: 'Prove successfull! Sending the transaction...' });
            const transactionJSON = await workerClient.getTransactionJSON();
            console.log(transactionJSON);

            const { transactionLink } = await workerClient.sendTransaction(transactionJSON);
            console.log(transactionLink);

            toast.update(idtoast, { render: 'Send transaction successfull!', isLoading: false, type: 'success', autoClose: 3000, hideProgressBar: false });
        } catch (err) {
            console.log(err);
            toast.update(idtoast, { render: (err as Error).message, type: 'error', position: 'top-center', isLoading: false, autoClose: 3000, hideProgressBar: false });
        }
    };

    return {
        setMilestoneData,
        setAnswerQuestionCampaign,
        addScopeOfWork,
        editScopeOfWork,
        deleteScopeOfWork,
        handleSubmitProject,
        addDocumentFiles,
        deleteDocumentFiles,
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
