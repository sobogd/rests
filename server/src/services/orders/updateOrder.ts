import pool from "../../db";
import {
  EOrderStatus,
  IOrderForUpdate,
  mapOrdersFromDB,
} from "../../mappers/orders";
import { PoolClient } from "pg";
import { EOrderPositionLog } from "../../enums.ts/orders-positions-logs-enums";
import {
  EOrderPositionStatus,
  mapOrderPositionsFromDB,
} from "../../mappers/orderPositions";

export const checkCompanyIdAndOrderId = async (
  client: PoolClient,
  orderId: number,
  companyId: number
) => {
  const { rows } = await client.query(
    "SELECT company_id FROM orders WHERE id = $1",
    [orderId]
  );

  const order = mapOrdersFromDB(rows)[0];

  if (order?.companyId !== companyId)
    throw Error("Error while checking company id");

  return order;
};

export const updateOrder = async (
  orderForUpdate: IOrderForUpdate,
  companyId: number
): Promise<any> => {
  const client = await pool.connect();

  const order = await checkCompanyIdAndOrderId(
    client,
    orderForUpdate.id,
    companyId
  );

  await client.query(
    "UPDATE orders SET comment = $1, table_id = $2 where id = $3",
    [orderForUpdate.comment, orderForUpdate.tableId, orderForUpdate.id]
  );

  const { rows: oldOrderPositionsDB } = await client.query(
    "SELECT * FROM orders_positions WHERE order_id = $1",
    [orderForUpdate.id]
  );

  const oldOrderPositions = mapOrderPositionsFromDB(oldOrderPositionsDB);

  const orderPositionsIds = orderForUpdate.positions.map((p) => p.id);

  for (const oldOrderPosition of oldOrderPositions) {
    const isNeedToArchive = !orderPositionsIds.includes(oldOrderPosition.id);

    if (isNeedToArchive) {
      await client.query(
        "UPDATE orders_positions SET status = $1 WHERE id = $2",
        [EOrderPositionStatus.ARCHIVED, oldOrderPosition.id]
      );

      await client.query(
        `INSERT INTO orders_positions_logs (operation, order_position_id) VALUES ($1, $2)`,
        [EOrderPositionLog.REMOVE, oldOrderPosition.id]
      );
    }
  }

  for (const position of orderForUpdate.positions) {
    if (!position.id) {
      const { rows: createdOrderPositionsDB } = await client.query(
        "INSERT INTO orders_positions (order_id, position_id, additional, comment, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
          orderForUpdate.id,
          position.positionId,
          position.additional?.map((a) => `${a.count}-${a.id}`).join("/") ||
            null,
          position.comment || null,
          EOrderPositionStatus.TO_DO,
        ]
      );

      const createdOrderPosition = mapOrderPositionsFromDB(
        createdOrderPositionsDB
      )[0];

      await client.query(
        `INSERT INTO orders_positions_logs (operation, order_position_id) VALUES ($1, $2)`,
        [EOrderPositionLog.CREATE, createdOrderPosition.id]
      );
    }
  }

  const { rows: updatedOrderPositionsDB } = await client.query(
    "SELECT * FROM orders_positions WHERE order_id = $1 AND status <> $2",
    [orderForUpdate.id, EOrderPositionStatus.ARCHIVED]
  );

  const updatedOrderPositions = mapOrderPositionsFromDB(
    updatedOrderPositionsDB
  );
  const isHaveProcessingPositions = updatedOrderPositions.find(
    (p) => p.status !== EOrderPositionStatus.FINISHED
  );
  const isAllPositionFinished =
    updatedOrderPositions.filter(
      (p) => p.status === EOrderPositionStatus.FINISHED
    ).length === updatedOrderPositions.length;
  let newStatus = undefined;

  if (isHaveProcessingPositions) {
    newStatus = EOrderStatus.ACTIVE;
  }

  if (isAllPositionFinished) {
    newStatus = EOrderStatus.FINISHED;
  }

  if (!!newStatus) {
    await client.query("UPDATE orders SET status = $1 where id = $2", [
      newStatus,
      orderForUpdate.id,
    ]);

    await client.query(
      "INSERT INTO orders_logs (order_id, status) VALUES ($1, $2)",
      [orderForUpdate.id, newStatus]
    );
  }

  await client.release();
};
