/*
 Balance interface
*/

export interface Balance {
  decimal: number;
  total: string;
  locked: string;
  stake?: Stake[];
  account?: Account;
  error: BalanceError;
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
  title: string;
}

/*
 Epoch interface
*/

export interface Epoch {
  epochStartTime: number;
  epochEndTime: number;
  error: EpochError;
}

export enum EpochError {
  NO_ERROR = '',
  TIME_ERROR = 'Epoch time error',
  NOT_SUPPORTED_CHAIN = 'Not supported chain',
}
