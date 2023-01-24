import { DateTime } from "luxon";
import pool from "../db";
import { IOrderPosition } from "../interfaces/orders-positions";
import queryBuilder from "../utils/query-builder";

const props = [
  { name: "id", dbName: "id" },
  { name: "orderId", dbName: "order_id" },
  { name: "positionId", dbName: "position_id" },
  { name: "additional", dbName: "additional" },
  { name: "startTime", dbName: "start_time" },
  { name: "finishTime", dbName: "finish_time" },
  { name: "comment", dbName: "comment" },
];

const tableName = "orders_positions";

const findAll = async () => {
  const client = await pool.connect();
  const foundedRows = await queryBuilder.selectAll(client, tableName);
  client.release();

  return queryBuilder.mapFromDb(foundedRows, props);
};

const findById = async (id: number) => {
  const client = await pool.connect();
  const foundedRows = await queryBuilder.selectBySpec(client, tableName, { id });
  client.release();

  return queryBuilder.mapFromDb(foundedRows, props)[0];
};

const findAllByOrderId = async (orderId: number) => {
  const client = await pool.connect();
  const foundedRows = await queryBuilder.selectBySpec(client, tableName, { order_id: orderId });
  client.release();

  return queryBuilder.mapFromDb(foundedRows, props);
};

const create = async (orderPosition: IOrderPosition) => {
  const client = await pool.connect();

  const createdRows = await queryBuilder.insertOne(
    client,
    tableName,
    queryBuilder.mapToDb({ ...orderPosition, id: undefined }, props)
  );
  client.release();

  return queryBuilder.mapFromDb(createdRows, props)[0];
};

const updateById = async (orderPosition: IOrderPosition, id: number) => {
  const client = await pool.connect();
  const updatdRows = await queryBuilder.updateOneBySpec(
    client,
    tableName,
    queryBuilder.mapToDb({ ...orderPosition, id: undefined }, props),
    { id }
  );
  client.release();

  return queryBuilder.mapFromDb(updatdRows, props)[0];
};

const removeFinishTimeById = async (id: number) => {
  const client = await pool.connect();
  const { rows } = await client.query(
    `UPDATE orders_positions SET finish_time = $2 WHERE id = $1 RETURNING *;`,
    [id, null]
  );
  client.release();

  return queryBuilder.mapFromDb(rows, props)[0];
};

const finishOrderPositionById = async (id: number) => {
  const client = await pool.connect();
  const { rows } = await client.query(
    `UPDATE orders_positions SET finish_time = $2 WHERE id = $1 RETURNING *;`,
    [id, DateTime.now().toUTC().toSQL()]
  );
  client.release();

  return queryBuilder.mapFromDb(rows, props)[0];
};

const removeById = async (id: number) => {
  const client = await pool.connect();
  const removedRows = await queryBuilder.removeOneBySpec(client, tableName, { id });
  client.release();

  return queryBuilder.mapFromDb(removedRows, props)[0];
};

export default {
  findAll,
  findById,
  findAllByOrderId,
  create,
  updateById,
  removeById,
  removeFinishTimeById,
  finishOrderPositionById,
};
