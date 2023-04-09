import { ITableImageResponse } from "../../mappers/tables";
import { getTableImageByCompanyId } from "../files/getTableImageByType";
import pool from "../../db";

export const findImage = async (
  companyId: number
): Promise<ITableImageResponse> => {
  const client = await pool.connect();

  const image = await getTableImageByCompanyId(client, companyId);

  if (!image) {
    return {};
  }

  await client.release();

  return { filePath: `/files/${image.id}.${image.ext}` };
};
