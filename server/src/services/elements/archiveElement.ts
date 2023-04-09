import pool from "../../db";
import { EElementStatus } from "../../mappers/elements";

export const archiveElement = async (elementId: number) => {
  const client = await pool.connect();

  await client.query("UPDATE elements SET status = $1 WHERE id = $2", [
    EElementStatus.ARCHIVED,
    elementId,
  ]);

  await client.release();
};
