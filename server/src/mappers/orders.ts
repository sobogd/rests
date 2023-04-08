import {
  IOrderPosition,
  IOrderPositionForCreate,
  IOrderPositionForUpdate,
} from "./orderPositions";

export interface IOrder {
  id?: number;
  tableId?: number;
  companyId?: number;
  created?: string;
  comment?: string;
  status?: string;
  discount?: string;
  positions?: IOrderPosition[];
}

export interface IOrderDB {
  id?: number;
  table_id?: number;
  company_id?: number;
  created?: string;
  comment?: string;
  status?: string;
  discount?: string;
}

export interface IOrderForCreate {
  tableId: number;
  comment?: string;
  positions: IOrderPositionForCreate[];
}

export interface IOrderForUpdate extends IOrderForCreate {
  id: number;
  positions: IOrderPositionForUpdate[];
}

export enum EOrderStatus {
  ACTIVE = "active",
  FINISHED = "finished",
  PAID = "paid",
  ARCHIVED = "archived",
}

export const mapOrdersFromDB = (rows: IOrderDB[]): IOrder[] =>
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

export const mapOrdersToDB = (rows: IOrder[]): IOrderDB[] =>
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
