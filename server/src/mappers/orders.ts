import { IOrder, TBDOOrder } from "../interfaces/orders";

export const mapOrdersFromDB = (rows: TBDOOrder[]): IOrder[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        tableId: row.table_id,
        companyId: row.company_id,
        created: row.created,
        comment: row.comment,
        status: row.status,
        discount: row.discount,
      }))
    : [];

export const mapOrdersToDB = (rows: IOrder[]): TBDOOrder[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        table_id: row.tableId,
        company_id: row.companyId,
        created: row.created,
        comment: row.comment,
        status: row.status,
        discount: row.discount,
      }))
    : [];
