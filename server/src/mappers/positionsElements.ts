export interface IPositionElement {
  id: number;
  positionId: number;
  elementId: number;
  weight: number;
}

export interface IPositionElementDB {
  id: number;
  position_id: number;
  element_id: number;
  weight: number;
}

export const mapPositionsElementsFromDB = (
  rows: IPositionElementDB[]
): IPositionElement[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        positionId: Number(row.position_id),
        elementId: Number(row.element_id),
        weight: Number(row.weight),
      }))
    : [];

export const mapPositionsElementsToDB = (
  rows: IPositionElement[]
): IPositionElementDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        position_id: row.positionId,
        element_id: row.elementId,
        weight: row.weight,
      }))
    : [];
