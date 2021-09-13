/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiResponse } from 'next';
import { ApiResponse, BalanceError } from '@/data/types';
import { getBalance as Solana } from '@/data/solana/balance';
import { getBalance as Near } from '@/data/near/balance';

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
