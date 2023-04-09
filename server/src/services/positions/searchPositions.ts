import pool from "../../db";
import {
  EPositionStatuses,
  IPosition,
  mapPositionsFromDB,
} from "../../mappers/positions";
import { mapPositionsAdditionalFromDB } from "../../mappers/positionsAdditional";
import { mapPositionsCategoriesFromDB } from "../../mappers/positionsCategories";
import { mapPositionsElementsFromDB } from "../../mappers/positionsElements";
import { ICreatePositionRequest } from "../../controllers/positions";

export const searchPositions = async (
  companyId: number
): Promise<ICreatePositionRequest[]> => {
  const client = await pool.connect();

  const { rows: positionsDB } = await client.query(
    "SELECT * FROM positions WHERE company_id = $1 AND status = $2",
    [companyId, EPositionStatuses.ACTIVE]
  );

  const positions = mapPositionsFromDB(positionsDB);

  const positionsIds = positions.map((p) => p.id);

  if (!positionsIds.length) {
    return [];
  }

  const { rows: positionsAdditionalDB } = await client.query(
    `
        SELECT * 
        FROM positions_additional 
        WHERE general_position_id in(${positionsIds.join(",")})
    `
  );

  const positionsAdditional = mapPositionsAdditionalFromDB(
    positionsAdditionalDB
  );

  const { rows: positionsCategoriesDB } = await client.query(
    `
        SELECT * 
        FROM positions_categories 
        WHERE position_id in(${positionsIds.join(",")})
    `
  );

  const positionsCategories = mapPositionsCategoriesFromDB(
    positionsCategoriesDB
  );

  const { rows: positionsElementsDB } = await client.query(
    `
        SELECT * 
        FROM positions_elements 
        WHERE position_id in(${positionsIds.join(",")})
    `
  );

  const positionsElements = mapPositionsElementsFromDB(positionsElementsDB);

  const enrichedPositions = positions.map((p) => ({
    ...p,
    additional: p.isAdditional
      ? []
      : positionsAdditional
          .filter((pa) => pa.generalPositionId === p.id)
          .map((pa) => ({
            positionId: pa.additionalPositionId,
          })),
    categories: positionsCategories
      .filter((pa) => pa.positionId === p.id)
      .map((pa) => ({
        categoryId: pa.categoryId,
      })),
    composition: positionsElements
      .filter((pa) => pa.positionId === p.id)
      .map((pa) => ({
        element: pa.elementId,
        weight: pa.weight,
      })),
  }));

  await client.release();

  return enrichedPositions;
};
