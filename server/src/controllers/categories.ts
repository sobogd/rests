import { Body, OperationId, Post, Route, Security, Tags } from "tsoa";
import { ICategory } from "../interfaces/categories";
import categoriesServices from "../services/categories-services";

@Route("categories")
export class CategoriesController {
  @Tags("CategoriesService")
  @OperationId("Search")
  @Security("Bearer", ["AuthService"])
  @Post("search")
  public async search(): Promise<ICategory[]> {
    return await categoriesServices.search();
  }
  @Tags("CategoriesService")
  @OperationId("Create")
  @Security("Bearer", ["AuthService"])
  @Post("create")
  public async create(@Body() request: ICategory): Promise<ICategory> {
    return await categoriesServices.create(request);
  }
  @Tags("CategoriesService")
  @OperationId("Update")
  @Security("Bearer", ["AuthService"])
  @Post("update")
  public async update(@Body() request: ICategory): Promise<ICategory> {
    return await categoriesServices.update(request);
  }
  @Tags("CategoriesService")
  @OperationId("Remove")
  @Security("Bearer", ["AuthService"])
  @Post("remove")
  public async remove(@Body() request: ICategory): Promise<{}> {
    return await categoriesServices.remove(request);
  }
}
