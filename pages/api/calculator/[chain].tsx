/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiResponse } from 'next';
import { CalculatorError, Calculator, ApiResponse } from '@/data/types';

export default async function handler(req: any, res: NextApiResponse): Promise<void> {
  const CALCULATOR: { [key: string]: Calculator } = {
    celo: {
      defaultAmount: 30000,
      maxAmount: 100000,
      apr: 3.8,
    },
    cosmos: {
      defaultAmount: 30000,
      maxAmount: 100000,
      apr: 8,
    },
    flow: {
      defaultAmount: 30000,
      maxAmount: 100000,
      apr: 8,
    },
    kusama: {
      defaultAmount: 30000,
      maxAmount: 100000,
      apr: 8,
    },
    lido: {
      defaultAmount: 30000,
      maxAmount: 100000,
      apr: 7.5,
    },
    mina: {
      defaultAmount: 30000,
      maxAmount: 100000,
      apr: 10,
    },
    near: {
      defaultAmount: 30000,
      maxAmount: 100000,
      apr: 7.2,
    },
    persistence: {
      defaultAmount: 30000,
      maxAmount: 100000,
      apr: 35.14,
    },
    polygon: {
      defaultAmount: 30000,
      maxAmount: 100000,
      apr: 9.1,
    },
    solana: {
      defaultAmount: 30000,
      maxAmount: 100000,
      apr: 4.1,
    },
    terra: {
      defaultAmount: 30000,
      maxAmount: 100000,
      apr: 10.88,
    },
    thegraph: {
      defaultAmount: 30000,
      maxAmount: 100000,
      apr: 3.5,
    },
    tokamak: {
      defaultAmount: 30000,
      maxAmount: 100000,
      apr: 4.5,
    },
  };

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
        data: CALCULATOR[chain],
        error: CalculatorError.NO_ERROR,
      };
      break;
    default:
      apiResponse = {
        api: '',
        error: CalculatorError.NOT_SUPPORTED_CHAIN,
      };
      break;
  }
  res.status(200).json({ ...apiResponse, api: `v1/calculator/${chain}` });
}
