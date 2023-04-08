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

export enum EOrderStatus {
  ACTIVE = "active",
  FINISHED = "finished",
  PAID = "paid",
  ARCHIVED = "archived",
}

export enum EOrderPositionStatus {
  TO_DO = "to_do",
  COOKING = "cooking",
  READY = "ready",
  FINISHED = "finished",
  ARCHIVED = "archived",
}

export type IAuthRequest = {
  user: {
    id: number;
    companyId: number;
  };
};
