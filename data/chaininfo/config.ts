import { ChainValidator, Fee, Explorer, Unstake } from '@/data/types';

/*
ChainListInfo
*/
export const NETWORK: { [key: string]: boolean } = {
  agoric: false,
  celo: false,
  cosmos: false,
  eth2: false,
  flow: false,
  kusama: false,
  lido: false,
  mina: false,
  near: false,
  persistence: false,
  polkadot: false,
  polygon: false,
  solana: false,
  terra: false,
  thegraph: false,
  thorchain: false,
  tokamak: false,
};

export const APR: { [key: string]: number[] } = {
  // agoric: [0, 0],
  celo: [2, 5],
  cosmos: [2, 9],
  eth2: [0, 15],
  flow: [9, 10],
  kusama: [6, 14],
  lido: [0, 10],
  mina: [0, 15],
  near: [6, 8],
  persistence: [0, 42],
  // polkadot: [0, 0],
  polygon: [9, 10],
  solana: [0, 8],
  terra: [5, 10],
  thegraph: [1, 6],
  // thorchain: [0, 0],
  tokamak: [3, 6],
};

/*
StakeInfo
*/
export const VALIDATORS: {
  [key: string]: { mainnet: ChainValidator[]; testnet: ChainValidator[] };
} = {
  mina: {
    mainnet: [
      {
        title: 'DSRV labs',
        address: 'B62qp8Vq6n4VHq1LUm9Wd5QKjpKb7umoZ2oU9gpJYuHNUc7t2HGhGUA',
        comission: '10 %',
      },
    ],
    testnet: [
      {
        title: 'devnet(작동X)',
        address: 'B62qnwquaQY3xc8eReKbhQq3oE8WDuzufr4jNWnKVCXBiqzSTmTstS7',
        comission: '10 %',
      },
    ],
  },
  near: {
    mainnet: [
      {
        title: 'DSRV labs',
        address: 'dsrvlabs.poolv1.near',
        comission: '10 %',
      },
    ],
    testnet: [
      {
        title: 'testnet',
        address: 'masternode24.pool.f863973.m0',
        comission: '10 %',
      },
    ],
  },
  solana: {
    mainnet: [
      {
        title: 'DSRV labs',
        address: '2mxWiqtwdpE8zgkWxwFaJLn127dbuuHY4D32d8A6UnPL',
        comission: '10 %',
      },
    ],
    testnet: [
      {
        title: 'devnet(dsrv 주소 없어서 test 주소)',
        address: '3NZ1Wa2spvK6dpbVBhgTh2qfjzNA6wxEAdXMsJJQCDQG',
        comission: '10 %',
      },
    ],
  },
  terra: {
    mainnet: [
      {
        title: 'DSRV labs',
        address: 'terravaloper175hhkyxmkp8hf2zrzka7cnn7lk6mudtv4uuu64',
        comission: '10 %',
      },
    ],
    testnet: [
      {
        title: '',
        address: '',
        comission: '',
      },
    ],
  },
  celo: {
    mainnet: [
      {
        title: 'DSRV labs',
        address: '0xF83C93ea360B66DDCD532960304948B1c10786a1',
        comission: '10 %',
      },
    ],
    testnet: [
      {
        title: '',
        address: '',
        comission: '',
      },
    ],
  },
  flow: {
    mainnet: [
      {
        title: 'DSRV labs',
        address: '947771ab1fd233d8694aee6c4a4259ee7e2241f4a201067aaa28adbb989d7c97',
        comission: '10 %',
      },
    ],
    testnet: [
      {
        title: '',
        address: '',
        comission: '',
      },
    ],
  },
  eth2: {
    mainnet: [
      {
        title: 'DSRV labs',
        address: '',
        comission: '',
      },
    ],
    testnet: [
      {
        title: '',
        address: '',
        comission: '',
      },
    ],
  },
  polygon: {
    mainnet: [
      {
        title: 'DSRV labs',
        address: '0x8DFcbC1Df9933C8725618015d10B7B6de2d2c6f8',
        comission: '10 %',
      },
    ],
    testnet: [
      {
        title: '',
        address: '',
        comission: '',
      },
    ],
  },
  lido: {
    mainnet: [
      {
        title: '',
        address: '',
        comission: '',
      },
    ],
    testnet: [
      {
        title: '',
        address: '',
        comission: '',
      },
    ],
  },
  cosmos: {
    mainnet: [
      {
        title: 'DSRV labs',
        address: 'cosmosvaloper1wlagucxdxvsmvj6330864x8q3vxz4x02rmvmsu',
        comission: '10 %',
      },
    ],
    testnet: [
      {
        title: '',
        address: '',
        comission: '',
      },
    ],
  },
  persistence: {
    mainnet: [
      {
        title: 'DSRV labs',
        address: 'persistencevaloper1d0xdy0v97grs8ru8nccqyzyc9l8ppv0zv6p5xg',
        comission: '10 %',
      },
    ],
    testnet: [
      {
        title: '',
        address: '',
        comission: '',
      },
    ],
  },
  thegraph: {
    mainnet: [
      {
        title: 'DSRV labs',
        address: '',
        comission: '',
      },
    ],
    testnet: [
      {
        title: '',
        address: '',
        comission: '',
      },
    ],
  },
  tokamak: {
    mainnet: [
      {
        title: 'DSRV labs',
        address: '',
        comission: '10 %',
      },
    ],
    testnet: [
      {
        title: '',
        address: '',
        comission: '',
      },
    ],
  },
  kusama: {
    mainnet: [
      {
        title: 'DSRV labs',
        address: '',
        comission: '',
      },
    ],
    testnet: [
      {
        title: '',
        address: '',
        comission: '',
      },
    ],
  },
};

export const DEFAULTFEE: { [key: string]: Fee } = {
  mina: {
    defaultFee: '0.001', // 단위는 MINA
  },
  near: {
    defaultFee: '0.00005', // 단위는 NEAR
  },
  solana: {
    defaultFee: '0.000005',
  },
  // add blockchains...
};

export const EXPLORER: { [key: string]: Explorer } = {
  mina: {
    mainnet: {
      address: `https://minaexplorer.com/wallet/`,
      tx: `https://minaexplorer.com/transaction/`,
    },
    // devnet
    testnet: {
      address: `https://devnet.minaexplorer.com/wallet/`,
      tx: `https://devnet.minaexplorer.com/transaction/`,
    },
  },
  near: {
    mainnet: {
      address: `https://explorer.near.org/accounts/`,
      tx: `https://explorer.near.org/transactions/`,
    },
    testnet: {
      address: `https://explorer.testnet.near.org/accounts/`,
      tx: `https://explorer.testnet.near.org/transactions/`,
    },
  },
  solana: {
    mainnet: {
      address: `https://explorer.solana.com/address/`,
      tx: `https://explorer.solana.com/tx/`,
    },
    // devnet
    testnet: {
      address: `https://explorer.solana.com/address/`,
      tx: `https://explorer.solana.com/tx/`,
    },
  },
  // add blockchains...
};

export const UNSTAKE: { [key: string]: Unstake } = {
  // add blockchains...
  near: {
    hasStakeAccount: false,
    isAmountSetable: true,
    isClaim: false,
  },
  solana: {
    hasStakeAccount: true,
    isAmountSetable: false,
    isClaim: false,
  },
};
