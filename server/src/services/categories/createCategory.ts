import pool from "../../db";
import { ECategoryStatus, ICategory } from "../../mappers/categories";

export const createCategory = async (
  category: ICategory,
  companyId: number
) => {
  const client = await pool.connect();

  await client.query(
    "INSERT INTO categories (name, description, company_id, status) VALUES ($1,$2,$3,$4)",
    [
      category.name,
      category.description || null,
      companyId,
      ECategoryStatus.ACTIVE,
    ]
  );

  await client.release();
};
