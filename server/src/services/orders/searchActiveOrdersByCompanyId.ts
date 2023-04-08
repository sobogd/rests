import pool from "../../db";
import { mapOrderWithPositionsFromDB } from "../../mappers/orderWithPositions";
import { EOrderStatus, IOrder } from "../../mappers/orders";
import { EOrderPositionStatus } from "../../mappers/orderPositions";

export const searchActiveOrdersByCompanyId = async (
  companyId: number
): Promise<IOrder[]> => {
  const client = await pool.connect();

  const { rows: ordersWithPositionsFromDB } = await client.query(
    `
        SELECT 
            o.id as "order_id", 
            op.id as "order_position_id", 
            o.table_id, 
            o.comment as "order_comment", 
            o.status as "order_status", 
            op.status as "order_position_status", 
            o.created, 
            op.additional, 
            op.comment as "order_position_comment", 
            op.created as "order_position_created", 
            op.position_id 
        FROM orders o 
            LEFT JOIN orders_positions op ON op.order_id = o.id 
        WHERE o.company_id = $1 AND o.status in($2,$3) AND op.status <> $4
    `,
    [
      companyId,
      EOrderStatus.ACTIVE,
      EOrderStatus.FINISHED,
      EOrderPositionStatus.ARCHIVED,
    ]
  );

  const ordersWithPositions = mapOrderWithPositionsFromDB(
    ordersWithPositionsFromDB
  );

  const groupedByOrderId = Object.values(
    ordersWithPositions.reduce((acc: any, owp: any) => {
      const position = {
        id: owp.orderPositionId,
        positionId: owp.positionId,
        comment: owp.orderPositionComment,
        created: owp.orderPositionCreated,
        additional: owp.additional,
        status: owp.orderPositionStatus,
      };
      if (acc[owp.orderId]) {
        acc[owp.orderId].positions = [...acc[owp.orderId].positions, position];
      } else {
        acc[owp.orderId] = {
          id: owp.orderId,
          tableId: owp.tableId,
          created: owp.created,
          comment: owp.orderComment,
          status: owp.orderStatus,
          positions: [position],
        };
      }
      return acc;
    }, {})
  ) as IOrder[];

  await client.release();

  return groupedByOrderId;
};
