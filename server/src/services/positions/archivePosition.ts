import pool from "../../db";
import { EPositionStatuses } from "../../mappers/positions";

export const archivePosition = async (positionId: number) => {
  const client = await pool.connect();

  await client.query("UPDATE positions SET status = $1 WHERE id = $2", [
    EPositionStatuses.ARCHIVED,
    positionId,
  ]);

  await client.release();
};
