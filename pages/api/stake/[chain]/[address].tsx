/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiResponse } from 'next';
import { getStake as Solana } from '@/data/solana/stake';
import { getStake as Near } from '@/data/near/stake';
import { BalanceError, ApiResponse } from '@/data/types';

export default async function handler(req: any, res: NextApiResponse): Promise<void> {
  const address = req.query.address;
  const chain = req.query.chain;
  let response: ApiResponse;

  switch (chain) {
    case 'solana':
      response = await Solana(address);
      res.status(200).json(response);
      break;
    case 'near':
      response = await Near(address);
      res.status(200).json(response);
      break;
    default:
      res.status(200).json({ error: BalanceError.NOT_SUPPORTED_CHAIN });
      break;
  }
}
