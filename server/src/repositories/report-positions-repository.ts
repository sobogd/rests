import pool from "../db";
import queryBuilder from "../utils/query-builder";

const props = [
  { name: "id", dbName: "id" },
  { name: "createDate", dbName: "create_date" },
  { name: "title", dbName: "title" },
  { name: "price", dbName: "price" },
  { name: "averageTime", dbName: "average_time" },
  { name: "maxTime", dbName: "max_time" },
  { name: "minTime", dbName: "min_time" },
  { name: "amount", dbName: "amount" },
  { name: "isAdditional", dbName: "is_additional" },
];

const tableName = "report_positions";

interface IReportPosition {
  id?: number;
  createDate: string;
  title: string;
  price: number;
  averageTime?: number;
  maxTime?: number;
  minTime?: number;
  amount?: number;
  isAdditional: boolean;
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

const findBySpec = async (field: string, value: string) => {
  const client = await pool.connect();
  const foundedRows = await queryBuilder.selectBySpec(client, tableName, { [field]: value });
  client.release();

  return queryBuilder.mapFromDb(foundedRows, props);
};

const create = async (payload: IReportPosition) => {
  const client = await pool.connect();
  const createdRows = await queryBuilder.insertOne(client, tableName, queryBuilder.mapToDb(payload, props));
  client.release();

  return queryBuilder.mapFromDb(createdRows, props)[0];
};

const updateById = async (payload: IReportPosition, id: number) => {
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
  findBySpec,
  create,
  updateById,
  removeById,
};
