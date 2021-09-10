import type { NextApiResponse } from 'next';
import { Solana } from '../../../data/solana/epoch';
import { Near } from '../../../data/near/epoch';
import { Epoch, EpochError } from '../../../data/types';

export default async function handler(req: any, res: NextApiResponse): Promise<void> {
  const chain = req.query.chain;
  let epoch: Epoch;

  switch (chain) {
    case 'near':
      epoch = await Near.getEpoch(chain);
      res.status(200).json({ epoch });
      break;
    case 'solana':
      epoch = await Solana.getEpoch(chain);
      res.status(200).json({ epoch });
      break;
    default:
      epoch = {
        epochStartTime: 0,
        epochEndTime: 0,
        error: EpochError.NOT_SUPPORTED_CHAIN,
      };
      res.status(200).json({ epoch });
      break;
  }
}
