import { File } from "tsoa";
import { EFileTypes, mapFilesFromDB } from "../../mappers/files";
import fs from "fs";
import { getTableImageByCompanyId } from "../files/getTableImageByType";
import pool from "../../db";

export const uploadImage = async (file: File, companyId: number) => {
  const client = await pool.connect();

  if (!["image/jpg", "image/jpeg", "image/png"].includes(file.mimetype)) {
    throw { fields: "file" };
  }

  const existImage = await getTableImageByCompanyId(client, companyId);

  if (existImage?.id) {
    await client.query("DELETE FROM files WHERE id = $1", [existImage.id]);
  }

  const fileType = file.originalname.split(".").pop() || "";

  const { rows: filesDB } = await client.query(
    "INSERT INTO files (ext, type, company_id) VALUES ($1, $2, $3) RETURNING *",
    [fileType, EFileTypes.TABLE, companyId]
  );

  const createdFile = mapFilesFromDB(filesDB)[0];

  await fs.promises.writeFile(
    `public/files/${createdFile.id}.${createdFile.ext}`,
    file.buffer
  );

  await client.release();
};
