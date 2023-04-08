export interface IDiscount {
  id?: number;
  percent: number;
  title: string;
  description: string;
  companyId: number;
}

export interface IDiscountDB {
  id?: number;
  percent: number;
  title: string;
  description: string;
  company_id: number;
}

export const mapDiscountsFromDB = (rows: IDiscountDB[]): IDiscount[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        percent: row.percent,
        title: row.title,
        description: row.description,
        companyId: row.company_id,
      }))
    : [];

export const mapDiscountsToDB = (rows: IDiscount[]): IDiscountDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        percent: row.percent,
        title: row.title,
        description: row.description,
        company_id: row.companyId,
      }))
    : [];
