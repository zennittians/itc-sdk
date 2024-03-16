/**
 *
 * @packageDocumentation
 * @module intelchain-utils
 */

export enum ChainType {
  Intelchain = 'itc',
  Ethereum = 'eth',
}

export enum ChainID {
  Default = 0,
  EthMainnet = 1,
  Morden = 2,
  Ropsten = 3,
  Rinkeby = 4,
  RootstockMainnet = 30,
  RootstockTestnet = 31,
  Kovan = 42,
  EtcMainnet = 61,
  EtcTestnet = 62,
  Geth = 1337,
  Ganache = 0,
  ItcMainnet = 1,
  ItcTestnet = 2,
  ItcLocal = 2,
  ItcPangaea = 3,
}

/** @hidden */
export const defaultConfig = {
  Default: {
    Chain_ID: ChainID.ItcLocal,
    Chain_Type: ChainType.Intelchain,
    Chain_URL: 'http://localhost:9500',
    Network_ID: 'Local',
  },
  DefaultWS: {
    Chain_ID: ChainID.ItcLocal,
    Chain_Type: ChainType.Intelchain,
    Chain_URL: 'ws://localhost:9800',
    Network_ID: 'LocalWS',
  },
};

/** @hidden */
export abstract class IntelchainCore {
  chainType: ChainType;
  chainId: ChainID;
  constructor(chainType: ChainType, chainId: ChainID = defaultConfig.Default.Chain_ID) {
    this.chainType = chainType;
    this.chainId = chainId;
  }
  get chainPrefix(): string {
    switch (this.chainType) {
      case ChainType.Ethereum: {
        return 'eth';
      }
      case ChainType.Intelchain: {
        return 'itc';
      }
      default: {
        return 'itc';
      }
    }
  }
  get getChainId(): ChainID {
    return this.chainId;
  }
  public setChainId(chainId: ChainID) {
    this.chainId = chainId;
  }
  public setChainType(chainType: ChainType) {
    this.chainType = chainType;
  }
}

/** @hidden */
export const HDPath = `m/44'/1023'/0'/0/`;

/** @hidden */
export const AddressSuffix = '-';
