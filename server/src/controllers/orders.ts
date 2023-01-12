import { Body, OperationId, Post, Route, Security, Tags } from "tsoa";
import { IOrder, IOrderCreateRequest } from "../interfaces/orders";
import ordersServices from "../services/orders-services";

@Route("orders")
export class OrdersController {
  @Tags("OrdersService")
  @OperationId("Search")
  @Security("Bearer", ["AuthService"])
  @Post("search")
  public async search(): Promise<IOrder[]> {
    return await ordersServices.search();
  }
  @Tags("OrdersService")
  @OperationId("Create")
  @Security("Bearer", ["AuthService"])
  @Post("create")
  public async create(@Body() request: IOrderCreateRequest): Promise<{}> {
    await ordersServices.create(request);
    return {};
  }
  @Tags("OrdersService")
  @OperationId("Update")
  @Security("Bearer", ["AuthService"])
  @Post("update")
  public async update(@Body() request: IOrderCreateRequest): Promise<{}> {
    await ordersServices.update(request);
    return {};
  }
  @Tags("OrdersService")
  @OperationId("Remove")
  @Security("Bearer", ["AuthService"])
  @Post("remove")
  public async remove(@Body() request: { id: number }): Promise<{}> {
    return await ordersServices.remove(request);
  }
  @Tags("OrdersService")
  @OperationId("OrerPositionFinish")
  @Security("Bearer", ["AuthService"])
  @Post("order-position-finish")
  public async orderPositionFinish(@Body() request: { orderPositionId: number }): Promise<{}> {
    return await ordersServices.orderPositionFinish(request.orderPositionId);
  }
}
