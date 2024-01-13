import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Cache } from 'o1js';
import { useEffect } from 'react';

export const FileSystem = (files: any): Cache => ({
    read({ persistentId, uniqueId, dataType }: any) {
        // read current uniqueId, return data if it matches
        if (!files[persistentId]) {
            console.log('=========================================================================');
            console.log('read null file persistentId =>', { persistentId, uniqueId, dataType });
            return undefined;
        }

        const currentId = files[persistentId].header;

        if (currentId !== uniqueId) {
            console.log('=========================================================================');
            console.log('current id did not match persistent id =>', currentId);
            return undefined;
        }

        if (dataType === 'string') {
            // console.log('found in cache', { persistentId, uniqueId, dataType });
            return new TextEncoder().encode(files[persistentId].data);
        }
        // else {
        //   let buffer = readFileSync(resolve(cacheDirectory, persistentId));
        //   return new Uint8Array(buffer.buffer);
        // }

        return undefined;
    },
    write({ persistentId, uniqueId, dataType }: any, data: any) {
        console.log('write =>', { persistentId, uniqueId, dataType });
    },
    canWrite: true,
});

const cacheContractFile = [
    { name: 'lagrange-basis-fp-1024', type: 'string' },
    { name: 'lagrange-basis-fp-16384', type: 'string' },
    { name: 'lagrange-basis-fp-2048', type: 'string' },
    { name: 'lagrange-basis-fp-32768', type: 'string' },
    { name: 'lagrange-basis-fp-512', type: 'string' },
    { name: 'lagrange-basis-fp-65536', type: 'string' },
    { name: 'lagrange-basis-fp-8192', type: 'string' },
    { name: 'lagrange-basis-fq-16384', type: 'string' },
    { name: 'srs-fp-65536', type: 'string' },
    { name: 'srs-fq-32768', type: 'string' },
    { name: 'wrap-vk-projectcontract', type: 'string' },
    { name: 'step-vk-campaigncontract-checkcampaignowner', type: 'string' },
    { name: 'step-vk-campaigncontract-createcampaign', type: 'string' },
    { name: 'step-vk-campaigncontract-rollup', type: 'string' },
    { name: 'step-vk-campaigncontract-updatecampaigninfo', type: 'string' },
    { name: 'step-vk-create-campaign-createcampaign', type: 'string' },
    { name: 'step-vk-create-campaign-firststep', type: 'string' },
    { name: 'step-vk-create-project-firststep', type: 'string' },
    { name: 'step-vk-create-project-nextstep', type: 'string' },
    { name: 'step-vk-join-campaign-createcampaign', type: 'string' },
    { name: 'step-vk-join-campaign-firststep', type: 'string' },
    { name: 'step-vk-join-campaign-joincampaign', type: 'string' },
    { name: 'step-vk-participationcontract-checkparticipationindex', type: 'string' },
    { name: 'step-vk-participationcontract-joincampaign', type: 'string' },
    { name: 'step-vk-participationcontract-rollup', type: 'string' },
    { name: 'step-vk-projectcontract-checkprojectowner', type: 'string' },
    { name: 'step-vk-projectcontract-createproject', type: 'string' },
    { name: 'step-vk-projectcontract-rollup', type: 'string' },
    { name: 'step-vk-projectcontract-updateprojectinfo', type: 'string' },
    { name: 'wrap-vk-campaigncontract', type: 'string' },
    { name: 'wrap-vk-create-campaign', type: 'string' },
    { name: 'wrap-vk-create-project', type: 'string' },
    { name: 'wrap-vk-join-campaign', type: 'string' },
    { name: 'wrap-vk-participationcontract', type: 'string' },
];

function fetchFiles(files: { name: string; type: string }[]) {
    return Promise.all(
        files.map((file) => {
            return Promise.all([fetch(`/Caches/${file.name}.header`).then((res) => res.text()), fetch(`/Caches/${file.name}`).then((res) => res.text())]).then(([header, data]) => ({
                file,
                header,
                data,
            }));
        })
    ).then((cacheList) =>
        cacheList.reduce((acc: any, { file, header, data }) => {
            acc[file.name] = { file, header, data };

            return acc;
        }, {})
    );
}

export type TCacheData = {
    isFetching: boolean;
    filesCache: any;
};
const initData: TCacheData = {
    isFetching: true,
    filesCache: null,
};

const cacheContract = atom<TCacheData>(initData);

export const useCacheContractData = () => useAtomValue(cacheContract);

export const useCacheContractFunction = () => {
    const _setCacheContractData = useSetAtom(cacheContract);

    function setCacheContractData(data: Partial<TCacheData>) {
        _setCacheContractData((prev) => {
            return { ...prev, ...data };
        });
    }

    async function fetchFileCache() {
        setCacheContractData({ isFetching: true });
        try {
            console.log('Fetching file cache....');
            const files = await fetchFiles(cacheContractFile);
            console.log('Fetch file cache done', files);
            setCacheContractData({ filesCache: files, isFetching: false });
        } catch (err) {
            console.log(err);
            setCacheContractData({ filesCache: null, isFetching: false });
        }
    }
    return {
        fetchFileCache,
    };
};

export function InitCache() {
    const { fetchFileCache } = useCacheContractFunction();
    useEffect(() => {
        fetchFileCache();
    }, []);
    return <></>;
}
