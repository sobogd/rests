import pool from "../../db";
import { ITable } from "../../mappers/tables";

export const updateTable = async (table: ITable) => {
  const client = await pool.connect();

  if (!table?.id) {
    throw Error("Id is empty");
  }

  await client.query(
    "UPDATE tables SET name = $1, number = $2, position_x = $3, position_y = $4 WHERE id = $5",
    [table.name, table.number, table.positionX, table.positionY, table.id]
  );

  await client.release();
};
