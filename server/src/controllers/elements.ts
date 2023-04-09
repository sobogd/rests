import { Body, OperationId, Post, Request, Route, Security, Tags } from "tsoa";
import { archiveElement } from "../services/elements/archiveElement";
import { IElement } from "../mappers/elements";
import { updateElement } from "../services/elements/updateElement";
import { createElement } from "../services/elements/createElement";
import { IAuthRequest } from "../types";
import { searchElements } from "../services/elements/searchElements";

@Route("elements")
export class ElementsController {
  @Tags("ElementsService")
  @OperationId("Search")
  @Security("Bearer", ["AuthService"])
  @Post("search")
  public async search(@Request() { user }: IAuthRequest): Promise<IElement[]> {
    return await searchElements(user.companyId);
  }
  @Tags("ElementsService")
  @OperationId("Create")
  @Security("Bearer", ["AuthService"])
  @Post("create")
  public async create(
    @Body() request: IElement,
    @Request() { user }: IAuthRequest
  ): Promise<{}> {
    await createElement(request, user.companyId);
    return {};
  }
  @Tags("ElementsService")
  @OperationId("Update")
  @Security("Bearer", ["AuthService"])
  @Post("update")
  public async update(@Body() request: IElement): Promise<{}> {
    await updateElement(request);
    return {};
  }
  @Tags("ElementsService")
  @OperationId("Archive")
  @Security("Bearer", ["AuthService"])
  @Post("archive")
  public async archive(@Body() request: { id: number }): Promise<{}> {
    await archiveElement(request.id);
    return {};
  }
}
