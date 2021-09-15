export interface ApiResponse {
  api: string;
  data?: Balance | Epoch | Price | Stake[] | StakingStatus | Calculator;
  error?: BalanceError | EpochError | PriceError | StakingStatusError | CalculatorError;
}

/*
 Balance interface
*/

export interface Balance {
  decimal: number;
  total: string;
  locked: string;
  stake?: Stake[];
  account?: Account;
}

export interface Account {
  address: string;
  publicKey?: string;
  id?: string;
}

export enum BalanceError {
  NO_ERROR = '',
  ADDRESS_ERROR = 'Address error',
  NO_ADDRESS = 'No address',
  NOT_SUPPORTED_CHAIN = 'Not supported chain',
}

export interface Stake {
  validator: Account;
  value: string;
  status: StakeStatus;
  stakeAccount?: string;
}

export enum StakeStatus {
  NOT_DELEGATED = 'Not delegated',
  DELEGATING = 'Not delegated(activating)',
  DELEGATED = 'Delegated',
  UNDELEGATING = 'Delegated(deactivating)',
}

/*
 Epoch interface
*/

export interface Epoch {
  epochStartTime: number;
  epochEndTime: number;
}

export enum EpochError {
  NO_ERROR = '',
  TIME_ERROR = 'Epoch time error',
  NOT_SUPPORTED_CHAIN = 'Not supported chain',
}

/*
  Price interface
*/

export interface Price {
  now?: number;
  high24h?: number;
  low24h?: number;
  change7d?: number;
  change14d?: number;
  change30d?: number;
  change1y?: number;
}

export enum PriceError {
  NO_ERROR = '',
  NOT_SUPPORTED_CHAIN = 'Not supported chain',
}

/*
  홈페이지 메인 페이지 ChainListInfo interface
*/
export interface ChainList<T> {
  celo: T;
  mina: T;
  lido_eth: T;
  lido_sol: T;
  near: T;
  solana: T;
  cosmos: T;
  ethereum: T;
  flow: T;
  kusama: T;
  persistence: T;
  polkadot: T;
  polygon: T;
  terra: T;
  thegraph: T;
  thorchain: T;
  tokamak: T;
  agoric: T;
}

export interface ChainListInfo {
  href: string;
  title: string;
  img: string;
  apr: number[];
  isMainnet: boolean;
}

/*
  체인별 세부 페이지 ChainInfo interface
*/

export interface ChainInfo {
  title: string;
  links: {
    [key: string]: string;
  };
  subtitle: string;
  stakingStatus?: StakingStatus;
  calculator?: Calculator;
  chainType?: number;
}

export interface StakingStatus {
  staking: number;
  delegators: number;
  reward: number;
  comission: number;
}

export enum StakingStatusError {
  NO_ERROR = '',
  NOT_SUPPORTED_CHAIN = 'Not supported chain',
}

export interface Calculator {
  defaultAmount: number;
  maxAmount: number;
  apr: number;
}

export enum CalculatorError {
  NO_ERROR = '',
  NOT_SUPPORTED_CHAIN = 'Not supported chain',
}

/*
  staking & unstkaing용 StakeInfo interface
*/
export interface StakeInfo {
  title: string;
  validators?: ChainValidator[];
  defaultFee?: Fee;
  explorer?: Explorer;
  unstake?: Unstake;
  chainType?: number;
}

export interface ChainValidator {
  title: string;
  address: string;
  comission?: string;
}

export interface Fee {
  defaultFee: string;
}

export interface Explorer {
  mainnet: {
    address: string;
    tx: string;
  };
  testnet: {
    address: string;
    tx: string;
  };
}

export interface Unstake {
  hasStakeAccount?: boolean;
  isAmountSetable?: boolean;
  isClaim?: boolean;
}
