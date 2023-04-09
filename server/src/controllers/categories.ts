import { Body, OperationId, Post, Request, Route, Security, Tags } from "tsoa";
import { ICategory } from "../mappers/categories";
import { IAuthRequest } from "../types";
import { searchCategories } from "../services/categories/searchCategories";
import { archiveCategory } from "../services/categories/archiveCategory";
import { updateCategory } from "../services/categories/updateCategory";
import { createCategory } from "../services/categories/createCategory";

@Route("categories")
export class CategoriesController {
  @Tags("CategoriesService")
  @OperationId("Search")
  @Security("Bearer", ["AuthService"])
  @Post("search")
  public async search(@Request() { user }: IAuthRequest): Promise<ICategory[]> {
    return await searchCategories(user.companyId);
  }
  @Tags("CategoriesService")
  @OperationId("Create")
  @Security("Bearer", ["AuthService"])
  @Post("create")
  public async create(
    @Body() request: ICategory,
    @Request() { user }: IAuthRequest
  ): Promise<{}> {
    await createCategory(request, user.companyId);
    return {};
  }
  @Tags("CategoriesService")
  @OperationId("Update")
  @Security("Bearer", ["AuthService"])
  @Post("update")
  public async update(@Body() request: ICategory): Promise<{}> {
    await updateCategory(request);
    return {};
  }
  @Tags("CategoriesService")
  @OperationId("Archive")
  @Security("Bearer", ["AuthService"])
  @Post("archive")
  public async archive(@Body() request: { id: number }): Promise<{}> {
    await archiveCategory(request.id);
    return {};
  }
}
