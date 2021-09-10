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
  validator: Account;
  value: string;
  status: StakeStatus;
  error: BalanceError;
  stakeAccount?: string;
}

export enum StakeStatus {
  NOT_DELEGATED = 'Not delegated',
  DELEGATING = 'Not delegated(activating)',
  DELEGATED = 'Delegated',
  UNDELEGATING = 'Delegated(deactivating)',
}
