import pool from "../../db";
import { mapPositionsFromDB } from "../../mappers/positions";
import { IUpdatePositionRequest } from "../../controllers/positions";
import { mapPositionsCategoriesFromDB } from "../../mappers/positionsCategories";
import { mapPositionsElementsFromDB } from "../../mappers/positionsElements";
import { mapPositionsAdditionalFromDB } from "../../mappers/positionsAdditional";

export const updatePosition = async (
  request: IUpdatePositionRequest,
  companyId: number
) => {
  const client = await pool.connect();

  const { rows: updatedPositionsDB } = await client.query(
    `
    UPDATE positions SET name = $1, description = $2, price = $3, is_additional = $4, sort = $5 
    WHERE id = $6
    RETURNING *
  `,
    [
      request.name,
      request.description || null,
      request.price || 0,
      request.isAdditional || false,
      request.sort || 500,
      request.id,
    ]
  );
  const updatedPosition = mapPositionsFromDB(updatedPositionsDB)[0];

  const { rows: oldCategoriesDB } = await client.query(
    "SELECT * from positions_categories WHERE position_id = $1",
    [updatedPosition.id]
  );
  const oldCategories = mapPositionsCategoriesFromDB(oldCategoriesDB);

  const { rows: oldElementsDB } = await client.query(
    "SELECT * from positions_elements WHERE position_id = $1",
    [updatedPosition.id]
  );
  const oldElements = mapPositionsElementsFromDB(oldElementsDB);

  const { rows: oldAdditionalDB } = await client.query(
    "SELECT * from positions_additional WHERE general_position_id = $1",
    [updatedPosition.id]
  );
  const oldAdditional = mapPositionsAdditionalFromDB(oldAdditionalDB);

  if (oldCategories && oldCategories.length) {
    for (const { categoryId, id } of oldCategories) {
      const foundedInUpdating = request.categories.find(
        (c) => c.categoryId === categoryId
      );
      if (!foundedInUpdating) {
        await client.query("DELETE FROM positions_categories WHERE id = $1", [
          id,
        ]);
      }
    }
  }

  if (oldElements && oldElements.length) {
    for (const { elementId, id } of oldElements) {
      const foundedInUpdating = request.composition?.find(
        (c) => c.element === elementId
      );
      if (!foundedInUpdating) {
        await client.query("DELETE FROM positions_elements WHERE id = $1", [
          id,
        ]);
      }
    }
  }

  if (oldAdditional && oldAdditional.length) {
    for (const { additionalPositionId, id } of oldAdditional) {
      const foundedInUpdating = request.additional.find(
        (c) => c.positionId === additionalPositionId
      );
      if (!foundedInUpdating) {
        await client.query("DELETE FROM positions_additional WHERE id = $1", [
          id,
        ]);
      }
    }
  }

  if (request.categories && request.categories.length) {
    for (const { categoryId } of request.categories) {
      const foundedInExists = oldCategories.find(
        (c) => c.categoryId === categoryId
      );

      if (!foundedInExists) {
        await client.query(
          `
            INSERT INTO positions_categories (position_id, category_id) 
            VALUES ($1, $2)
          `,
          [updatedPosition.id, categoryId]
        );
      }
    }
  }

  if (request.composition && request.composition.length) {
    for (const { element, weight } of request.composition) {
      const foundedInExists = oldElements.find((e) => e.elementId === element);

      if (!foundedInExists) {
        await client.query(
          `
              INSERT INTO positions_elements (position_id, element_id, weight)
              VALUES ($1, $2, $3)
            `,
          [updatedPosition.id, element, weight]
        );
      }
    }
  }

  if (request.additional && request.additional.length) {
    for (const { positionId } of request.additional) {
      const foundedInExists = oldAdditional.find(
        (e) => e.additionalPositionId === positionId
      );

      if (!foundedInExists) {
        await client.query(
          `
            INSERT INTO positions_additional (general_position_id, additional_position_id) 
            VALUES ($1, $2)
          `,
          [updatedPosition.id, positionId]
        );
      }
    }
  }

  await client.release();
};
