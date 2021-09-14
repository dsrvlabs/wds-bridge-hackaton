/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiResponse } from 'next';
import { PriceError, ApiResponse } from '@/data/types';

export default async function handler(req: any, res: NextApiResponse): Promise<void> {
  const chain = req.query.chain;
  const URL = 'https://api.coingecko.com/api/v3';
  let apiResponse: ApiResponse;
  let data: any;

  switch (chain) {
    case 'near':
    case 'solana':
    case 'celo':
    case 'cosmos':
    case 'ethereum':
    case 'flow':
    case 'kusama':
    case 'lido-staked-ether':
    case 'mina-protocol':
    case 'persistence':
    case 'polkadot':
    case 'matic-network':
    case 'terra-luna':
    case 'the-graph':
    case 'thorchain':
    case 'tokamak-network':
      data = await fetch(
        `${URL}/coins/${chain}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
      );
      if (data.status >= 200 && data.status <= 299) {
        const jsonResponse = await data.json();
        apiResponse = {
          api: ``,
          data: {
            now: jsonResponse.market_data.current_price.usd || null,
            high24h: jsonResponse.market_data.high_24h.usd || null,
            low24h: jsonResponse.market_data.low_24h.usd || null,
            change7d: jsonResponse.market_data.price_change_percentage_7d_in_currency.usd || null,
            change14d: jsonResponse.market_data.price_change_percentage_14d_in_currency.usd || null,
            change30d: jsonResponse.market_data.price_change_percentage_30d_in_currency.usd || null,
            change1y: jsonResponse.market_data.price_change_percentage_1y_in_currency.usd || null,
          },
          error: PriceError.NO_ERROR,
        };
      } else {
        apiResponse = {
          api: '',
          error: PriceError.NOT_SUPPORTED_CHAIN,
        };
        // console.log(response.status, response.statusText);
      }
      break;
    default:
      apiResponse = {
        api: '',
        error: PriceError.NOT_SUPPORTED_CHAIN,
      };
      break;
  }
  res.status(200).json({ ...apiResponse, api: `v1/price/${chain}` });
}
