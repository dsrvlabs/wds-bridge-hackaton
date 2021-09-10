import { Balance, BalanceError } from '../types';

export class Near {
  static async getBalance(address: string): Promise<Balance> {
    const URL = 'https://rpc.mainnet.near.org';
    const helperURL = 'https://helper.mainnet.near.org';
    let balanceError: BalanceError;
    if (address.includes(':')) {
        const helper = `${helperURL}/publicKey/${address}/accounts`;
        const accountIds = await fetch(helper).then((res) => res.json());
        address = accountIds[Object.keys(accountIds).length - 1];
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
          error: BalanceError.NO_ERROR,
        };
        return balance

      } catch (error) {
          balanceError = BalanceError.ADDRESS_ERROR;
      }
    } else {
      balanceError = BalanceError.NO_ADDRESS;
    }
    const balance: Balance = {
      decimal: 9,
      total: '',
      locked: '',
      error: balanceError,
    };
    return balance;
  }
}
