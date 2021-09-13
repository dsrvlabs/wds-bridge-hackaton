/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiResponse } from 'next';
import { PriceError, ApiResponse } from '@/data/types';

export default async function handler(req: any, res: NextApiResponse): Promise<void> {
  const chain = req.query.chain;
  const URL = 'https://api.coingecko.com/api/v3';
  let price: ApiResponse;
  let data: any;

  switch (chain) {
    case 'near':
    case 'solana':
    case 'mina':
    case 'celo':
    case 'cosmos':
    case 'ethereum':
    case 'flow':
    case 'kusama':
    case 'lido-dao':
    case 'mina-protocol':
    case 'persistence':
    case 'polkadot':
    case 'matic-network':
    case 'terra-luna':
    case 'the-graph':
    case 'thorchain':
    case 'tokamak-network':
      data = await (
        await fetch(
          `${URL}/coins/${chain}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
        )
      ).json();
      price = {
        api: 'price',
        data: {
          now: data.market_data.current_price.usd || null,
          high24h: data.market_data.high_24h.usd || null,
          low24h: data.market_data.low_24h.usd || null,
          change7d: data.market_data.price_change_percentage_7d_in_currency.usd || null,
          change14d: data.market_data.price_change_percentage_14d_in_currency.usd || null,
          change30d: data.market_data.price_change_percentage_30d_in_currency.usd || null,
          change1y: data.market_data.price_change_percentage_1y_in_currency.usd || null,
        },
        error: PriceError.NO_ERROR,
      };
      res.status(200).json(price);
      break;
    default:
      res.status(200).json({ error: PriceError.NOT_SUPPORTED_CHAIN });
      break;
  }
}
