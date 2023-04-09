import {
  IOrderPosition,
  IOrderPositionForCreate,
  IOrderPositionForUpdate,
} from "./orderPositions";

export type TOrderLog = {
  id?: number;
  orderId?: number;
  status?: EOrderStatus;
  updated?: string;
};

export type TDBOrderLog = {
  id?: number;
  order_id: number;
  status: EOrderStatus;
  updated: string;
};

export interface IOrder {
  id?: number;
  tableId?: number;
  companyId?: number;
  created?: string;
  comment?: string;
  status?: string;
  discountId?: number;
  total?: number;
  paymentMethodId?: number;
  positions?: IOrderPosition[];
}

export interface IOrderDB {
  id?: number;
  table_id?: number;
  company_id?: number;
  created?: string;
  comment?: string;
  status?: string;
  total?: number;
  discount_id?: number;
  payment_method_id?: number;
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
        total: row.total,
        discountId: row.discount_id,
        paymentMethodId: row.payment_method_id,
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
        total: row.total,
        discount_id: row.discountId,
        payment_method_id: row.paymentMethodId,
      }))
    : [];
