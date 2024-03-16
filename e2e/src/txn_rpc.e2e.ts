import fetch from 'jest-fetch-mock';
import { intelchain, checkCalledMethod } from './intelchain';
import txnJsons from '../fixtures/transactions.json';
import { RPCMethod } from '@intelchain-js/network';

const messenger = intelchain.messenger;

interface TransactionInfo {
  blockHash: string;
  index: string;
  blockNumber: string;
}

describe('e2e test transactions by RPC Method', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  const txnHashesFixtures: any = [];
  const transactionInfoList: any = [];
  const { transactions, hashes, blockHashes } = txnJsons;
  // net_*
  it('should test itc_sendRawTransaction', async () => {
    for(let index = 0; index < transactions.length; index++) {
      fetch.mockResponseOnce(
        JSON.stringify({"jsonrpc": "2.0", "id": 1, "result": hashes[index]}),
      );
      const sent = await messenger.send('itc_sendRawTransaction', transactions[index].rawTransaction);
      expect(intelchain.utils.isHash(sent.result)).toEqual(true);
      txnHashesFixtures.push(sent.result);
      expect(checkCalledMethod(index, 'itc_sendRawTransaction')).toEqual(true);
    }
  });
  it('should test itc_getTransactionByHash', async () => {
    for(let index: number = 0; index < txnHashesFixtures.length; index++) {
      const txnHash = txnHashesFixtures[index];
      fetch.mockResponseOnce(
        JSON.stringify({
          "jsonrpc": "2.0",
          "id": 1,
          "result": {
            "hash": hashes[index],
            "blockHash": blockHashes[index],
            "blockNumber": intelchain.utils.numberToHex(index),
            "transactionIndex": intelchain.utils.numberToHex(index),
            "from": transactions[index].senderAddress,
            "gas": transactions[index].gasLimit,
            "gasPrice": transactions[index].gasPrice,
            "input": "0x",
            "nonce": transactions[index].nonce,
            "to": transactions[index].receiverAddressBech32,
            "value": transactions[index].value,
            "v": intelchain.utils.numberToHex(index),
            "r": intelchain.utils.numberToHex(index),
            "s": intelchain.utils.numberToHex(index),
          }
        })
      );
      const txnDetail = await intelchain.blockchain.getTransactionByHash({
        txnHash
      });
      expect(checkCalledMethod(index, RPCMethod.GetTransactionByHash)).toEqual(true);
      if (txnDetail.result !== null) {
        expect(checkTransactionDetail(txnDetail.result)).toEqual(true);
        expect(txnDetail.result.hash).toEqual(txnHash);

        const transactionInfo = {
          blockHash: txnDetail.result.blockHash,
          blockNumber: txnDetail.result.blockNumber,
          index: txnDetail.result.transactionIndex,
        };
        transactionInfoList.push(transactionInfo);
      } else {
        fail(`txnDetail for ${txnHash} is null`);
      }
    }
  });
  it('should test itc_getTransactionByBlockHashAndIndex', async () => {
    for (let index: number = 0; index < transactionInfoList.length; index++) {
      fetch.mockResponseOnce((req) => {
        if (!(Buffer.isBuffer(req.body))) {
          fail("POST request body not a buffer");
        }
        const body: any = JSON.parse(req.body.toString());
        // validate that the block hash is as expected
        if (body.params[0] !== blockHashes[index]) {
          fail(`Expected block hash ${blockHashes[index]} but got ${body.params[0]}`);
        }
        // validate that the transaction index is as expected
        let expectedTransactionIndex: string = intelchain.utils.numberToHex(index);
        if (expectedTransactionIndex !== body.params[1]) {
          fail(`Expected transactionIndex ${expectedTransactionIndex} but got ${body.params[1]}`);
        }
        return Promise.resolve(JSON.stringify({
          "jsonrpc": "2.0",
          "id": 1,
          "result": {
            "hash": hashes[index],
            "blockHash": blockHashes[index],
            "blockNumber": intelchain.utils.numberToHex(index),
            "transactionIndex": intelchain.utils.numberToHex(index),
            "from": transactions[index].senderAddress,
            "gas": transactions[index].gasLimit,
            "gasPrice": transactions[index].gasPrice,
            "input": "0x",
            "nonce": transactions[index].nonce,
            "to": transactions[index].receiverAddressBech32,
            "value": transactions[index].value,
            "v": intelchain.utils.numberToHex(index),
            "r": intelchain.utils.numberToHex(index),
            "s": intelchain.utils.numberToHex(index),
          }
        }));
      });
      const transactionInfo: TransactionInfo = transactionInfoList[index];
      const txnDetail: any = await intelchain.blockchain.getTransactionByBlockHashAndIndex({
        blockHash: transactionInfo.blockHash,
        index: transactionInfo.index,
      });
      expect(checkCalledMethod(index, RPCMethod.GetTransactionByBlockHashAndIndex)).toEqual(true);
      if (txnDetail.result !== null) {
        expect(checkTransactionDetail(txnDetail.result)).toEqual(true);
        expect(txnDetail.result.blockHash).toEqual(transactionInfo.blockHash);
        expect(txnDetail.result.transactionIndex).toEqual(transactionInfo.index);
      } else {
        fail(`txnDetail for ${transactionInfo.blockHash}_${transactionInfo.index} is null`);
      }
    }
  });
  it('should test itc_getTransactionByBlockNumberAndIndex', async () => {
    for (let index: number = 0; index < transactionInfoList.length; index++) {
      fetch.mockResponseOnce((req) => {
        if (!(Buffer.isBuffer(req.body))) {
          fail("POST request body not a buffer");
        }
        const body: any = JSON.parse(req.body.toString());
        // validate that the block number is as expected
        let expectedBlockNumber: string = intelchain.utils.numberToHex(index);
        if (body.params[0] !== expectedBlockNumber) {
          fail(`Expected block number ${index} but got ${body.params[0]}`);
        }
        // validate that the transaction index is as expected
        let expectedTransactionIndex: string = intelchain.utils.numberToHex(index);
        if (expectedTransactionIndex !== body.params[1]) {
          fail(`Expected transactionIndex ${expectedTransactionIndex} but got ${body.params[1]}`);
        }
        return Promise.resolve(JSON.stringify({
          "jsonrpc": "2.0",
          "id": 1,
          "result": {
            "hash": hashes[index],
            "blockHash": blockHashes[index],
            "blockNumber": intelchain.utils.numberToHex(index),
            "transactionIndex": intelchain.utils.numberToHex(index),
            "from": transactions[index].senderAddress,
            "gas": transactions[index].gasLimit,
            "gasPrice": transactions[index].gasPrice,
            "input": "0x",
            "nonce": transactions[index].nonce,
            "to": transactions[index].receiverAddressBech32,
            "value": transactions[index].value,
            "v": intelchain.utils.numberToHex(index),
            "r": intelchain.utils.numberToHex(index),
            "s": intelchain.utils.numberToHex(index),
          }
        }));
      });
      const transactionInfo: TransactionInfo = transactionInfoList[index];
      const txnDetail: any = await intelchain.blockchain.getTransactionByBlockNumberAndIndex({
        blockNumber: transactionInfo.blockNumber,
        index: transactionInfo.index,
      });
      expect(checkCalledMethod(index, RPCMethod.GetTransactionByBlockNumberAndIndex)).toEqual(true);
      if (txnDetail.result !== null) {
        expect(checkTransactionDetail(txnDetail.result)).toEqual(true);
        expect(txnDetail.result.blockNumber).toEqual(transactionInfo.blockNumber);
        expect(txnDetail.result.transactionIndex).toEqual(transactionInfo.index);
      } else {
        fail(`txnDetail for ${transactionInfo.blockNumber}_${transactionInfo.index} is null`);
      }
    }
  });
  it('should test itc_getTransactionCountByHash', async () => {
    for (const some of transactionInfoList) {
      fetch.mockResponseOnce(
        JSON.stringify({"jsonrpc": "2.0", "id": 1, "result": "0x1"}),
      );
      const transactionInfo: TransactionInfo = some;
      const txnCount: any = await intelchain.blockchain.getBlockTransactionCountByHash({
        blockHash: transactionInfo.blockHash,
      });
      expect(checkCalledMethod(0, RPCMethod.GetBlockTransactionCountByHash)).toEqual(true);
      expect(intelchain.utils.isHex(txnCount.result)).toEqual(true);
    }
  });
  it('should test itc_getTransactionCountByNumber', async () => {
    for (const some of transactionInfoList) {
      fetch.mockResponseOnce(
        JSON.stringify({"jsonrpc": "2.0", "id": 1, "result": "0x1"}),
      );
      const transactionInfo: TransactionInfo = some;
      const txnCount: any = await intelchain.blockchain.getBlockTransactionCountByNumber({
        blockNumber: transactionInfo.blockNumber,
      });
      expect(checkCalledMethod(0, RPCMethod.GetBlockTransactionCountByNumber)).toEqual(true);
      expect(intelchain.utils.isHex(txnCount.result)).toEqual(true);
    }
  });
  it('should test itc_getTransactionReceipt', async () => {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < txnHashesFixtures.length; index += 1) {
      const txnHash = txnHashesFixtures[index];
      fetch.mockResponseOnce(
        JSON.stringify({
          "jsonrpc": "2.0",
          "id": 1,
          "result": {
            "contractAddress": null,
            "blockNumber": intelchain.utils.numberToHex(index),
            "from": transactions[index].senderAddress,
            "gasUsed": intelchain.utils.numberToHex(index),
            "cumulativeGasUsed": intelchain.utils.numberToHex(index),
            "logs": [],
            "logsBloom": intelchain.utils.numberToHex(index),
            "shardID": 0,
            "to": transactions[index].receiverAddress,
            "transactionHash": hashes[index],
            "transactionIndex": intelchain.utils.numberToHex(index),
            "blockHash": blockHashes[index]
          }
        })
      );
      const receipt: any = await intelchain.blockchain.getTransactionReceipt({
        txnHash,
      });
      expect(checkCalledMethod(index, RPCMethod.GetTransactionReceipt)).toEqual(true);

      if (receipt.result !== null) {
        expect(checkTransactionReceipt(receipt.result)).toEqual(true);
        expect(intelchain.crypto.getAddress(receipt.result.from).checksum).toEqual(
          transactions[index].senderAddress,
        );
        expect(intelchain.crypto.getAddress(receipt.result.to).checksum).toEqual(
          transactions[index].receiverAddress,
        );
        expect(receipt.result.blockHash).toEqual(transactionInfoList[index].blockHash);
        expect(receipt.result.blockNumber).toEqual(transactionInfoList[index].blockNumber);
        expect(receipt.result.transactionIndex).toEqual(transactionInfoList[index].index);
      } else {
        fail(`receipt for ${txnHash} is null`);
      }
    }
  });
  it('should test itc_getTransactionCount', async () => {
    for (let i = 0; i < transactionInfoList; i += 1) {
      fetch.mockResponseOnce(
        JSON.stringify({"jsonrpc": "2.0", "id": 1, "result": "0x1"}),
      );
      const transactionInfo: TransactionInfo = transactionInfoList[i];
      const nonce: any = await intelchain.blockchain.getTransactionCount({
        address: transactions[i].senderAddressBech32,
        blockNumber: transactionInfo.blockNumber,
      });
      expect(nonce.result).toEqual(transactions[i].nonce);
    }
  });
});

