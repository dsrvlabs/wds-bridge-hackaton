/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiResponse } from 'next';
import { PriceError, ApiResponse } from '@/data/types';
import { ChainConverter } from '@/data/chaininfo/chain-list-infos';

export default async function handler(req: any, res: NextApiResponse): Promise<void> {
  const chain = req.query.chain;
  const URL = 'https://api.coingecko.com/api/v3';
  let apiResponse: ApiResponse = {
    api: '',
    error: PriceError.NOT_SUPPORTED_CHAIN,
  };
  let data: any;

  if (ChainConverter[chain]) {
    data = await fetch(
      `${URL}/coins/${ChainConverter[chain]}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
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
    }
  }
  res.status(200).json({ ...apiResponse, api: `v1/price/${chain}` });
}
