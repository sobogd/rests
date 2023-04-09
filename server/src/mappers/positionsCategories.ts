export interface IPositionCategories {
  id: number;
  positionId: number;
  categoryId: number;
}

export interface IPositionCategoriesDB {
  id: number;
  position_id: number;
  category_id: number;
}

export const mapPositionsCategoriesFromDB = (
  rows: IPositionCategoriesDB[]
): IPositionCategories[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        positionId: Number(row.position_id),
        categoryId: Number(row.category_id),
      }))
    : [];

export const mapPositionsCategoriesToDB = (
  rows: IPositionCategories[]
): IPositionCategoriesDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        position_id: row.positionId,
        category_id: row.categoryId,
      }))
    : [];
