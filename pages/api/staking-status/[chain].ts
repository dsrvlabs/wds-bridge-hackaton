/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiResponse } from 'next';
import { StakingStatusError, ApiResponse } from '@/data/types';

export default async function handler(req: any, res: NextApiResponse): Promise<void> {
  const chain = req.query.chain;
  let apiResponse: ApiResponse;
  switch (chain) {
    case 'agoric':
    case 'celo':
    case 'cosmos':
    case 'flow':
    case 'kusama':
    case 'lido':
    case 'mina':
    case 'near':
    case 'persistence':
    case 'polkadot':
    case 'polygon':
    case 'solana':
    case 'thegraph':
    case 'thorchain':
    case 'tokamak':
    case 'terra':
      /*
      TO DO: DB QUERY
      */
      apiResponse = {
        api: '',
        data: {
          staking: 0,
          delegators: 0,
          reward: 0,
          comission: 10,
        },
        error: StakingStatusError.NO_ERROR,
      };
      break;
    default:
      apiResponse = {
        api: '',
        error: StakingStatusError.NOT_SUPPORTED_CHAIN,
      };
      break;
  }
  res.status(200).json({ ...apiResponse, api: `v1/staking-status/${chain}` });
}
