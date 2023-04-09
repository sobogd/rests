export interface IPosition {
  id?: number;
  name: string;
  price: number;
  description?: string;
  isAdditional: boolean;
  sort: number;
}

export interface IPositionDB {
  id?: number;
  name: string;
  price: number;
  description?: string;
  is_additional: boolean;
  sort: number;
}

export const mapPositionsFromDB = (rows: IPositionDB[]): IPosition[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        price: row.price,
        isAdditional: row.is_additional,
        sort: row.sort,
      }))
    : [];

export const mapPositionsToDB = (rows: IPosition[]): IPositionDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        price: row.price,
        is_additional: row.isAdditional,
        sort: row.sort,
      }))
    : [];
