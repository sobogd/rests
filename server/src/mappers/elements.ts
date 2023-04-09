export enum EElementStatus {
  ACTIVE = "active",
  ARCHIVED = "archived",
}

export interface IElement {
  id?: number;
  element: string;
  price: number;
  priceForCount: number;
  companyId?: number;
  status?: EElementStatus;
}

export interface IElementDB {
  id?: number;
  element: string;
  price: number;
  price_for_count: number;
  company_id?: number;
  status?: EElementStatus;
}

export const mapElementsFromDB = (rows: IElementDB[]): IElement[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        element: row.element,
        price: Number(row.price),
        priceForCount: Number(row.price_for_count),
        companyId: row.company_id,
        status: row.status,
      }))
    : [];

export const mapElementsToDB = (rows: IElement[]): IElementDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        element: row.element,
        price: row.price,
        price_for_count: row.priceForCount,
        company_id: row.companyId,
        status: row.status,
      }))
    : [];
