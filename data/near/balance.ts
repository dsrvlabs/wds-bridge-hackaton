import { Balance, BalanceError, ApiResponse } from '@/data/types';

export const getBalance = async (address: string): Promise<ApiResponse> => {
  const URL = 'https://rpc.mainnet.near.org';
  const helperURL = 'https://helper.mainnet.near.org';
  let balanceError: BalanceError;
  if (address.includes(':')) {
    const helper = `${helperURL}/publicKey/${address}/accounts`;
    const response = await fetch(helper);
    if (response.status >= 200 && response.status <= 299) {
      const accountIds = await response.json();
      // console.log(accountIds);
      address = accountIds[Object.keys(accountIds).length - 1];
    } else {
      console.log(response.status, response.statusText);
    }
  }
  if (address) {
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'dontcare',
          method: 'query',
          params: {
            request_type: 'view_account',
            finality: 'final',
            account_id: address,
          },
        }),
      });
      const block = await response.json();
      const balance: Balance = {
        decimal: 24,
        total: block.result.amount,
        locked: block.result.locked,
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
