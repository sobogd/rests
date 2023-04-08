import pool from "../../db";
import { EOrderStatus } from "../../mappers/orders";

export const finishOrder = async (
  id: number,
  discount: number,
  total: number
): Promise<void> => {
  const client = await pool.connect();

  //TODO: change to front
  const paymentMethodId = discount === 0 ? 8 : 10;
  const discountId = discount === 0 ? 1 : 2;

  await client.query(
    "UPDATE orders SET status = $1, discount_id = $2, payment_method_id = $3, total = $4 where id = $5",
    [EOrderStatus.PAID, discountId, paymentMethodId, total, id]
  );

  await client.query(
    "INSERT INTO orders_logs (order_id, status) VALUES ($1, $2)",
    [id, EOrderStatus.PAID]
  );

  await client.release();
};
