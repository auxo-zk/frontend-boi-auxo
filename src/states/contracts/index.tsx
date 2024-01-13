import { atom, useAtom, useAtomValue } from 'jotai';
import { PublicKey } from 'o1js';
import ZkAppWorkerClient from 'src/libs/AppWorker/zkWorkerClient';
import { toast } from 'react-toastify';

export type TContractData = {
    workerClient: ZkAppWorkerClient | null;
    isInitWorker: boolean;
    isLoading: boolean;
};

const initData: TContractData = {
    workerClient: null,
    isInitWorker: true,
    isLoading: false,
};

const appContract = atom<TContractData>(initData);

export const useAppContract = () => useAtomValue(appContract);

export const useAppContractFunction = () => {
    const [zkApp, _setAppContractData] = useAtom(appContract);

    function setAppContractData(data: Partial<TContractData>) {
        return _setAppContractData((prev) => {
            return {
                ...prev,
                ...data,
            };
        });
    }
    async function initClient() {
        setAppContractData({ isInitWorker: true });
        try {
            console.log('Loading web worker...');
            const _zkapp = new ZkAppWorkerClient();
            await _zkapp.loadWorker();
            console.log('Done loading web worker');
            setAppContractData({
                isInitWorker: false,
                workerClient: _zkapp,
            });
        } catch (err) {
            console.log(err);
            setAppContractData({
                isInitWorker: false,
                workerClient: null,
            });
        }
    }

    async function check(id: any) {
        const percent = await zkApp.workerClient?.getPercentageComplieDone();
        if (Number(percent) < 100) {
            toast.update(id, { render: `Compiling contracts...! ${percent}%` });
        } else {
            toast.update(id, { render: `Compiled contract successfully!`, isLoading: false, type: 'success', autoClose: 3000, hideProgressBar: false });
            return true;
        }
        return false;
    }

    async function complie(cacheFiles: any) {
        setAppContractData({ isLoading: true });
        try {
            if (zkApp.workerClient) {
                const idtoast = toast.loading('Compiling contracts...', { position: 'bottom-left' });
                const checkComplie = setInterval(async () => {
                    if (await check(idtoast)) {
                        clearInterval(checkComplie);
                    }
                }, 2000);
                // await zkApp.workerClient.setActiveInstanceToBerkeley();
                await zkApp.workerClient.loadContract();
                await zkApp.workerClient.compileContract(cacheFiles);
                await zkApp.workerClient.initZkappInstance({
                    projectContract: 'B62qoGy5GKNRaa2P8uh4ppdRqnCVjNyHqVSsaD4JMcE6FawLRKmmN4u',
                    campaignContract: 'B62qrqwur3JLNd95w8sKiGLxPEgF9cUs9bfwjytrAXwRxpxWhX78oq9',
                    participationContract: 'B62qqnpYUoCsDYeK71o25roU13WYjPX1HZKQ47UzvzBScXA3n5eQQLi',
                });
                setAppContractData({
                    isLoading: false,
                });
            }
        } catch (err) {
            console.log(err);
            setAppContractData({
                isLoading: false,
            });
        }
    }

    return {
        setAppContractData,
        complie,
        initClient,
    };
};
