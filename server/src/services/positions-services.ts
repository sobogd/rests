import { ICreatePositionRequest, IPosition } from "../interfaces/positions";
import { IPositionAdditional } from "../interfaces/positions-additional";
import { IPositionCategory } from "../interfaces/positions-categories";
import { IPositionElement } from "../interfaces/positions-elements";
import positionsAdditionalRepository from "../repositories/positions-additional-repository";
import positionsCategoriesRepository from "../repositories/positions-categories-repository";
import positionsElementsRepository from "../repositories/positions-elements-repository";
import positionsRepository from "../repositories/positions-repository";

const search = async (): Promise<ICreatePositionRequest[]> => {
  const positions = await positionsRepository.findAll();
  const result: ICreatePositionRequest[] = [];

  const elements: IPositionElement[] = await positionsElementsRepository.findAll();
  const categories: IPositionCategory[] = await positionsCategoriesRepository.findAll();
  const additionals: IPositionAdditional[] = await positionsAdditionalRepository.findAll();

  if (positions && positions.length) {
    for (const position of positions) {
      const elementsForPosition = elements.filter((e) => Number(e.positionId) === position.id);
      const categoriesForPosition = categories.filter((c) => Number(c.positionId) === position.id);
      const additionalsForPosition = additionals.filter((a) => Number(a.generalPositionId) === position.id);

      result.push({
        ...position,
        categories:
          categoriesForPosition && categoriesForPosition.length
            ? categoriesForPosition.map((c) => ({ categoryId: c.categoryId }))
            : [],
        additional:
          additionalsForPosition && additionalsForPosition.length
            ? additionalsForPosition.map((c) => ({ positionId: c.additionalPositionId }))
            : [],
        composition:
          elementsForPosition && elementsForPosition.length
            ? elementsForPosition.map((c) => ({ element: c.elementId, weight: c.weight }))
            : [],
      });
    }
  }
  return result;
};

const create = async (request: ICreatePositionRequest): Promise<ICreatePositionRequest> => {
  const createdPosition = await positionsRepository.create({
    name: request.name,
    price: request.price,
    description: request.description,
    isAdditional: request.isAdditional,
  });

  const createdCategories = [];

  if (request.categories && request.categories.length) {
    for (const { categoryId } of request.categories) {
      const createdCategory = await positionsCategoriesRepository.create({
        positionId: createdPosition.id,
        categoryId: categoryId,
      });
      createdCategories.push({ categoryId: createdCategory.id });
    }
  }

  const createdComposition = [];

  if (request.composition && request.composition.length) {
    for (const { element, weight } of request.composition) {
      const createdElement = await positionsElementsRepository.create({
        positionId: createdPosition.id,
        elementId: element,
        weight,
      });
      createdComposition.push({ element: createdElement.id, weight });
    }
  }

  const createdAdditional = [];

  if (request.additional && request.additional.length) {
    for (const { positionId } of request.additional) {
      const createdAdditionalPosition = await positionsAdditionalRepository.create({
        generalPositionId: createdPosition.id,
        additionalPositionId: positionId,
      });
      createdAdditional.push({ positionId: createdAdditionalPosition.id });
    }
  }

  return {
    ...createdPosition,
    categories: createdCategories,
    composition: createdComposition,
    additional: createdAdditional,
  };
};

