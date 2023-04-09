import pool from "../../db";
import { ICategory } from "../../mappers/categories";

export const updateCategory = async (category: ICategory) => {
  const client = await pool.connect();

  if (!category?.id) {
    throw Error("Id is empty");
  }

  await client.query(
    "UPDATE categories SET name = $1, description = $2 WHERE id = $3",
    [category.name, category.description || null, category.id]
  );

  await client.release();
};
