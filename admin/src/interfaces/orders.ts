import { EOrderSteps, EPositionFormSteps } from "../enums/orders";
import { ITable } from "./tables";

export interface IOrder {
  createTime: string;
  finishTime: string;
  readyTime: string;
  id: string;
  tableId: string;
  statusId: string;
  ordersPositions?: IOrderPosition[];
  comment?: string;
}

export interface IOrderPosition {
  additional?: string;
  comment?: string;
  finishTime?: string;
  id?: number;
  orderId?: string;
  positionId?: string;
  startTime?: string;
}

export interface IPositionInOrder {
  id: string;
  tableId: string;
  statusId: string;
}

export interface IOrderStatePositionForm {
  id?: number;
  editIndex?: number;
  isOpened?: boolean;
  categoryId?: string;
  positionId?: string;
  additional?: {
    id: string;
    count: number;
  }[];
  comment?: string;
  step?: EPositionFormSteps;
}

export interface IOrderState {
  orderId?: number;
  items: IOrder[];
  isLoading: boolean;
  isOpenForm: boolean;
  isOpenYouSure: boolean;
  activeStep: EOrderSteps;
  positionsForm: IOrderStatePositionForm;
  selectedTable?: ITable;
  selectedPositions: IOrderStatePositionForm[];
  comment: string;
  error: string;
}
