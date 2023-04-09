import pool from "../../db";
import { ETableStatuses } from "../../mappers/tables";

export const archiveTable = async (tableId: number) => {
  const client = await pool.connect();

  await client.query("UPDATE tables SET status = $1 WHERE id = $2", [
    ETableStatuses.ARCHIVED,
    tableId,
  ]);

  await client.release();
};
