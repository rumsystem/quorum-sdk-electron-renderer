import Database from './database';

import Node from './node';

import _Object from './object';

import Group from './group';

import { sendRequest, ProcessStatus, initQuorum } from './utils/quorumUtils';

import Test from './test';

export interface IStore {
  db: Database
  port: number
}

export interface UpParam {
  bootstraps?: string[]
  storagePath: string
  password: string
}

export default class QuorumClient {

  store: IStore

  Node: Node

  Object: _Object

  Group: Group

  constructor() {
    this.store = {} as IStore;
    this.store.db = new Database();
    this.store.db.open();
    
    this.Node = new Node(this.store);
    this.Object = new _Object(this.store);
    this.Group = new Group(this.store);

    initQuorum();
  }

  async up(param?: UpParam) {
    const { data: status } = await sendRequest<ProcessStatus>({
      action: 'up',
      param,
    });
    this.store.port = status.port;
    await this.Node.ping()
    return status;
  }

  down() {
    sendRequest<ProcessStatus>({
      action: 'down',
    });
  }
}

export const QuorumClientTest = Test;