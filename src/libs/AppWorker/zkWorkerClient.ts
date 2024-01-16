import { sleep } from 'src/utils/format';
import { ZkappWorkerReponse, ZkappWorkerRequest } from './worker';
import { ArgumentZkFuction, ReturenValueZkFunction, TZkFuction } from './zkFunction';

export default class ZkAppWorkerClient {
    worker: Worker;

    promises: { [id: number]: { resolve: (res: any) => void; reject: (err: any) => void } };

    nextId: number;

    constructor() {
        this.worker = new Worker(new URL('./worker.ts', import.meta.url));
        this.promises = {};
        this.nextId = 0;

        this.worker.onmessage = (event: MessageEvent<ZkappWorkerReponse>) => {
            if (event.data.status == 'failed') {
                this.promises[event.data.id].reject(event.data.error);
                delete this.promises[event.data.id];
            } else {
                this.promises[event.data.id].resolve(event.data.data);
                delete this.promises[event.data.id];
            }
        };
    }
    async loadWorker(): Promise<void> {
        await sleep(4100);
    }

    _call<Key extends TZkFuction>(fn: Key, args: ArgumentZkFuction<Key>): ReturenValueZkFunction<Key> {
        return new Promise((resolve, reject) => {
            this.promises[this.nextId] = { resolve, reject };
            const message: ZkappWorkerRequest = { id: this.nextId, fn, args };
            this.worker.postMessage(message);
            this.nextId++;
        }) as ReturenValueZkFunction<Key>;
    }

    setActiveInstanceToBerkeley() {
        return this._call('setActiveInstanceToBerkeley', {});
    }
    loadContract() {
        console.log('Loading contract');
        return this._call('loadContract', {});
    }
    compileContract(fileCache: any) {
        return this._call('compileContract', { fileCache });
    }
    fetchAccount(publicKey58: string) {
        return this._call('fetchAccount', { publicKey58 });
    }
    initZkappInstance(args: ArgumentZkFuction<'initZkappInstance'>) {
        return this._call('initZkappInstance', args);
    }
    getPercentageComplieDone() {
        return this._call('getPercentageComplieDone', {});
    }

    proveTransaction() {
        return this._call('proveTransaction', {});
    }
    getTransactionJSON() {
        return this._call('getTransactionJSON', {});
    }
    submitProject(args: ArgumentZkFuction<'submitProject'>) {
        return this._call('submitProject', args);
    }
}
