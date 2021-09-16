/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiResponse } from 'next';
import { StakingStatusError, ApiResponse } from '@/data/types';
import { ChainConverter } from '@/data/chaininfo/chain-list-infos';

export default async function handler(req: any, res: NextApiResponse): Promise<void> {
  const chain = req.query.chain;
  let apiResponse: ApiResponse = {
    api: '',
    error: StakingStatusError.NOT_SUPPORTED_CHAIN,
  };
  // TODO: DB QUERY
  if (ChainConverter[chain]) {
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
  }
  res.status(200).json({ ...apiResponse, api: `v1/staking-status/${chain}` });
}
