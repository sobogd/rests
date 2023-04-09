export enum ECategoryStatus {
  ACTIVE = "active",
  ARCHIVED = "archived",
}

export interface ICategory {
  id?: number;
  name: string;
  description?: string;
  status?: ECategoryStatus;
  companyId?: number;
}

export interface ICategoryDB {
  id?: number;
  name: string;
  description?: string;
  status?: ECategoryStatus;
  company_id?: number;
}

export const mapCategoriesFromDB = (rows: ICategoryDB[]): ICategory[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        status: row.status,
        companyId: row.company_id,
      }))
    : [];

export const mapCategoriesToDB = (rows: ICategory[]): ICategoryDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        status: row.status,
        company_id: row.companyId,
      }))
    : [];
