import pool from "../../db";
import {
  EOrderStatus,
  IOrderForCreate,
  mapOrdersFromDB,
} from "../../mappers/orders";
import {
  EOrderPositionLog,
  EOrderPositionStatus,
  mapOrderPositionsFromDB,
} from "../../mappers/orderPositions";

export const createOrder = async (
  companyId: number,
  orderForCreate: IOrderForCreate
): Promise<{ id: number }> => {
  const client = await pool.connect();

  const { rows } = await client.query(
    "INSERT INTO orders (table_id, company_id, comment, status) VALUES ($1, $2, $3, $4) RETURNING *",
    [
      orderForCreate.tableId,
      companyId,
      orderForCreate.comment,
      EOrderStatus.ACTIVE,
    ]
  );

  const createdOrder = mapOrdersFromDB(rows)[0];

  if (!createdOrder.id) throw Error("Error while creating order");

  await client.query(
    "INSERT INTO orders_logs (order_id, status) VALUES ($1, $2)",
    [createdOrder.id, EOrderStatus.ACTIVE]
  );

  for (const position of orderForCreate.positions) {
    const additional = position.additional
      ?.map((a) => `${a.count}-${a.id}`)
      .join("/");

    const { rows } = await client.query(
      "INSERT INTO orders_positions (order_id, position_id, additional, comment, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        createdOrder.id,
        position.positionId,
        additional || null,
        position.comment || null,
        EOrderPositionStatus.TO_DO,
      ]
    );
    const createdOrderPosition = mapOrderPositionsFromDB(rows)[0];

    if (!createdOrderPosition.id)
      throw Error("Error while creating order position");

    await client.query(
      `INSERT INTO orders_positions_logs (operation, order_position_id) VALUES ($1, $2)`,
      [EOrderPositionLog.CREATE, createdOrderPosition.id]
    );
  }

  await client.release();

  return { id: createdOrder.id };
};
