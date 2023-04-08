import { EOrderPositionStatus, EOrderStatus } from "../enums.ts/ordersLogs";

export interface IOrderPosition {
  id?: number;
  orderId?: number;
  positionId?: number;
  additional?: string;
  created?: string;
  comment?: string;
  status?: EOrderPositionStatus;
}

export interface IOrderPositionDB {
  id?: number;
  order_id?: number;
  position_id?: number;
  additional?: string;
  created?: string;
  comment?: string;
  status?: EOrderPositionStatus;
}

export interface IOrderWithPosition {
  orderId: number;
  orderPositionId: number;
  orderStatus: EOrderStatus;
  orderPositionStatus: EOrderPositionStatus;
  tableId: number;
  orderComment?: string;
  created: string;
  additional?: string;
  orderPositionCreated?: string;
  orderPositionComment?: string;
  positionId: number;
}

export interface IOrderWithPositionDB {
  order_id: number;
  order_position_id: number;
  order_status: EOrderStatus;
  order_position_status: EOrderPositionStatus;
  table_id: number;
  order_comment?: string;
  created: string;
  additional?: string;
  order_position_created?: string;
  order_position_comment?: string;
  position_id: number;
}
