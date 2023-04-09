export interface IDailySummaryReport {
  summary: {
    total: number;
    paymentMethodId: number;
  }[];
  ordersCount: number;
  averageReceipt: number;
  date: string;
  totalSummary: number;
}

export interface IReportsState {
  isLoading: boolean;
  dailyReports: {
    startDate: string;
    endDate: string;
    reports?: IDailySummaryReport[];
  };
}
