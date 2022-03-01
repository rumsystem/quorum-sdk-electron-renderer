# Quorum-sdk-electron-renderer

Quorum-sdk includes two npm packages:

1. Quorum-sdk-electron-renderer
2. [Quorum-sdk-electron-main]()

> Quorum-sdk-electron-renderer is the package for your Electron renderer process to interact with [Quorum](https://github.com/rumsystem/quorum).

## Install

```
$ npm install quorum-sdk-electron-renderer
```

## Usage

Make sure you have installed and setup [Quorum-sdk-electron-main]() in Electron main process.

### QuorumClient

```js
import QuorumSDK from 'quorum-sdk-electron-renderer';

(async () => {
  const QuorumClient = new QuorumSDK();

  await QuorumClient.up();

  console.log('Quorum client started !');
})();
```

### Node

#### fetch node status

```js
const status = await QuorumClient.Node.status();
console.log(status);
```

#### fetch node info

```js
const info = await QuorumClient.Node.info();
console.log(info);
```

#### fetch node network

```js
const network = await QuorumClient.Node.network();
console.log(network);
```

### Group

#### create group

```js
const group = await QuorumClient.Group.create({
  group_name: 'test',
  consensus_type: 'poa',
  encryption_type: 'public',
  app_key: 'group_note',
});
console.log(group);
```

#### list groups

```js
const groups = await QuorumClient.Group.list() || [];
console.log(groups);
```

#### leave group

```js
await QuorumClient.Group.leave(group.group_id);
```


### Object

#### create object

```js
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

#### get object

```js
await QuorumClient.Object.get(object.Content.id);
```

#### get object by TrxId

```js
await QuorumClient.Object.getByTrxId(object.TrxId);
```

#### update object

```js
const updatedObject = await QuorumClient.Object.put(group.user_pubkey, {
  type: 'Add',
  object: {
    id: object.Content.id,
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

#### delete object

```js
await QuorumClient.Object.delete(group.group_id, object.Content.id);
```

#### list objects

```js
const objects = await QuorumClient.Object.list();
console.log(objects);
```

### Run testing script

```js
import { QuorumClientTest } from 'quorum-sdk-electron-renderer';

QuorumClientTest.start();

// open devTool console and check out testing process and logs
```

Full testing file: [test.ts]()