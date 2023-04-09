import pool from "../../db";
import { ETableStatuses, ITable, mapTablesFromDB } from "../../mappers/tables";

export const searchTables = async (companyId: number): Promise<ITable[]> => {
  const client = await pool.connect();

  const { rows: tablesDB } = await client.query(
    "SELECT * FROM tables WHERE company_id = $1 AND status = $2",
    [companyId, ETableStatuses.ACTIVE]
  );

  const tables = mapTablesFromDB(tablesDB);

  await client.release();

  return tables;
};
