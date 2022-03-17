# Quorum-sdk-electron-renderer

Quorum-sdk includes two npm packages:

1. Quorum-sdk-electron-renderer
2. [Quorum-sdk-electron-main](https://github.com/rumsystem/quorum-sdk-electron-main)

![](https://user-images.githubusercontent.com/8716838/155666831-5bdfdaa7-e652-4a7b-ae29-2befa34f0e7c.png)

> Quorum-sdk-electron-renderer is the package for your Electron renderer process to interact with [Quorum](https://github.com/rumsystem/quorum).

## Install

```
$ yarn add quorum-sdk-electron-renderer
```

## QuorumClient

** Note: Make sure you have installed and setup [Quorum-sdk-electron-main](https://github.com/rumsystem/quorum-sdk-electron-main) in Electron main process. **

```js
import QuorumSDK from 'quorum-sdk-electron-renderer';

(async () => {
  const QuorumClient = new QuorumSDK();

  await QuorumClient.up();

  console.log('Quorum client started !');
})();
```

## Node

### fetch node status

```js
const status = await QuorumClient.Node.status();
console.log(status);
```

### fetch node info

```js
const info = await QuorumClient.Node.info();
console.log(info);
```

### fetch node network

```js
const network = await QuorumClient.Node.network();
console.log(network);
```

## Group

### create group

```js
const group = await QuorumClient.Group.create({
  group_name: 'test',
  consensus_type: 'poa',
  encryption_type: 'public',
  app_key: 'group_note',
});
console.log(group);
```

### list groups

```js
const groups = await QuorumClient.Group.list() || [];
console.log(groups);
```

### leave group

```js
await QuorumClient.Group.leave(group.group_id);
```


## Object

### create object

```js
const objectId = '1';
const object = await QuorumClient.Object.put(group.user_pubkey, {
  type: 'Add',
  object: {
    id: objectId,
    type: 'Note',
    content: 'test',
  },
  target: {
    id: group.group_id,
    type: 'Group',
  },
});
console.log(object);
```

### get object

```js
await QuorumClient.Object.get(object.Content.id);
```

### get object by TrxId

```js
await QuorumClient.Object.getByTrxId(object.TrxId);
```

### update object

```js
const updatedObject = await QuorumClient.Object.put(group.user_pubkey, {
  type: 'Add',
  object: {
    id: object.Content.id, // pass the object id that you want to update
    type: 'Note',
    content: 'test',
  },
  target: {
    id: group.group_id,
    type: 'Group',
  },
});
console.log(updatedObject);
```

### delete object

```js
await QuorumClient.Object.delete(group.group_id, object.Content.id);
```

### list objects

```js
const objects = await QuorumClient.Object.list();
console.log(objects);
```

## Auth

For more detail, you can check [Quorum auth protocol explained](https://github.com/rumsystem/quorum/blob/main/Tutorial.md#test-chainconfig)

### get following rule
```js
const followingRule = await QuorumClient.Auth.getFollowingRule(groupId, 'POST');
console.log(followingRule);
```

### update following rule
```js
await QuorumClient.Auth.updateFollowingRule({
  group_id: groupId,
  type: 'set_trx_auth_mode',
  config: {
    trx_type: 'POST',
    trx_auth_mode: 'FOLLOW_DNY_LIST',
    memo: '',
  },
});
```

### add a publisher to allow list
```js
await QuorumClient.Auth.updateAuthList({
  group_id: groupId,
  type: 'upd_alw_list',
  config: {
    action: 'add',
    pubkey: publisher,
    trx_type: ['POST'],
    memo: '',
  },
});
```

### remove a publisher from allow list
```js
await QuorumClient.Auth.updateAuthList({
  group_id: groupId,
  type: 'upd_alw_list',
  config: {
    action: 'remove',
    pubkey: publisher,
    trx_type: ['POST'],
    memo: '',
  },
});
```

### add a publisher to deny list
```js
await QuorumClient.Auth.updateAuthList({
  group_id: groupId,
  type: 'upd_dny_list',
  config: {
    action: 'add',
    pubkey: publisher,
    trx_type: ['POST'],
    memo: '',
  },
})
```

### remove a publisher from deny list
```js
await QuorumClient.Auth.updateAuthList({
  group_id: groupId,
  type: 'upd_dny_list',
  config: {
    action: 'remove',
    pubkey: publisher,
    trx_type: ['POST'],
    memo: '',
  },
});
```

### get allow list
```js
const allowList = await QuorumClient.Auth.getAllowList(groupId);
console.log(allowList);
```

### get deny list
```js
const denyList = await QuorumClient.Auth.getDenyList(groupId);
console.log(denyList);
```

## Run testing script

```js
import { QuorumClientTest } from 'quorum-sdk-electron-renderer';

QuorumClientTest.start();

// open devTool console and check out testing process and logs.
```

Full testing file: [test.ts](./src/test.ts)