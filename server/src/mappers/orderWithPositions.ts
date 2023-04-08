import { EOrderStatus } from "./orders";
import { EOrderPositionStatus } from "./orderPositions";

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

export const mapOrderWithPositionsFromDB = (
  rows: IOrderWithPositionDB[]
): IOrderWithPosition[] =>
  rows?.length
    ? rows.map((row) => ({
        orderId: row.order_id,
        orderPositionId: row.order_position_id,
        orderStatus: row.order_status,
        orderPositionStatus: row.order_position_status,
        tableId: row.table_id,
        orderComment: row.order_comment,
        created: row.created,
        additional: row.additional,
        orderPositionCreated: row.order_position_created,
        orderPositionComment: row.order_position_comment,
        positionId: row.position_id,
      }))
    : [];

export const mapOrderWithPositionsToDB = (
  rows: IOrderWithPosition[]
): IOrderWithPositionDB[] =>
  rows?.length
    ? rows.map((row) => ({
        order_id: row.orderId,
        order_position_id: row.orderPositionId,
        order_status: row.orderStatus,
        order_position_status: row.orderPositionStatus,
        table_id: row.tableId,
        order_comment: row.orderComment,
        created: row.created,
        additional: row.additional,
        order_position_created: row.orderPositionCreated,
        order_position_comment: row.orderPositionComment,
        position_id: row.positionId,
      }))
    : [];
