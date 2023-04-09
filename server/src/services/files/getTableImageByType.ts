import { EFileTypes, IIfle, mapFilesFromDB } from "../../mappers/files";
import { PoolClient } from "pg";

export const getTableImageByCompanyId = async (
  client: PoolClient,
  companyId: number
): Promise<IIfle | null> => {
  const { rows: filesDB } = await client.query(
    "SELECT * FROM files WHERE company_id = $1 AND type = $2",
    [companyId, EFileTypes.TABLE]
  );

  const file = mapFilesFromDB(filesDB)[0];

  if (!file || !file.id) {
    return null;
  }

  return file;
};
