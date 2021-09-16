import { ChainValidator, Fee, Explorer, Unstake, ChainList } from '@/data/types';

/*
ChainListInfo
*/
export const NETWORK: ChainList<boolean> = {
  agoric: false,
  celo: false,
  cosmos: false,
  flow: false,
  kusama: false,
  lido_eth: false,
  lido_sol: false,
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
  ethereum: false,
};

export const APR: ChainList<number[]> = {
  agoric: [0, 0], // TODO: 내용 수정
  celo: [2, 5],
  cosmos: [2, 9],
  flow: [9, 10],
  kusama: [6, 14],
  lido_eth: [0, 10], // TODO: 내용 수정
  lido_sol: [0, 10], // TODO: 내용 수정
  mina: [0, 15],
  near: [6, 8],
  persistence: [0, 42],
  polkadot: [0, 0], // TODO: 내용 수정
  polygon: [9, 10],
  solana: [0, 8],
  terra: [5, 10],
  thegraph: [1, 6],
  thorchain: [0, 0], // TODO: 내용 수정
  tokamak: [3, 6],
  ethereum: [0, 0], // TODO: 내용 수정
};

/*
StakeInfo
*/
export const VALIDATORS: ChainList<{ mainnet: ChainValidator[]; testnet: ChainValidator[] }> = {
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
  lido_eth: {
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
  lido_sol: {
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
  ethereum: {
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
  polkadot: {
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
  thorchain: {
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
  agoric: {
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

export const DEFAULTFEE: ChainList<Fee> = {
  mina: {
    defaultFee: '0.001', // 단위는 MINA
  },
  near: {
    defaultFee: '0.00005', // 단위는 NEAR
  },
  solana: {
    defaultFee: '0.000005',
  },
  celo: {
    defaultFee: '',
  },
  lido_eth: {
    defaultFee: '',
  },
  lido_sol: {
    defaultFee: '',
  },
  cosmos: {
    defaultFee: '',
  },
  ethereum: {
    defaultFee: '',
  },
  flow: {
    defaultFee: '',
  },
  kusama: {
    defaultFee: '',
  },
  persistence: {
    defaultFee: '',
  },
  polkadot: {
    defaultFee: '',
  },
  polygon: {
    defaultFee: '',
  },
  terra: {
    defaultFee: '',
  },
  thegraph: {
    defaultFee: '',
  },
  thorchain: {
    defaultFee: '',
  },
  tokamak: {
    defaultFee: '',
  },
  agoric: {
    defaultFee: '',
  },
  // add blockchains...
};

export const EXPLORER: ChainList<Explorer> = {
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
  celo: {
    mainnet: {
      address: ``,
      tx: ``,
    },
    testnet: {
      address: ``,
      tx: ``,
    },
  },
  lido_eth: {
    mainnet: {
      address: ``,
      tx: ``,
    },
    testnet: {
      address: ``,
      tx: ``,
    },
  },
  lido_sol: {
    mainnet: {
      address: ``,
      tx: ``,
    },
    testnet: {
      address: ``,
      tx: ``,
    },
  },
  cosmos: {
    mainnet: {
      address: ``,
      tx: ``,
    },
    testnet: {
      address: ``,
      tx: ``,
    },
  },
  ethereum: {
    mainnet: {
      address: ``,
      tx: ``,
    },
    testnet: {
      address: ``,
      tx: ``,
    },
  },
  flow: {
    mainnet: {
      address: ``,
      tx: ``,
    },
    testnet: {
      address: ``,
      tx: ``,
    },
  },
  kusama: {
    mainnet: {
      address: ``,
      tx: ``,
    },
    testnet: {
      address: ``,
      tx: ``,
    },
  },
  persistence: {
    mainnet: {
      address: ``,
      tx: ``,
    },
    testnet: {
      address: ``,
      tx: ``,
    },
  },
  polkadot: {
    mainnet: {
      address: ``,
      tx: ``,
    },
    testnet: {
      address: ``,
      tx: ``,
    },
  },
  polygon: {
    mainnet: {
      address: ``,
      tx: ``,
    },
    testnet: {
      address: ``,
      tx: ``,
    },
  },
  terra: {
    mainnet: {
      address: ``,
      tx: ``,
    },
    testnet: {
      address: ``,
      tx: ``,
    },
  },
  thegraph: {
    mainnet: {
      address: ``,
      tx: ``,
    },
    testnet: {
      address: ``,
      tx: ``,
    },
  },
  thorchain: {
    mainnet: {
      address: ``,
      tx: ``,
    },
    testnet: {
      address: ``,
      tx: ``,
    },
  },
  tokamak: {
    mainnet: {
      address: ``,
      tx: ``,
    },
    testnet: {
      address: ``,
      tx: ``,
    },
  },
  agoric: {
    mainnet: {
      address: ``,
      tx: ``,
    },
    testnet: {
      address: ``,
      tx: ``,
    },
  },
  // add blockchains...
};

export const UNSTAKE: ChainList<Unstake> = {
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
  celo: {},
  mina: {},
  lido_eth: {},
  lido_sol: {},
  cosmos: {},
  ethereum: {},
  flow: {},
  kusama: {},
  persistence: {},
  polkadot: {},
  polygon: {},
  terra: {},
  thegraph: {},
  thorchain: {},
  tokamak: {},
  agoric: {},
};