function checkTransactionDetail(data: any) {
  return intelchain.utils.validateArgs(
    data,
    {
      blockHash: [intelchain.utils.isHash],
      blockNumber: [intelchain.utils.isHex],
      // tslint:disable-next-line: no-shadowed-variable
      from: [intelchain.utils.isValidAddress],
      gas: [intelchain.utils.isHex],
      gasPrice: [intelchain.utils.isHex],
      hash: [intelchain.utils.isHash],
      // tslint:disable-next-line: no-shadowed-variable
      input: [(data: any) => data === '0x' || intelchain.utils.isHex(data)],
      nonce: [intelchain.utils.isHex],
      // tslint:disable-next-line: no-shadowed-variable
      to: [(data: any) => data === '0x' || intelchain.utils.isValidAddress(data)],
      transactionIndex: [intelchain.utils.isHex],
      value: [intelchain.utils.isHex],
      v: [intelchain.utils.isHex],
      r: [intelchain.utils.isHex],
      s: [intelchain.utils.isHex],
    },
    {},
  );
}

function checkTransactionReceipt(data: any) {
  return intelchain.utils.validateArgs(
    data,
    {
      blockNumber: [intelchain.utils.isHex],
      contractAddress: [
        // tslint:disable-next-line: no-shadowed-variable
        (data: any) => data === null || intelchain.utils.isValidAddress,
      ],
      cumulativeGasUsed: [intelchain.utils.isHex],
      from: [intelchain.utils.isValidAddress],
      gasUsed: [intelchain.utils.isHex],
      logs: [intelchain.utils.isArray],
      logsBloom: [intelchain.utils.isHex],

      shardID: [intelchain.utils.isNumber],
      // tslint:disable-next-line: no-shadowed-variable
      to: [(data: any) => data === '0x' || intelchain.utils.isValidAddress],
      transactionHash: [intelchain.utils.isHash],
      transactionIndex: [intelchain.utils.isHex],
    },
    { blockHash: [intelchain.utils.isHash], root: [intelchain.utils.isHash] },
  );
}
