import pool from "../db";
import { EFileTypes, IIfle } from "../interfaces/files";
import queryBuilder from "../utils/query-builder";

const props = [
  { name: "id", dbName: "id" },
  { name: "ext", dbName: "ext" },
  { name: "type", dbName: "type" },
];

const tableName = "files";

const findById = async (id: number) => {
  const client = await pool.connect();
  const foundedRows = await queryBuilder.selectBySpec(client, tableName, { id });
  client.release();

  return queryBuilder.mapFromDb(foundedRows, props)[0];
};

const findByType = async (type: EFileTypes) => {
  const client = await pool.connect();
  const foundedRows = await queryBuilder.selectBySpec(client, tableName, { type });
  client.release();

  return queryBuilder.mapFromDb(foundedRows, props)[0];
};

const create = async ({ ext, type }: IIfle) => {
  const client = await pool.connect();

  const createdRows = await queryBuilder.insertOne(
    client,
    tableName,
    queryBuilder.mapToDb({ ext, type }, props)
  );
  client.release();

  return queryBuilder.mapFromDb(createdRows, props)[0];
};

const removeById = async (id: number) => {
  const client = await pool.connect();
  const removedRows = await queryBuilder.removeOneBySpec(client, tableName, { id });
  client.release();

  return queryBuilder.mapFromDb(removedRows, props)[0];
};

export default {
  findById,
  findByType,
  create,
  removeById,
};
