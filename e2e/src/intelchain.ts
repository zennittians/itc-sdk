import fetch from 'jest-fetch-mock';
// tslint:disable-next-line: no-implicit-dependencies
import { Intelchain } from '@intelchain-js/core';
// tslint:disable-next-line: no-implicit-dependencies
import { ChainType } from '@intelchain-js/utils';
// tslint:disable-next-line: no-implicit-dependencies
import { Account } from '@intelchain-js/account';

const CHAIN_ID: number = 2;
const CHAIN_TYPE: string = 'itc';
const HTTP_PROVIDER: string = 'http://localhost:9500';
const GENESIS_PRIV_KEY: string = '45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e';

let chainType: ChainType = ChainType.Intelchain;

if (CHAIN_TYPE === 'itc') {
  chainType = ChainType.Intelchain;
} else if (CHAIN_TYPE === 'eth') {
  chainType = ChainType.Ethereum;
}

export const intelchain: Intelchain = new Intelchain(HTTP_PROVIDER, {
  chainId: CHAIN_ID,
  chainType,
  chainUrl: HTTP_PROVIDER,
});

export const myAccount: Account = intelchain.wallet.addByPrivateKey(
  GENESIS_PRIV_KEY,
);

export function checkCalledMethod(i: number, s: string) {
  let params: (string | undefined) = fetch.mock.calls[i][1]?.body?.toString();
  if (params) {
    let method: string = JSON.parse(params).method;
    return method === s;
  }
  return false;
}
