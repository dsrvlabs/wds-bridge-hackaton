/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiResponse } from 'next';
import { ApiResponse, BalanceError } from '@/data/types';
import { getBalance as Solana } from '@/data/solana/balance';
import { getBalance as Near } from '@/data/near/balance';

export default async function handler(req: any, res: NextApiResponse): Promise<void> {
  const address = req.query.address;
  const chain = req.query.chain;
  let apiResponse: ApiResponse;

  switch (chain) {
    case 'solana':
      apiResponse = await Solana(address);
      break;
    case 'near':
      apiResponse = await Near(address);
      break;
    default:
      apiResponse = {
        api: '',
        error: BalanceError.NOT_SUPPORTED_CHAIN,
      };
      break;
  }
  res.status(200).json({ ...apiResponse, api: `v1/balance/${chain}` });
}
