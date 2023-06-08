export interface ITransaction {
  id: string;
  transaction_type: 'output' | 'input';
  description: string;
  category_name: string;
  category_id: number;
  amount: number;
  transaction_at: string;
  wallet_id: number;
  wallet_name: string
  paid: boolean
}


export interface IFindTransactionOptions {
  pageNumber: number;
  pageSize: number;
  categoryId: number;
  walletId: number;
  month: string;
  year: string;
}
