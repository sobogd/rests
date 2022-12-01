export interface IIfle {
  id?: number;
  ext: string;
  type: EFileTypes;
}

export enum EFileTypes {
  POSITION = "position",
  TABLE = "table",
}
