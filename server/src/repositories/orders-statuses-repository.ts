import pool from "../db";
import { IOrderStatus } from "../interfaces/orders-statuses";
import queryBuilder from "../utils/query-builder";

const props = [
  { name: "id", dbName: "id" },
  { name: "name", dbName: "name" },
];

const tableName = "orders_statuses";

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

const create = async (orderStatus: IOrderStatus) => {
  const client = await pool.connect();

  const createdRows = await queryBuilder.insertOne(
    client,
    tableName,
    queryBuilder.mapToDb({ ...orderStatus, id: undefined }, props)
  );
  client.release();

  return queryBuilder.mapFromDb(createdRows, props)[0];
};

const updateById = async (orderStatus: IOrderStatus, id: number) => {
  const client = await pool.connect();
  const updatdRows = await queryBuilder.updateOneBySpec(
    client,
    tableName,
    queryBuilder.mapToDb({ ...orderStatus, id: undefined }, props),
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
};
