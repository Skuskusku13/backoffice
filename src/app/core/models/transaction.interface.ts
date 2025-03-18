export interface Transaction {
  date: Date;
  tig_id: number;
  category: number;
  quantity: number;
  price: number;
  onSale: boolean;
  type: 'ajout' | 'retraitVente' | 'retraitInvendus';
}
