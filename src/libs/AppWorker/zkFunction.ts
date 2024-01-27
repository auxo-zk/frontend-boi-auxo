import { Field, Mina, PublicKey, fetchAccount } from 'o1js';

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

import { ZkApp, Storage } from '@auxo-dev/platform';
import { ArgumentTypes } from 'src/global.config';
import { FileSystem } from 'src/states/cache';
import { IPFSHash } from '@auxo-dev/auxo-libs';
import { BaseMerkleWitness, Witness } from 'o1js/dist/node/lib/merkle_tree';
import { TWitness } from 'src/services/services';

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
        // const Berkeley = Mina.Network('https://proxy.berkeley.minaexplorer.com/graphql');
        const Berkeley = Mina.Network('https://api.minascan.io/node/berkeley/v1/graphql');
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

    submitProject: async (args: { sender: string; projectId: string; members: string[]; ipfsHash: string; projectPubBase58: string }) => {
        const sender = PublicKey.fromBase58(args.sender);
        await fetchAccount({ publicKey: sender });
        await fetchAccount({ publicKey: state.ProjectContract!.address });

        const transaction = await Mina.transaction(sender, () => {
            state.ProjectContract!.createProject({
                members: new Storage.ProjectStorage.MemberArray(args.members.map((mem) => PublicKey.fromBase58(mem))),
                ipfsHash: IPFSHash.fromString(args.ipfsHash),
                payeeAccount: PublicKey.fromBase58(args.projectPubBase58),
            });
        });
        state.transaction = transaction;
    },
    joinCampaign: async (args: {
        sender: string;
        campaignId: string;
        projectId: string;
        participationInfo: string;
        lv1CWitness: TWitness;
        memberLv1Witness: TWitness;
        memberLv2Witness: TWitness;
        projectRef: { addressWitness: TWitness };
    }) => {
        const sender = PublicKey.fromBase58(args.sender);
        await fetchAccount({ publicKey: sender });

        // const indexWitness =  Storage.ParticipationStorage.IndexStorage.calculateLevel1Index({
        //     campaignId: new Field(args.campaignId),
        //     projectId: new Field(args.projectId),
        // })
        const transaction = await Mina.transaction(sender, () => {
            state.ParticipationContract!.joinCampaign({
                campaignId: new Field(args.campaignId),
                projectId: new Field(args.projectId),
                indexWitness: Storage.ParticipationStorage.Level1CWitness.fromJSON(args.lv1CWitness),
                memberLv1Witness: Storage.ProjectStorage.Level1Witness.fromJSON(args.memberLv1Witness),
                memberLv2Witness: Storage.ProjectStorage.Level2Witness.fromJSON(args.memberLv2Witness),
                participationInfo: IPFSHash.fromString(args.participationInfo),
                projectRef: new Storage.SharedStorage.ZkAppRef({
                    address: state.ProjectContract!.address,
                    witness: Storage.SharedStorage.AddressWitness.fromJSON(args.projectRef.addressWitness),
                }),
            });
        });
        state.transaction = transaction;
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
