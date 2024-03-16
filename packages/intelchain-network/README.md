# @intelchain-js/network

This package provides a collection of apis to create messengers (HTTP, WebSocket) to connect to blockchain networks.

## Installation

```
npm install @intelchain-js/network
```

## Usage

```javascript
const { Messenger, HttpProvider, WSProvider } = require('@intelchain-js/network');
const { ChainID, ChainType } = require('@intelchain-js/utils');
const testnetHTTP = 'https://api.s0.b.intelchain.org';
const testnetWS = 'wss://ws.s0.b.intelchain.org';
const localHTTP = 'http://localhost:9500/';
const localWS = 'http://localhost:9800/';
const http = new HttpProvider(testnetHTTP); // for local use localHTTP
const ws = new WSProvider(testnetWS); // for local use testnetWS
const customHTTPMessenger = new Messenger(http, ChainType.Intelchain, ChainID.ItcTestnet); // for local ChainID.ItcLocal
const customWSMessenger = new Messenger(ws, ChainType.Intelchain, ChainID.ItcTestnet); // for local ChainID.ItcLocal
```