/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiResponse } from 'next';
import { getEpoch as Solana } from '@/data/solana/epoch';
import { getEpoch as Near } from '@/data/near/epoch';
import { EpochError, ApiResponse } from '@/data/types';

export default async function handler(req: any, res: NextApiResponse): Promise<void> {
  const chain = req.query.chain;
  let apiResponse: ApiResponse;

  switch (chain) {
    case 'near':
      apiResponse = await Near(chain);
      break;
    case 'solana':
      apiResponse = await Solana(chain);
      break;
    default:
      apiResponse = {
        api: '',
        error: EpochError.NOT_SUPPORTED_CHAIN,
      };
      break;
  }
  res.status(200).json({ ...apiResponse, api: `v1/epoch/${chain}` });
}