const update = async (request: ICreatePositionRequest): Promise<ICreatePositionRequest> => {
  const updatedPosition = await positionsRepository.updateById(
    {
      name: request.name,
      description: request.description,
      price: request.price,
      isAdditional: request.isAdditional,
    },
    request.id || 0
  );

  const foundedCategories: IPositionCategory[] = await positionsCategoriesRepository.findAllByPositionId(
    request.id || 0
  );
  const updatedCategories = [];

  if (request.categories && request.categories.length) {
    for (const { categoryId } of request.categories) {
      const foundedInExists = foundedCategories.find((c) => c.categoryId === categoryId);

      if (!foundedInExists) {
        const createdCategory = await positionsCategoriesRepository.create({
          positionId: updatedPosition.id,
          categoryId: categoryId,
        });
        updatedCategories.push({ categoryId: createdCategory.id });
      } else {
        const updatedCategory = await positionsCategoriesRepository.updateById(
          {
            positionId: updatedPosition.id,
            categoryId: categoryId,
          },
          foundedInExists.id || 0
        );
        updatedCategories.push({ categoryId: updatedCategory.id });
      }
    }
  }

  if (foundedCategories && foundedCategories.length) {
    for (const { categoryId, id } of foundedCategories) {
      const foundedInUpdating = request.categories.find((c) => c.categoryId === categoryId);
      if (!foundedInUpdating) {
        await positionsCategoriesRepository.removeById(id || 0);
      }
    }
  }

  const foundedElements: IPositionElement[] = await positionsElementsRepository.findAllByPositionId(
    request.id || 0
  );
  const updatedComposition = [];

  if (request.composition && request.composition.length) {
    for (const { element, weight } of request.composition) {
      const foundedInExists = foundedElements.find((e) => e.elementId === element);

      if (!foundedInExists) {
        const createdElement = await positionsElementsRepository.create({
          positionId: updatedPosition.id,
          elementId: element,
          weight,
        });
        updatedComposition.push({ element: createdElement.id, weight });
      } else {
        const updatedElement = await positionsElementsRepository.updateById(
          {
            positionId: updatedPosition.id,
            elementId: element,
            weight,
          },
          foundedInExists.id || 0
        );
        updatedCategories.push({ categoryId: updatedElement.id, weight });
      }
    }
  }

  if (foundedElements && foundedElements.length) {
    for (const { elementId, id } of foundedElements) {
      const foundedInUpdating = request.composition.find((c) => c.element === elementId);
      if (!foundedInUpdating) {
        await positionsElementsRepository.removeById(id || 0);
      }
    }
  }

  const foundedAdditional: IPositionAdditional[] = await positionsAdditionalRepository.findAllByPositionId(
    request.id || 0
  );
  const updatedAdditional = [];

  if (request.additional && request.additional.length) {
    for (const { positionId } of request.additional) {
      const foundedInExists = foundedAdditional.find((c) => c.generalPositionId === positionId);

      if (!foundedInExists) {
        const createdAdditional = await positionsAdditionalRepository.create({
          generalPositionId: updatedPosition.id,
          additionalPositionId: positionId,
        });
        updatedAdditional.push({ positionId: createdAdditional.id });
      } else {
        const updatedAdditionalPosition = await positionsAdditionalRepository.updateById(
          {
            generalPositionId: updatedPosition.id,
            additionalPositionId: positionId,
          },
          foundedInExists.id || 0
        );
        updatedAdditional.push({ positionId: updatedAdditionalPosition.id });
      }
    }
  }

  if (foundedAdditional && foundedAdditional.length) {
    for (const { additionalPositionId, id } of foundedAdditional) {
      const foundedInUpdating = request.additional.find((c) => c.positionId === additionalPositionId);
      if (!foundedInUpdating) {
        await positionsAdditionalRepository.removeById(id || 0);
      }
    }
  }

  return {
    ...updatedPosition,
    categories: updatedCategories,
    composition: updatedComposition,
    additional: updatedAdditional,
  };
};

const remove = async (position: { id: number }): Promise<{}> => {
  const positionsElements = await positionsElementsRepository.findAllByPositionId(position.id);

  if (positionsElements && positionsElements.length) {
    for (const { id } of positionsElements) {
      await positionsElementsRepository.removeById(id || 0);
    }
  }

  const positionsCategories = await positionsCategoriesRepository.findAllByPositionId(position.id);

  if (positionsCategories && positionsCategories.length) {
    for (const { id } of positionsCategories) {
      await positionsCategoriesRepository.removeById(id || 0);
    }
  }

  const positionsAdditional = await positionsAdditionalRepository.findAllByPositionId(position.id);

  if (positionsAdditional && positionsAdditional.length) {
    for (const { id } of positionsAdditional) {
      await positionsAdditionalRepository.removeById(id || 0);
    }
  }

  await positionsRepository.removeById(position.id);

  return {};
};

export default { search, create, update, remove };
