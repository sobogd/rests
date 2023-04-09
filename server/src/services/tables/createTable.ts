import pool from "../../db";
import { ETableStatuses, ITable } from "../../mappers/tables";

export const createTable = async (table: ITable, companyId: number) => {
  const client = await pool.connect();

  await client.query(
    "INSERT INTO tables (name, number, position_x, position_y, company_id, status) VALUES ($1,$2,$3,$4,$5,$6)",
    [
      table.name,
      table.number,
      table.positionX,
      table.positionY,
      companyId,
      ETableStatuses.ACTIVE,
    ]
  );

  await client.release();
};
