import { StakeInfo, ChainList } from '@/data/types';
import { ChainListInfos as INFO } from './chain-list-infos';
import { VALIDATORS, DEFAULTFEE, EXPLORER, UNSTAKE } from './config';

export const StakeInfos: ChainList<StakeInfo> = {
  agoric: {
    title: 'Agoric',
    validators: INFO['agoric'].isMainnet
      ? VALIDATORS['agoric'].mainnet
      : VALIDATORS['agoric'].testnet,
    defaultFee: DEFAULTFEE['agoric'],
    explorer: EXPLORER['agoric'],
    unstake: UNSTAKE['agoric'],
  },
  celo: {
    title: 'Celo',
  },
  cosmos: {
    title: 'Cosmos',
  },
  flow: {
    title: 'Flow',
  },
  kusama: {
    title: 'Kusama',
  },
  lido_eth: {
    title: 'Lido staked ethereum',
  },
  lido_sol: {
    title: 'Lido staked solana',
  },
  mina: {
    title: 'Mina',
  },
  near: {
    title: 'Near',
  },
  persistence: {
    title: 'Persistence',
  },
  polkadot: {
    title: 'Polkadot',
  },
  polygon: {
    title: 'Polygon',
  },
  solana: {
    title: 'Solana',
  },
  terra: {
    title: 'Terra',
  },
  thegraph: {
    title: 'The Graph',
  },
  thorchain: {
    title: 'THORChain',
  },
  tokamak: {
    title: 'Tokamak',
  },
  ethereum: {
    title: 'Ethereum',
  },
};
