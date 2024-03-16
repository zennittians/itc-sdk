/**
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
 *
 * @packageDocumentation
 * @module intelchain-network
 */

/**@ignore */
export enum RPCMethod {
  // 1. itc_getBlockByHash
  GetBlockByHash = 'itc_getBlockByHash',
  // 2. itc_getBlockByNumber
  GetBlockByNumber = 'itc_getBlockByNumber',
  // 3. itc_getBlockTransactionCountByHash
  GetBlockTransactionCountByHash = 'itc_getBlockTransactionCountByHash',
  // 4. itc_getBlockTransactionCountByNumber
  GetBlockTransactionCountByNumber = 'itc_getBlockTransactionCountByNumber',
  // 5. itc_getCode
  GetCode = 'itc_getCode',
  // 6. itc_getTransactionByBlockHashAndIndex
  GetTransactionByBlockHashAndIndex = 'itc_getTransactionByBlockHashAndIndex',
  // 7. itc_getTransactionByBlockNumberAndIndex
  GetTransactionByBlockNumberAndIndex = 'itc_getTransactionByBlockNumberAndIndex',
  // 8. itc_getTransactionByHash
  GetTransactionByHash = 'itc_getTransactionByHash',

  GetTransactionReceipt = 'itc_getTransactionReceipt',

  GetCXReceiptByHash = 'itc_getCXReceiptByHash',
  // 9. itc_syncing
  Syncing = 'itc_syncing',
  // 10. net_peerCount
  PeerCount = 'net_peerCount',

  // 11. itc_getBalance
  GetBalance = 'itc_getBalance',
  // 12. itc_getStorageAt
  GetStorageAt = 'itc_getStorageAt',
  // 13. itc_getTransactionCount
  GetTransactionCount = 'itc_getTransactionCount',
  // 14. itc_sendTransaction
  SendTransaction = 'itc_sendTransaction',
  // 15. itc_sendRawTransaction
  SendRawTransaction = 'itc_sendRawTransaction',
  // 16. itc_subscribe
  Subscribe = 'itc_subscribe',
  // 17. itc_getlogs
  GetPastLogs = 'itc_getLogs',
  // 18. itc_getWork
  GetWork = 'itc_getWork',
  // 19. itc_submitWork
  // SubmitWork = 'itc_submitWork',
  // 20. itc_getProof
  GetProof = 'itc_getProof',
  // 21, itc_getFilterChanges
  GetFilterChanges = 'itc_getFilterChanges',
  // 22. itc_newPendingTransactionFilter
  NewPendingTransactionFilter = 'itc_newPendingTransactionFilter',
  // 23. itc_newBlockFilter
  NewBlockFilter = 'itc_newBlockFilter',
  // 24. itc_newFilter
  NewFilter = 'itc_newFilter',
  // 25. itc_call
  Call = 'itc_call',
  // 26. itc_estimateGas
  EstimateGas = 'itc_estimateGas',
  // 27. itc_gasPrice
  GasPrice = 'itc_gasPrice',
  // 28. itc_blockNumber
  BlockNumber = 'itc_blockNumber',
  // 29. itc_unsubscribe
  UnSubscribe = 'itc_unsubscribe',
  // 30. net_version
  NetVersion = 'net_version',
  // 31. itc_protocolVersion
  ProtocolVersion = 'itc_protocolVersion',
  // 32. itc_getShardingStructure
  GetShardingStructure = 'itc_getShardingStructure',
  // 33. itc_sendRawStakingTransaction
  SendRawStakingTransaction = 'itc_sendRawStakingTransaction',
  // 34. itc_getAccountNonce
  GetAccountNonce = 'itc_getAccountNonce',
  // 35. itc_getBlocks
  GetBlocks = 'itc_getBlocks',
}

/**@ignore */
export enum RPCErrorCode {
  // Standard JSON-RPC 2.0 errors
  // RPC_INVALID_REQUEST is internally mapped to HTTP_BAD_REQUEST (400).
  // It should not be used for application-layer errors.
  RPC_INVALID_REQUEST = -32600,
  // RPC_METHOD_NOT_FOUND is internally mapped to HTTP_NOT_FOUND (404).
  // It should not be used for application-layer errors.
  RPC_METHOD_NOT_FOUND = -32601,
  RPC_INVALID_PARAMS = -32602,
  // RPC_INTERNAL_ERROR should only be used for genuine errors in bitcoind
  // (for example datadir corruption).
  RPC_INTERNAL_ERROR = -32603,
  RPC_PARSE_ERROR = -32700,

  // General application defined errors
  RPC_MISC_ERROR = -1, // std::exception thrown in command handling
  RPC_TYPE_ERROR = -3, // Unexpected type was passed as parameter
  RPC_INVALID_ADDRESS_OR_KEY = -5, // Invalid address or key
  RPC_INVALID_PARAMETER = -8, // Invalid, missing or duplicate parameter
  RPC_DATABASE_ERROR = -20, // Database error
  RPC_DESERIALIZATION_ERROR = -22, // Error parsing or validating structure in raw format
  RPC_VERIFY_ERROR = -25, // General error during transaction or block submission
  RPC_VERIFY_REJECTED = -26, // Transaction or block was rejected by network rules
  RPC_IN_WARMUP = -28, // Client still warming up
  RPC_METHOD_DEPRECATED = -32, // RPC method is deprecated
}
