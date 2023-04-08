export enum EOrderPositionStatus {
  TO_DO = "to_do",
  COOKING = "cooking",
  READY = "ready",
  FINISHED = "finished",
  ARCHIVED = "archived",
}

export interface IOrderPositionForCreate {
  positionId: number;
  additional?: { id: number; count: number }[];
  comment?: string;
}

export interface IOrderPositionForUpdate extends IOrderPositionForCreate {
  id?: number;
}

export interface IOrderPosition {
  id?: number;
  orderId?: number;
  positionId?: number;
  additional?: string;
  created?: string;
  comment?: string;
  status?: EOrderPositionStatus;
}

export interface IOrderPositionDB {
  id?: number;
  order_id?: number;
  position_id?: number;
  additional?: string;
  created?: string;
  comment?: string;
  status?: EOrderPositionStatus;
}
export const mapOrderPositionsFromDB = (
  rows: IOrderPositionDB[]
): IOrderPosition[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        orderId: row.order_id,
        positionId: row.position_id,
        created: row.created,
        additional: row.additional,
        comment: row.comment,
        status: row.status,
      }))
    : [];

export const mapOrderPositionsToDB = (
  rows: IOrderPosition[]
): IOrderPositionDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        order_idd: row.orderId,
        position_id: row.positionId,
        created: row.created,
        additional: row.additional,
        comment: row.comment,
        status: row.status,
      }))
    : [];
