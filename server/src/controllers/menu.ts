import { Body, Get, OperationId, Post, Route, Security, Tags } from "tsoa";
import { ICreatePositionRequest, IPosition } from "../interfaces/positions";
import categoriesRepository from "../repositories/categories-repository";
import positionsAdditionalRepository from "../repositories/positions-additional-repository";
import positionsCategoriesRepository from "../repositories/positions-categories-repository";
import positionsRepository from "../repositories/positions-repository";
import positionsServices from "../services/positions-services";

export interface ErrorResponse {
  error: string;
}

@Route("menu")
export class MenuController {
  @Tags("MenuService")
  @OperationId("Search")
  @Get("search")
  public async search(): Promise<any> {
    const categories = await categoriesRepository.findAll();
    const positions = await positionsRepository.findAll();
    const positionsAdditionals = await positionsAdditionalRepository.findAll();
    const positionsCategories = await positionsCategoriesRepository.findAll();

    const response = categories.reduce((acc, c) => {
      const result = {
        id: c.id,
        name: c.name,
        description: c.description.replaceAll(" ", "") !== "" ? c.description : undefined,
        positions: [],
      };

      const positionsForCategoryIds = positionsCategories
        .filter((pc) => Number(pc.categoryId) === c.id)
        .map((pc) => Number(pc.positionId));
      const positionsForCategory = positions.filter((po) => positionsForCategoryIds.includes(po.id));

      result.positions = positionsForCategory.reduce((acc, p) => {
        const positionsAdditionalIds = positionsAdditionals
          .filter((pa) => Number(pa.generalPositionId) === p.id)
          .map((pa) => Number(pa.additionalPositionId));

        const additional = positions
          .filter((po) => positionsAdditionalIds.includes(po.id))
          .map((po) => ({
            id: po.id,
            name: po.name,
            price: po.price,
            description: po.description.replaceAll(" ", "") !== "" ? po.description : undefined,
          }));

        acc.push({
          id: p.id,
          name: p.name,
          price: p.price,
          description: p.description.replaceAll(" ", "") !== "" ? p.description : undefined,
          additional,
        });

        return acc;
      }, []);

      acc.push(result);
      return acc;
    }, []);

    return response;
  }
}
