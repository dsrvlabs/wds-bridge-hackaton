/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stake, BalanceError, StakeStatus } from '../types';
import { connect, keyStores, utils, providers } from 'near-api-js';

export class Near {
  static async fetchPools(): Promise<any> {
    const URL = 'https://rpc.testnet.near.org';
    const provider = new providers.JsonRpcProvider(URL);
    const result: any = await provider.sendJsonRpc('validators', [null]);
    const pools: any[] = [];
    result.next_validators.forEach((validator: any) => {
      return pools.push(validator.account_id);
    }); // kickout 노드 제외
    // result.current_validators.forEach((validator: any) => pools.push(validator.account_id)); // kickout 노드 포함
    // console.log(pools.length)
    return pools;
  }

  static async filter(accountId: string): Promise<any> {
    const URL = 'https://rpc.testnet.near.org';
    const networkId = 'mainnet';
    const options = {
      nodeUrl: URL,
      networkId: networkId,
      keyStore: new keyStores.InMemoryKeyStore(),
    };
    const near = await connect(options);
    const masterAccount = await near.account(accountId);
    const pools = await Near.fetchPools();
    const result: any[] = [];

    for (let i = 0; i < pools.length; ++i) {
      try {
        const stakeBalance = await masterAccount.viewFunction(
          pools[i],
          'get_account_total_balance',
          {
            account_id: accountId,
          },
        );
        if (stakeBalance != '0') {
          result.push({
            accountId: pools[i],
            stakeBalance: utils.format.formatNearAmount(stakeBalance, 2),
          });
        }
      } catch (error) {
        // 컨트랙트가 없는 일부 노드(테스트넷) 제외
        // console.error(error)
      }
    }
    return result;
  }

  static async getStake(address: string): Promise<Stake[]> {
    const helperURL = 'https://helper.testnet.near.org';
    let balanceError: BalanceError;
    let stakes: Stake[] = [];
    if (address.includes(':')) {
      const helper = `${helperURL}/publicKey/${address}/accounts`;
      const accountIds = await fetch(helper).then((res) => {
        return res.json();
      });
      address = accountIds[Object.keys(accountIds).length - 1];
    }
    if (address) {
      try {
        const blockValidator = await Near.filter(address);
        // console.log(blockValidator)
        if (blockValidator.length > 0) {
          stakes = blockValidator.map((item: any) => {
            return {
              validator: {
                address: item.accountId,
              },
              value: parseFloat(item.stakeBalance).toString(),
              status: StakeStatus.DELEGATED,
              error: BalanceError.NO_ERROR,
            };
          });
          return stakes;
        } else {
            balanceError = BalanceError.ADDRESS_ERROR;
        }
      } catch (error) {
        balanceError = BalanceError.ADDRESS_ERROR;
      }
    } else {
      balanceError = BalanceError.NO_ADDRESS;
    }
    stakes = [
      {
        validator: { address: '' },
        value: '',
        status: StakeStatus.NOT_DELEGATED,
        error: balanceError,
        stakeAccount: '',
      },
    ];
    return stakes;
  }
}
