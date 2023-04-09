import pool from "../../db";
import { ECategoryStatus } from "../../mappers/categories";

export const archiveCategory = async (categoryId: number) => {
  const client = await pool.connect();

  await client.query("UPDATE categories SET status = $1 WHERE id = $2", [
    ECategoryStatus.ARCHIVED,
    categoryId,
  ]);

  await client.release();
};
