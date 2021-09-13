import type { NextApiResponse } from 'next';
import { Solana } from '../../../../data/solana/balance';
import { Near } from '../../../../data/near/balance';
import { Balance, BalanceError } from '../../../../data/types';
export default async function handler(req: any, res: NextApiResponse): Promise<void> {
  const address = req.query.address;
  const chain = req.query.chain;
  let balance: Balance;

  switch (chain) {
    case 'solana':
      balance = await Solana.getBalance(address);
      res.status(200).json({ balance });
      break;
    case 'near':
      balance = await Near.getBalance(address);
      res.status(200).json({ balance });
      break;
    default:
      balance = {
        decimal: 0,
        total: '',
        locked: '',
        error: BalanceError.NOT_SUPPORTED_CHAIN,
      };
      res.status(200).json({ balance });
      break;
  }
}
