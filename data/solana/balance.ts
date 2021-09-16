import { Balance, BalanceError, ApiResponse } from '@/data/types';
import { ChainListInfos as INFO } from '../chaininfo/chain-list-infos';

export const getBalance = async (address: string): Promise<ApiResponse> => {
  const URL = INFO['solana'].isMainnet
    ? 'https://api.mainnet-beta.solana.com'
    : 'https://api.devnet.solana.com';
  let balanceError: BalanceError;
  if (address) {
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getBalance',
          params: [`${address}`],
        }),
      });
      const block = await response.json();
      // console.log(JSON.stringify(block));
      const balance: Balance = {
        decimal: 9,
        total: block.result.value,
        locked: '',
      };
      return {
        api: '',
        data: balance,
        error: BalanceError.NO_ERROR,
      };
    } catch (error) {
      balanceError = BalanceError.ADDRESS_ERROR;
    }
  } else {
    balanceError = BalanceError.NO_ADDRESS;
  }
  return {
    api: '',
    error: balanceError,
  };
};
