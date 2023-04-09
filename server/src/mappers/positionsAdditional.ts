export interface IPositionAdditional {
  id: number;
  generalPositionId: number;
  additionalPositionId: number;
}

export interface IPositionAdditionalDB {
  id: number;
  general_position_id: number;
  additional_position_id: number;
}

export const mapPositionsAdditionalFromDB = (
  rows: IPositionAdditionalDB[]
): IPositionAdditional[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        generalPositionId: Number(row.general_position_id),
        additionalPositionId: Number(row.additional_position_id),
      }))
    : [];

export const mapPositionsAdditionalToDB = (
  rows: IPositionAdditional[]
): IPositionAdditionalDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        general_position_id: row.generalPositionId,
        additional_position_id: row.additionalPositionId,
      }))
    : [];
