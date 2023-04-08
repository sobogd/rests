import { EOrderStatus } from "../mappers/orders";

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
