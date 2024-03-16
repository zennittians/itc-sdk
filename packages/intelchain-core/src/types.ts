/**
 * @packageDocumentation
 * @module intelchain-core
 * @hidden
 */

import { HttpProvider, Messenger } from '@intelchain-js/network';
import { TransactionFactory, Transaction } from '@intelchain-js/transaction';
import { Wallet, Account } from '@intelchain-js/account';
import { ChainType, ChainID } from '@intelchain-js/utils';
import { Blockchain } from './blockchain';

export interface IntelchainModule {
  HttpProvider: HttpProvider;
  Messenger: Messenger;
  Blockchain: Blockchain;
  TransactionFactory: TransactionFactory;
  Wallet: Wallet;
  Transaction: Transaction;
  Account: Account;
}

export enum UrlType {
  http,
  ws,
}

export interface IntelchainSetting<T extends ChainType, I extends ChainID> {
  type: T;
  id: I;
}
