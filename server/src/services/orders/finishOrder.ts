import pool from "../../db";
import { EOrderStatus } from "../../enums.ts/ordersLogs";
import { checkCompanyIdAndOrderId } from "./updateOrder";
import { EOrderPositionLog } from "../../enums.ts/orders-positions-logs-enums";

export const finishOrder = async (
  id: number,
  discount: number
): Promise<void> => {
  const client = await pool.connect();

  await client.query(
    "UPDATE orders SET status = $1, discount = $2 where id = $3",
    [EOrderStatus.PAID, discount, id]
  );

  await client.query(
    "INSERT INTO orders_logs (order_id, status) VALUES ($1, $2)",
    [id, EOrderStatus.PAID]
  );

  await client.release();
};
