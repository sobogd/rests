export interface IIfle {
  id?: number;
  ext: string;
  type: EFileTypes;
  companyId?: number;
}

export interface IIfleDB {
  id?: number;
  ext: string;
  type: EFileTypes;
  company_id?: number;
}

export enum EFileTypes {
  POSITION = "position",
  TABLE = "table",
}

export const mapFilesFromDB = (rows: IIfleDB[]): IIfle[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        ext: row.ext,
        type: row.type,
        companyId: row.company_id,
      }))
    : [];

export const mapFilesToDB = (rows: IIfle[]): IIfleDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        ext: row.ext,
        type: row.type,
        company_id: row.companyId,
      }))
    : [];
