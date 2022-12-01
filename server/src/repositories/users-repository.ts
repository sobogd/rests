import pool from "../db";
import queryBuilder from "../utils/query-builder";

const props = [
  { name: "id", dbName: "id" },
  { name: "name", dbName: "name" },
  { name: "login", dbName: "login" },
  { name: "password", dbName: "password" },
  { name: "type", dbName: "type" },
];

const tableName = "users";

interface IUsers {
  id: string;
  name: string;
  login: string;
  password: string;
  type: IUsersTypes;
}

enum IUsersTypes {
  MANAGER = "manager",
  PERSONAL = "personal",
  KITCHEN = "kitchen",
  ADMIN = "admin",
}

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

const findByLogin = async (login: string) => {
  const client = await pool.connect();
  const foundedRows = await queryBuilder.selectBySpec(client, tableName, { login });
  client.release();

  return queryBuilder.mapFromDb(foundedRows, props)[0];
};

const findByLoginAndPassword = async (login: string, password: string) => {
  const client = await pool.connect();
  const foundedRows = await queryBuilder.selectBySpec(client, tableName, { login, password });
  client.release();

  return queryBuilder.mapFromDb(foundedRows, props)[0];
};

const create = async (payload: IUsers) => {
  const client = await pool.connect();
  const createdRows = await queryBuilder.insertOne(client, tableName, queryBuilder.mapToDb(payload, props));
  client.release();

  return queryBuilder.mapFromDb(createdRows, props)[0];
};

const updateById = async (payload: IUsers, id: number) => {
  const client = await pool.connect();
  const updatdRows = await queryBuilder.updateOneBySpec(
    client,
    tableName,
    queryBuilder.mapToDb(payload, props),
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
  findByLogin,
  findByLoginAndPassword,
  create,
  updateById,
  removeById,
};
