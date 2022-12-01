import pool from "../db";
import { IElement } from "../interfaces/elements";
import queryBuilder from "../utils/query-builder";

const props = [
  { name: "id", dbName: "id" },
  { name: "element", dbName: "element" },
  { name: "price", dbName: "price" },
  { name: "priceForCount", dbName: "price_for_count" },
];

const tableName = "elements";

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

const create = async (element: IElement) => {
  const client = await pool.connect();

  const createdRows = await queryBuilder.insertOne(
    client,
    tableName,
    queryBuilder.mapToDb({ ...element, id: undefined }, props)
  );
  client.release();

  return queryBuilder.mapFromDb(createdRows, props)[0];
};

const updateById = async (element: IElement, id: number) => {
  const client = await pool.connect();
  const updatdRows = await queryBuilder.updateOneBySpec(
    client,
    tableName,
    queryBuilder.mapToDb({ ...element, id: undefined }, props),
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
