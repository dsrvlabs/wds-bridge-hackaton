export interface LayoutProps {
  children: React.ReactNode;
  themeToggler: () => void;
  themeMode: string;
  getLocalAccount: () => void;
}
