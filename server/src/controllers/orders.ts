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
  public async create(@Body() request: IOrderCreateRequest): Promise<void> {
    await ordersServices.create(request);
  }
  @Tags("OrdersService")
  @OperationId("Update")
  @Security("Bearer", ["AuthService"])
  @Post("update")
  public async update(@Body() request: IOrder): Promise<IOrder> {
    return await ordersServices.update(request);
  }
  @Tags("OrdersService")
  @OperationId("Remove")
  @Security("Bearer", ["AuthService"])
  @Post("remove")
  public async remove(@Body() request: { id: number }): Promise<{}> {
    return await ordersServices.remove(request);
  }
}
