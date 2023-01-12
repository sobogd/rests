export interface IOrder {
  id?: number;
  tableId?: number;
  createTime?: string;
  readyTime?: string;
  finishTime?: string;
  comment?: string;
  status?: string;
  discount?: string;
}

export interface IOrderCreateRequest {
  orderId?: number;
  tableId: number;
  createTime?: string;
  positions: {
    id?: number;
    positionId: number;
    additional?: { id: number; count: number }[];
    comment?: string;
  }[];
  comment?: string;
}

export interface IDayReportResponse {
  id: number;
  time: string;
  date: string;
  discount: number;
  total: number;
  positions: string[];
}
