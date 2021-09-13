import { Stake, BalanceError, StakeStatus } from '../types';
// import { STATUS } from '../data'; // status 구조 생각

// const URL = STATUS['solana'].isMainnet
//   ? 'https://api.mainnet-beta.solana.com'
//   : 'https://api.devnet.solana.com';

export class Solana {
  static async getStake(address: string): Promise<Stake[]> {
    const URL = 'https://api.devnet.solana.com';
    let balanceError: BalanceError;
    let stakes: Stake[] = [];
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
            method: 'getProgramAccounts',
            params: [
              'Stake11111111111111111111111111111111111111',
              {
                encoding: 'jsonParsed',
                filters: [
                  {
                    memcmp: {
                      offset: 12,
                      bytes: `${address}`,
                    },
                  },
                ],
              },
            ],
          }),
        });
        const block = await response.json();
        // console.log(JSON.stringify(block));
        if (block.result.length > 0) {
          stakes = block.result.map(async (item: any) => {
            const responseState = await fetch(URL, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getStakeActivation',
                params: [`${item.pubkey}`],
              }),
            });
            const blockState = await responseState.json();
            // console.log(JSON.stringify(blockState));
            if (blockState.result.state === 'active') {
              return {
                validator: { address: item.account.data.parsed.info.stake.delegation.voter },
                value: item.account.lamports,
                status: StakeStatus.DELEGATED,
                error: BalanceError.NO_ERROR,
                stakeAccount: item.pubkey,
              };
            } else if (blockState.result.state === 'inactive') {
              return {
                validator: { address: 'Not delegated' },
                value: item.account.lamports,
                status: StakeStatus.NOT_DELEGATED,
                error: BalanceError.NO_ERROR,
                stakeAccount: item.pubkey,
              };
            } else if (blockState.result.state === 'activating') {
              return {
                validator: { address: item.account.data.parsed.info.stake.delegation.voter },
                value: item.account.lamports,
                status: StakeStatus.DELEGATING,
                error: BalanceError.NO_ERROR,
                stakeAccount: item.pubkey,
              };
            } else {
              return {
                validator: { address: item.account.data.parsed.info.stake.delegation.voter },
                value: item.account.lamports,
                status: StakeStatus.UNDELEGATING,
                error: BalanceError.NO_ERROR,
                stakeAccount: item.pubkey,
              };
            }
          });
          stakes = await Promise.all(stakes);
        }
        return stakes;
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
