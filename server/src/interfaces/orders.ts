export interface IOrder {
  id?: number;
  tableId?: number;
  createTime?: string;
  readyTime?: string;
  finishTime?: string;
  comment?: string;
}

export interface IOrderCreateRequest {
  id?: number;
  tableId: number;
  positions: {
    positionId: number;
    additional: { id: number; count: number }[];
    comment: string;
  }[];
  comment: string;
}
