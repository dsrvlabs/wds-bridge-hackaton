import type { NextApiResponse } from 'next';
import { Solana } from '../../../../data/solana/stake';
import { Near } from '../../../../data/near/stake';
import { Stake, BalanceError, StakeStatus } from '../../../../data/types';
export default async function handler(req: any, res: NextApiResponse): Promise<void> {
  const address = req.query.address;
  const chain = req.query.chain;
  let stakes: Stake[];

  switch (chain) {
    case 'solana':
      stakes = await Solana.getStake(address);
      res.status(200).json({ stakes });
      break;
    case 'near':
      stakes = await Near.getStake(address);
      res.status(200).json({ stakes });
      break;
    default:
      stakes = [
        {
          validator: { address: '' },
          value: '',
          status: StakeStatus.NOT_DELEGATED,
          error: BalanceError.NOT_SUPPORTED_CHAIN,
          stakeAccount: '',
        },
      ];
      res.status(200).json({ stakes });
      break;
  }
}
