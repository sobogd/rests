export interface IMenu {
  positionId: number;
  positionName: string;
  price: number;
  symbol: string;
  categoryId: number;
  categoryName: string;
}

export interface IMenuDB {
  position_id: number;
  position_name: string;
  price: number;
  symbol: string;
  category_id: number;
  category_name: string;
}

export interface IMenuResponse {
  id: number;
  name: string;
  positions: {
    id: number;
    name: string;
    price: string;
  }[];
}

export const mapMenuFromDB = (rows: IMenuDB[]): IMenu[] =>
  rows?.length
    ? rows.map((row) => ({
        positionId: row.position_id,
        positionName: row.position_name,
        price: row.price,
        categoryId: row.category_id,
        categoryName: row.category_name,
        symbol: row.symbol,
      }))
    : [];

export const mapMenuToDB = (rows: IMenu[]): IMenuDB[] =>
  rows?.length
    ? rows.map((row) => ({
        position_id: row.positionId,
        position_name: row.positionName,
        price: row.price,
        category_id: row.categoryId,
        category_name: row.categoryName,
        symbol: row.symbol,
      }))
    : [];
