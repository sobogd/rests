export interface ITableImageResponse {
  filePath?: string;
}

export interface ITable {
  id?: number;
  number: string;
  name: string;
  positionX: string;
  positionY: string;
  companyId?: number;
  status?: ETableStatuses;
}

export interface ITableDB {
  id?: number;
  number: string;
  name: string;
  position_x: string;
  position_y: string;
  company_id?: number;
  status?: ETableStatuses;
}

export enum ETableStatuses {
  ACTIVE = "active",
  ARCHIVED = "archived",
}

export const mapTablesFromDB = (rows: ITableDB[]): ITable[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        name: row.name,
        number: row.number,
        positionY: row.position_y,
        positionX: row.position_x,
        companyId: row.company_id,
        status: row.status,
      }))
    : [];

export const mapTablesToDB = (rows: ITable[]): ITableDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        name: row.name,
        number: row.number,
        position_y: row.positionY,
        position_x: row.positionX,
        company_id: row.companyId,
        status: row.status,
      }))
    : [];
