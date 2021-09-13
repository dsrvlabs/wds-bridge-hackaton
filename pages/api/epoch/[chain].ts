/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiResponse } from 'next';
import { getEpoch as Solana } from '@/data/solana/epoch';
import { getEpoch as Near } from '@/data/near/epoch';
import { EpochError, ApiResponse } from '@/data/types';

export default async function handler(req: any, res: NextApiResponse): Promise<void> {
  const chain = req.query.chain;
  let response: ApiResponse;

  switch (chain) {
    case 'near':
      response = await Near(chain);
      res.status(200).json(response);
      break;
    case 'solana':
      response = await Solana(chain);
      res.status(200).json(response);
      break;
    default:
      res.status(200).json({ error: EpochError.NOT_SUPPORTED_CHAIN });
      break;
  }
}
