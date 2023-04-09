import pool from "../../db";
import { EPositionStatuses, mapPositionsFromDB } from "../../mappers/positions";
import { ICreatePositionRequest } from "../../controllers/positions";

export const createPosition = async (
  request: ICreatePositionRequest,
  companyId: number
) => {
  const client = await pool.connect();

  const { rows: createdPositionsDB } = await client.query(
    `
    INSERT INTO positions (name, description, price, is_additional, sort, company_id, status) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) 
    RETURNING *
  `,
    [
      request.name,
      request.description || null,
      request.price || 0,
      request.isAdditional || false,
      request.sort || 500,
      companyId,
      EPositionStatuses.ACTIVE,
    ]
  );

  const createdPosition = mapPositionsFromDB(createdPositionsDB)[0];

  if (request.categories?.length) {
    for (const { categoryId } of request.categories) {
      await client.query(
        `
            INSERT INTO positions_categories (position_id, category_id) 
            VALUES ($1, $2)
          `,
        [createdPosition.id, categoryId]
      );
    }
  }

  if (request.composition?.length) {
    for (const { element, weight } of request.composition) {
      await client.query(
        `
            INSERT INTO positions_elements (position_id, element_id, weight) 
            VALUES ($1, $2, $3)
          `,
        [createdPosition.id, element, weight]
      );
    }
  }

  if (request.additional?.length) {
    for (const { positionId } of request.additional) {
      await client.query(
        `
            INSERT INTO positions_elements (general_position_id, additional_position_id) 
            VALUES ($1, $2)
          `,
        [createdPosition.id, positionId]
      );
    }
  }

  await client.release();
};
