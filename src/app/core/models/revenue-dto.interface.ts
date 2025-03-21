export interface RevenuesDto {
  totalRevenueActual: number;
  totalRevenue: number;
  revenuesByPeriod: AmountByPeriod[];
  totalBillsActual: number;
  totalBills: number;
  billsByPeriod: AmountByPeriod[];
}

export interface AmountByPeriod {
  date_group: string;
  total: number;
}
