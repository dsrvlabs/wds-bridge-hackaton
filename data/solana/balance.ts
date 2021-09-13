import { BalanceError, ApiResponse } from '@/data/types';
// import { STATUS } from '../data'; // status 구조 생각

// const URL = STATUS['solana'].isMainnet
//   ? 'https://api.mainnet-beta.solana.com'
//   : 'https://api.devnet.solana.com';

export const getBalance = async (address: string): Promise<ApiResponse> => {
  const URL = 'https://api.devnet.solana.com';
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
      const balance: ApiResponse = {
        api: 'v1/balance/solana',
        data: {
          decimal: 9,
          total: block.result.value,
          locked: '',
        },
        error: BalanceError.NO_ERROR,
      };
      return balance;
    } catch (error) {
      balanceError = BalanceError.ADDRESS_ERROR;
    }
  } else {
    balanceError = BalanceError.NO_ADDRESS;
  }
  const balance: ApiResponse = {
    api: 'v1/balance/solana',
    error: balanceError,
  };
  return balance;
};
