import { IOrder, TBDOOrder } from "../interfaces/orders";
import {
  IOrderPosition,
  IOrderPositionDB,
} from "../interfaces/orders-positions";

export const mapOrderPositionsFromDB = (
  rows: IOrderPositionDB[]
): IOrderPosition[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        orderId: row.order_id,
        positionId: row.position_id,
        created: row.created,
        additional: row.additional,
        comment: row.comment,
        status: row.status,
      }))
    : [];

export const mapOrderPositionsToDB = (
  rows: IOrderPosition[]
): IOrderPositionDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        order_idd: row.orderId,
        position_id: row.positionId,
        created: row.created,
        additional: row.additional,
        comment: row.comment,
        status: row.status,
      }))
    : [];
