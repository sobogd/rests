import pool from "../../db";
import { checkCompanyIdAndOrderId } from "./updateOrder";
import { EOrderStatus } from "../../mappers/orders";

export const archiveOrder = async (
  id: number,
  companyId: number
): Promise<any> => {
  const client = await pool.connect();

  await checkCompanyIdAndOrderId(client, id, companyId);

  await client.query("UPDATE orders SET status = $1 where id = $2", [
    EOrderStatus.ARCHIVED,
    id,
  ]);

  await client.query(
    "INSERT INTO orders_logs (order_id, status) VALUES ($1, $2)",
    [id, EOrderStatus.ARCHIVED]
  );

  await client.release();
};
