import { Mina, PublicKey, fetchAccount } from 'o1js';

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

import type { ZkApp } from '@auxo-dev/platform';
import { ArgumentTypes } from 'src/global.config';
import { FileSystem } from 'src/states/cache';

const state = {
    TypeZkApp: null as null | typeof ZkApp,
    ProjectContract: null as null | ZkApp.Project.ProjectContract,
    CampaignContract: null as null | ZkApp.Campaign.CampaignContract,
    ParticipationContract: null as null | ZkApp.Participation.ParticipationContract,
    transaction: null as null | Transaction,
    complieDone: 0 as number,
};

// ---------------------------------------------------------------------------------------

export const zkFunctions = {
    setActiveInstanceToBerkeley: async (args: {}) => {
        const Berkeley = Mina.Network('https://proxy.berkeley.minaexplorer.com/graphql');
        console.log('Berkeley Instance Created');
        Mina.setActiveInstance(Berkeley);
    },
    loadContract: async (args: {}) => {
        const { ZkApp } = await import('@auxo-dev/platform');
        state.TypeZkApp = ZkApp;
    },
    getPercentageComplieDone: async (args: {}) => {
        return ((state.complieDone / 6) * 100).toFixed(0);
    },
    compileContract: async (args: { fileCache: any }) => {
        await state.TypeZkApp!.Project.CreateProject.compile({ cache: FileSystem(args.fileCache) }); // 1
        console.log('complie CreateProject done');
        state.complieDone += 1;

        await state.TypeZkApp!.Project.ProjectContract.compile({ cache: FileSystem(args.fileCache) }); // 2
        console.log('complie ProjectContract done');
        state.complieDone += 1;

        await state.TypeZkApp!.Campaign.CreateCampaign.compile({ cache: FileSystem(args.fileCache) }); // 3
        console.log('complie CreateCampaign done');
        state.complieDone += 1;

        await state.TypeZkApp!.Campaign.CampaignContract.compile({ cache: FileSystem(args.fileCache) }); // 4
        console.log('complie CampaignContract done');
        state.complieDone += 1;

        await state.TypeZkApp!.Participation.JoinCampaign.compile({ cache: FileSystem(args.fileCache) }); // 5
        console.log('complie JoinCampaign done');
        state.complieDone += 1;

        await state.TypeZkApp!.Participation.ParticipationContract.compile({ cache: FileSystem(args.fileCache) }); // 6
        console.log('complie JoinCampaign done');
        state.complieDone += 1;
    },
    fetchAccount: async (args: { publicKey58: string }) => {
        const publicKey = PublicKey.fromBase58(args.publicKey58);
        return await fetchAccount({ publicKey });
    },
    initZkappInstance: async (args: { projectContract: string; campaignContract: string; participationContract: string }) => {
        const projectContractPub = PublicKey.fromBase58(args.projectContract);
        state.ProjectContract = new state.TypeZkApp!.Project.ProjectContract!(projectContractPub);

        const campaignContractPub = PublicKey.fromBase58(args.campaignContract);
        state.CampaignContract = new state.TypeZkApp!.Campaign.CampaignContract!(campaignContractPub);

        const participationContractPub = PublicKey.fromBase58(args.participationContract);
        state.ParticipationContract = new state.TypeZkApp!.Participation.ParticipationContract!(participationContractPub);
    },

    proveTransaction: async (args: {}) => {
        await state.transaction!.prove();
    },
    getTransactionJSON: async (args: {}) => {
        return state.transaction!.toJSON();
    },
};

export type TZkFuction = keyof typeof zkFunctions;
// ---------------------------------------------------------------------------------------
export type ArgumentZkFuction<NameFunction extends TZkFuction> = ArgumentTypes<(typeof zkFunctions)[NameFunction]>['0'];
export type ReturenValueZkFunction<NameFunction extends TZkFuction> = ReturnType<(typeof zkFunctions)[NameFunction]>;

// export type TCallEvent<NameFunction extends TZkFuction> = (fn: NameFunction, args: ArgumentTypes<(typeof zkFunctions)[NameFunction]>['0']) => ReturnType<(typeof zkFunctions)[NameFunction]>;
