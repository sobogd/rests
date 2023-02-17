import pool from "../db";
import { IOrderPositionLog } from "../interfaces/orders-positions-logs";
import queryBuilder from "../utils/query-builder";

const props = [
  { name: "id", dbName: "id" },
  { name: "operationType", dbName: "operation_type" },
  { name: "operationDate", dbName: "operation_date" },
  { name: "orderId", dbName: "order_id" },
  { name: "positionId", dbName: "position_id" },
  { name: "positionComment", dbName: "position_comment" },
  { name: "positionAdditional", dbName: "position_additional" },
];

const tableName = "orders_positions_logs";

const create = async (orderPositionLog: IOrderPositionLog) => {
  const client = await pool.connect();

  const createdRows = await queryBuilder.insertOne(
    client,
    tableName,
    queryBuilder.mapToDb({ ...orderPositionLog, id: undefined }, props)
  );
  client.release();

  return queryBuilder.mapFromDb(createdRows, props)[0];
};

export default {
  create,
};
