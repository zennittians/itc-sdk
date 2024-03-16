/**
 * @packageDocumentation
 * @module intelchain-account
 * @hidden
 */

import { HttpProvider, Messenger } from '@intelchain-js/network';
import { ChainType, ChainID } from '@intelchain-js/utils';

export const defaultMessenger = new Messenger(
  new HttpProvider('http://localhost:9500'),
  ChainType.Intelchain,
  ChainID.ItcLocal,
);
