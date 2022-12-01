import { Body, OperationId, Post, Route, Security, Tags } from "tsoa";
import { IElement } from "../interfaces/elements";
import elementsServices from "../services/elements-services";

@Route("elements")
export class ElementsController {
  @Tags("ElementsService")
  @OperationId("Search")
  @Security("Bearer", ["AuthService"])
  @Post("search")
  public async search(): Promise<IElement[]> {
    return await elementsServices.search();
  }
  @Tags("ElementsService")
  @OperationId("Create")
  @Security("Bearer", ["AuthService"])
  @Post("create")
  public async create(@Body() request: IElement): Promise<IElement> {
    return await elementsServices.create(request);
  }
  @Tags("ElementsService")
  @OperationId("Update")
  @Security("Bearer", ["AuthService"])
  @Post("update")
  public async update(@Body() request: IElement): Promise<IElement> {
    return await elementsServices.update(request);
  }
  @Tags("ElementsService")
  @OperationId("Remove")
  @Security("Bearer", ["AuthService"])
  @Post("remove")
  public async remove(@Body() request: IElement): Promise<{}> {
    return await elementsServices.remove(request);
  }
}
