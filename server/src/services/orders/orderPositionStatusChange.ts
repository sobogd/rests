import pool from "../../db";
import {
  EOrderPositionLog,
  EOrderPositionStatus,
  mapOrderPositionsFromDB,
} from "../../mappers/orderPositions";
import { EOrderStatus } from "../../mappers/orders";

export const orderPositionStatusChange = async (
  id: number,
  status: EOrderPositionStatus
): Promise<void> => {
  const client = await pool.connect();

  if (status === EOrderPositionStatus.TO_DO) {
    const { rows: updatedOrderPositions } = await client.query(
      "UPDATE orders_positions SET status = $1 WHERE id = $2 RETURNING *",
      [EOrderPositionStatus.TO_DO, id]
    );

    const updatedOrderPosition = mapOrderPositionsFromDB(
      updatedOrderPositions
    )[0];

    await client.query(
      `INSERT INTO orders_positions_logs (operation, order_position_id) VALUES ($1, $2)`,
      [EOrderPositionLog.TO_DO, updatedOrderPosition.id]
    );

    await client.query("UPDATE orders SET status = $1 WHERE id = $2", [
      EOrderStatus.ACTIVE,
      updatedOrderPosition.orderId,
    ]);

    await client.query(
      "INSERT INTO orders_logs (order_id, status) VALUES ($1, $2)",
      [updatedOrderPosition.orderId, EOrderStatus.ACTIVE]
    );
  }

  if (status === EOrderPositionStatus.COOKING) {
    const { rows: updatedOrderPositions } = await client.query(
      "UPDATE orders_positions SET status = $1 WHERE id = $2 RETURNING id",
      [EOrderPositionStatus.COOKING, id]
    );

    const updatedOrderPosition = mapOrderPositionsFromDB(
      updatedOrderPositions
    )[0];

    await client.query(
      `INSERT INTO orders_positions_logs (operation, order_position_id) VALUES ($1, $2)`,
      [EOrderPositionLog.COOKING, updatedOrderPosition.id]
    );
  }

  if (status === EOrderPositionStatus.READY) {
    const { rows: updatedOrderPositions } = await client.query(
      "UPDATE orders_positions SET status = $1 WHERE id = $2 RETURNING id",
      [EOrderPositionStatus.READY, id]
    );

    const updatedOrderPosition = mapOrderPositionsFromDB(
      updatedOrderPositions
    )[0];

    await client.query(
      `INSERT INTO orders_positions_logs (operation, order_position_id) VALUES ($1, $2)`,
      [EOrderPositionLog.READY, updatedOrderPosition.id]
    );
  }

  if (status === EOrderPositionStatus.FINISHED) {
    const { rows: updatedOrderPositions } = await client.query(
      "UPDATE orders_positions SET status = $1 WHERE id = $2 RETURNING *",
      [EOrderPositionStatus.FINISHED, id]
    );

    const updatedOrderPosition = mapOrderPositionsFromDB(
      updatedOrderPositions
    )[0];

    await client.query(
      `INSERT INTO orders_positions_logs (operation, order_position_id) VALUES ($1, $2)`,
      [EOrderPositionLog.FINISHED, updatedOrderPosition.id]
    );

    const { rows: orderPositionsDB } = await client.query(
      "SELECT status FROM orders_positions WHERE order_id = $1 AND status <> $2",
      [updatedOrderPosition.orderId, EOrderPositionStatus.ARCHIVED]
    );

    const orderPositions = mapOrderPositionsFromDB(orderPositionsDB);

    if (
      orderPositions.length ===
      orderPositions.filter((o) => o.status === EOrderPositionStatus.FINISHED)
        .length
    ) {
      await client.query("UPDATE orders SET status = $1 WHERE id = $2", [
        EOrderStatus.FINISHED,
        updatedOrderPosition.orderId,
      ]);

      await client.query(
        "INSERT INTO orders_logs (order_id, status) VALUES ($1, $2)",
        [updatedOrderPosition.orderId, EOrderStatus.FINISHED]
      );
    }
  }

  await client.release();
};
