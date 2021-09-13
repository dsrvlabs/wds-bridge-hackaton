export interface ApiResponse {
  api: string;
  data?: Balance | Epoch | Price | Stake[];
  error?: BalanceError | EpochError | PriceError;
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
