import { Body, OperationId, Post, Route, Security, Tags } from "tsoa";
import { ICreatePositionRequest, IPosition } from "../interfaces/positions";
import positionsServices from "../services/positions-services";

export interface ErrorResponse {
  error: string;
}

@Route("positions")
export class PositionsController {
  @Tags("PositionsService")
  @OperationId("Search")
  @Security("Bearer", ["AuthService"])
  @Post("search")
  public async search(): Promise<ICreatePositionRequest[]> {
    return await positionsServices.search();
  }
  @Tags("PositionsService")
  @OperationId("Create")
  @Security("Bearer", ["AuthService"])
  @Post("create")
  public async create(@Body() request: ICreatePositionRequest): Promise<ICreatePositionRequest> {
    return await positionsServices.create(request);
  }
  @Tags("PositionsService")
  @OperationId("Update")
  @Security("Bearer", ["AuthService"])
  @Post("update")
  public async update(@Body() request: ICreatePositionRequest): Promise<ICreatePositionRequest> {
    return await positionsServices.update(request);
  }
  @Tags("PositionsService")
  @OperationId("Remove")
  @Security("Bearer", ["AuthService"])
  @Post("remove")
  public async remove(@Body() request: { id: number }): Promise<{}> {
    return await positionsServices.remove(request);
  }
}
