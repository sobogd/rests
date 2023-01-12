import pool from "../db";
import { IOrder } from "../interfaces/orders";
import queryBuilder from "../utils/query-builder";

const props = [
  { name: "id", dbName: "id" },
  { name: "tableId", dbName: "table_id" },
  { name: "createTime", dbName: "create_time" },
  { name: "readyTime", dbName: "ready_time" },
  { name: "finishTime", dbName: "finish_time" },
  { name: "comment", dbName: "comment" },
  { name: "status", dbName: "status" },
  { name: "discount", dbName: "discount" },
];

const tableName = "orders";

const findAll = async () => {
  const client = await pool.connect();
  const foundedRows = await queryBuilder.selectAll(client, tableName);
  client.release();

  return queryBuilder.mapFromDb(foundedRows, props);
};

const findAllActive = async () => {
  const client = await pool.connect();
  const foundedRows = await queryBuilder.selectBySpec(
    client,
    tableName,
    { status: "active" },
    { field: "create_time", direction: "DESC" }
  );
  client.release();

  return queryBuilder.mapFromDb(foundedRows, props);
};

const findById = async (id: number) => {
  const client = await pool.connect();
  const foundedRows = await queryBuilder.selectBySpec(client, tableName, { id });
  client.release();

  return queryBuilder.mapFromDb(foundedRows, props)[0];
};

const create = async (order: IOrder) => {
  const client = await pool.connect();

  const createdRows = await queryBuilder.insertOne(
    client,
    tableName,
    queryBuilder.mapToDb({ ...order, id: undefined }, props)
  );
  client.release();

  return queryBuilder.mapFromDb(createdRows, props)[0];
};

const updateById = async (order: IOrder, id: number) => {
  const client = await pool.connect();
  const updatdRows = await queryBuilder.updateOneBySpec(
    client,
    tableName,
    queryBuilder.mapToDb({ ...order, id: undefined }, props),
    { id }
  );
  client.release();

  return queryBuilder.mapFromDb(updatdRows, props)[0];
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
  create,
  updateById,
  removeById,
  findAllActive,
};
