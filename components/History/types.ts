export interface Data {
  id: number;
  time: string;
  from: string;
  to: string;
  amount: number;
}

export type Order = 'asc' | 'desc';

export interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
}
