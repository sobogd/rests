import { EOrderSteps } from "../enums/orders";
import { ITable } from "./tables";

export interface IOrder {
  id: string;
  tableId: string;
  statusId: string;
}

export interface IOrderState {
  items: IOrder[];
  form: { [Key in keyof IOrder]: { value: string; error: string } };
  isLoading: boolean;
  isOpenForm: boolean;
  isOpenYouSure: boolean;
  activeStep: EOrderSteps;
  selectedTable?: ITable;
  error: string;
}
