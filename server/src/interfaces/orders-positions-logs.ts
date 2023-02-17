import { EOrderPositionLog } from "../enums.ts/orders-positions-logs-enums";

export interface IOrderPositionLog {
  id?: number;
  operationType?: EOrderPositionLog;
  operationDate?: string;
  orderId?: number;
  positionId?: number;
  positionComment?: string;
  positionAdditional?: string;
}
