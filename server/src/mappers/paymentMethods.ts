export interface IPaymentMethod {
  id?: number;
  title: string;
  description: string;
  companyId: number;
}

export interface IPaymentMethodDB {
  id?: number;
  title: string;
  description: string;
  company_id: number;
}

export const mapPaymentMethodsFromDB = (
  rows: IPaymentMethodDB[]
): IPaymentMethod[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        companyId: row.company_id,
      }))
    : [];

export const mapPaymentMethodsToDB = (
  rows: IPaymentMethod[]
): IPaymentMethodDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        company_id: row.companyId,
      }))
    : [];
