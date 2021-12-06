import { Account } from '@components/Menu/account';

export interface LayoutProps {
  children: React.ReactNode;
  themeToggler: () => void;
  themeMode: string;
  connected: (accounts: Account[]) => void;
}
