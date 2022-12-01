import { File } from "tsoa";
import fs from "fs";
import filesRepository from "../repositories/files-repository";
import { EFileTypes } from "../interfaces/files";
import { ITable, ITableImageResponse } from "../interfaces/tables";
import tablesRepository from "../repositories/tables-repository";

const getTableImageByType = async () => {
  const image = await filesRepository.findByType(EFileTypes.TABLE);

  if (!image || !image.id) {
    return null;
  }

  return image;
};

const uploadImage = async (file: File): Promise<{}> => {
  if (!["image/jpg", "image/jpeg", "image/png"].includes(file.mimetype)) {
    throw { fields: "file" };
  }

  const existImage = await getTableImageByType();

  if (existImage) {
    await filesRepository.removeById(existImage.id);
  }

  const fileType = file.originalname.split(".").pop() || "";

  const createdFile = await filesRepository.create({ ext: fileType, type: EFileTypes.TABLE });

  await fs.promises.writeFile(`public/files/${createdFile.id}.${createdFile.ext}`, file.buffer);

  return {};
};

const findImage = async (): Promise<ITableImageResponse> => {
  const image = await getTableImageByType();

  if (!image) {
    return {};
  }

  return { filePath: `/files/${image.id}.${image.ext}` };
};

const search = async (): Promise<ITable[]> => {
  const elements = await tablesRepository.findAll();
  return elements;
};

const create = async (table: ITable): Promise<ITable> => {
  const createdTable = await tablesRepository.create(table);
  return createdTable;
};

const update = async (table: ITable): Promise<ITable> => {
  const updatedTable = await tablesRepository.updateById(table, table.id || 0);
  return updatedTable;
};

const remove = async (table: ITable): Promise<{}> => {
  table.id && (await tablesRepository.removeById(table.id));
  return {};
};

export default { uploadImage, findImage, search, create, update, remove };
