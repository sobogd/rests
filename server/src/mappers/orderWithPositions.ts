import { IOrder, TBDOOrder } from "../interfaces/orders";
import {
  IOrderPosition,
  IOrderPositionDB,
  IOrderWithPosition,
  IOrderWithPositionDB,
} from "../interfaces/orders-positions";

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
