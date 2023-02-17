import { EOrderPositionLog } from "../enums.ts/orders-positions-logs-enums";

export interface IOrderPositionLog {
  id?: number;
  operationType?: EOrderPositionLog;
  operationDate?: string;
  positionId?: number;
  positionComment?: string;
  positionAdditional?: string;
}
