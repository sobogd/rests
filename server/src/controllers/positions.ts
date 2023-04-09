import { Body, OperationId, Post, Request, Route, Security, Tags } from "tsoa";
import { searchPositions } from "../services/positions/searchPositions";
import { IAuthRequest } from "../mappers/common";
import { IPosition } from "../mappers/positions";
import { createPosition } from "../services/positions/createPosition";
import { updatePosition } from "../services/positions/updatePosition";
import { archivePosition } from "../services/positions/archivePosition";

export interface ICreatePositionRequest extends IPosition {
  categories: { categoryId: number }[];
  composition?: { element: number; weight: number }[];
  additional: { positionId: number }[];
}

export interface IUpdatePositionRequest extends ICreatePositionRequest {
  id: number;
}

@Route("positions")
export class PositionsController {
  @Tags("PositionsService")
  @OperationId("Search")
  @Security("Bearer", ["AuthService"])
  @Post("search")
  public async search(
    @Request() { user }: IAuthRequest
  ): Promise<ICreatePositionRequest[]> {
    return await searchPositions(user.companyId);
  }
  @Tags("PositionsService")
  @OperationId("Create")
  @Security("Bearer", ["AuthService"])
  @Post("create")
  public async create(
    @Body() request: ICreatePositionRequest,
    @Request() { user }: IAuthRequest
  ): Promise<{}> {
    await createPosition(request, user.companyId);
    return {};
  }
  @Tags("PositionsService")
  @OperationId("Update")
  @Security("Bearer", ["AuthService"])
  @Post("update")
  public async update(
    @Body() request: IUpdatePositionRequest,
    @Request() { user }: IAuthRequest
  ): Promise<{}> {
    await updatePosition(request, user.companyId);
    return {};
  }
  @Tags("PositionsService")
  @OperationId("Archive")
  @Security("Bearer", ["AuthService"])
  @Post("archive")
  public async archive(@Body() request: { id: number }): Promise<{}> {
    await archivePosition(request.id);
    return {};
  }
}
