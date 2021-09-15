/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiResponse } from 'next';
import { CalculatorError, Calculator, ApiResponse, ChainList } from '@/data/types';
import { ChainConverter } from '@/data/chaininfo/chain-list-infos';

export default async function handler(req: any, res: NextApiResponse): Promise<void> {
  const CALCULATOR: ChainList<Calculator> = {
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
    // TODO: 내용 수정
    lido_eth: {
      defaultAmount: 30000,
      maxAmount: 100000,
      apr: 7.5,
    },
    // TODO: 내용 수정
    lido_sol: {
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
    // TODO: 내용 수정
    ethereum: {
      defaultAmount: 0,
      maxAmount: 0,
      apr: 0,
    },
    polkadot: {
      defaultAmount: 0,
      maxAmount: 0,
      apr: 0,
    },
    thorchain: {
      defaultAmount: 0,
      maxAmount: 0,
      apr: 0,
    },
    agoric: {
      defaultAmount: 0,
      maxAmount: 0,
      apr: 0,
    },
  };

  const chain = req.query.chain;
  let apiResponse: ApiResponse = {
    api: '',
    error: CalculatorError.NOT_SUPPORTED_CHAIN,
  };
  if (ChainConverter[chain]) {
    // TODO: DB QUERY
    apiResponse = {
      api: '',
      data: CALCULATOR[chain],
      error: CalculatorError.NO_ERROR,
    };
  }

  res.status(200).json({ ...apiResponse, api: `v1/calculator/${chain}` });
}
