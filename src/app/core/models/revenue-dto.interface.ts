export interface RevenuesDto {
  totalRevenueActual: number;
  totalRevenue: number;
  revenuesByPeriod: RevenueByPeriod[];
}

export interface RevenueByPeriod {
  date_group: string;
  total: number;
}
