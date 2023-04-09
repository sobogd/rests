import pool from "../../db";
import {
  EElementStatus,
  IElement,
  mapElementsFromDB,
} from "../../mappers/elements";

export const searchElements = async (
  companyId: number
): Promise<IElement[]> => {
  const client = await pool.connect();

  const { rows: elementsDB } = await client.query(
    "SELECT * FROM elements WHERE company_id = $1 AND status = $2",
    [companyId, EElementStatus.ACTIVE]
  );

  const elements = mapElementsFromDB(elementsDB);

  await client.release();

  return elements;
};
