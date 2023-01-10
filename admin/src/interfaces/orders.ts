import { EOrderSteps, EPositionFormSteps } from "../enums/orders";
import { ITable } from "./tables";

export interface IOrder {
  id: string;
  tableId: string;
  statusId: string;
}

export interface IPositionInOrder {
  id: string;
  tableId: string;
  statusId: string;
}

export interface IOrderStatePositionForm {
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
  items: IOrder[];
  form: { [Key in keyof IOrder]: { value: string; error: string } };
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
