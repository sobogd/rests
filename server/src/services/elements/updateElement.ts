import pool from "../../db";
import { IElement } from "../../mappers/elements";

export const updateElement = async (element: IElement) => {
  const client = await pool.connect();

  if (!element?.id) {
    throw Error("Id is empty");
  }

  await client.query(
    "UPDATE elements SET element = $1, price = $2, price_for_count = $3 WHERE id = $4",
    [element.element, element.price, element.priceForCount, element.id]
  );

  await client.release();
};
