import pool from "../../db";
import { EElementStatus, IElement } from "../../mappers/elements";

export const createElement = async (element: IElement, companyId: number) => {
  const client = await pool.connect();

  await client.query(
    "INSERT INTO elements (element, price, price_for_count, company_id, status) VALUES ($1,$2,$3,$4, $5)",
    [
      element.element,
      element.price,
      element.priceForCount,
      companyId,
      EElementStatus.ACTIVE,
    ]
  );

  await client.release();
};
