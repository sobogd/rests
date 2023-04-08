import { IOrderPosition } from "./orders-positions";

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

export type TOrderForCreate = {
  tableId: number;
  comment: string;
};

export type TBDOOrder = {
  id?: number;
  table_id?: number;
  company_id?: number;
  created?: string;
  comment?: string;
  status?: string;
  discount?: string;
};

export interface IOrderPositionForCreate {
  positionId: number;
  additional?: { id: number; count: number }[];
  comment?: string;
}

export interface IOrderPositionForUpdate extends IOrderPositionForCreate {
  id?: number;
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

export interface IDayReportResponse {
  id: number;
  time: string;
  date: string;
  discount: number;
  total: number;
  positions: string[];
}
