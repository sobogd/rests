import pool from "../../db";
import {
  ECategoryStatus,
  ICategory,
  mapCategoriesFromDB,
} from "../../mappers/categories";

export const searchCategories = async (
  companyId: number
): Promise<ICategory[]> => {
  const client = await pool.connect();

  const { rows: categoriesDB } = await client.query(
    "SELECT * FROM categories WHERE company_id = $1 AND status = $2",
    [companyId, ECategoryStatus.ACTIVE]
  );

  const categories = mapCategoriesFromDB(categoriesDB);

  await client.release();

  return categories;
};
