import { Body, OperationId, Post, Request, Route, Security, Tags } from "tsoa";
import {
  searchActiveOrdersByCompanyId,
  createOrder,
  updateOrder,
  getPaymentMethods,
  finishOrder,
  orderPositionStatusChange,
  archiveOrder,
  getDiscounts,
} from "../services/orders";
import { IPaymentMethod } from "../mappers/paymentMethods";
import { IDiscount } from "../mappers/discounts";
import { IAuthRequest } from "../types";
import { IOrder, IOrderForCreate, IOrderForUpdate } from "../mappers/orders";
import { EOrderPositionStatus } from "../mappers/orderPositions";

@Route("orders")
export class OrdersController {
  @Tags("OrdersService")
  @OperationId("Search")
  @Security("Bearer", ["AuthService"])
  @Post("search")
  public async search(@Request() { user }: IAuthRequest): Promise<IOrder[]> {
    return await searchActiveOrdersByCompanyId(user.companyId);
  }
  @Tags("OrdersService")
  @OperationId("Create")
  @Security("Bearer", ["AuthService"])
  @Post("create")
  public async create(
    @Body() request: IOrderForCreate,
    @Request() { user }: IAuthRequest
  ): Promise<{}> {
    await createOrder(user.companyId, request);
    return {};
  }
  @Tags("OrdersService")
  @OperationId("Update")
  @Security("Bearer", ["AuthService"])
  @Post("update")
  public async update(
    @Body() orderForUpdate: IOrderForUpdate,
    @Request() { user }: IAuthRequest
  ): Promise<{}> {
    await updateOrder(orderForUpdate, user.companyId);
    return {};
  }
  @Tags("OrdersService")
  @OperationId("Archive")
  @Security("Bearer", ["AuthService"])
  @Post("archive")
  public async archive(
    @Body() request: { id: number },
    @Request() { user }: IAuthRequest
  ): Promise<{}> {
    await archiveOrder(request.id, user.companyId);
    return {};
  }

  @Tags("OrdersService")
  @OperationId("OrderPositionStart")
  @Security("Bearer", ["AuthService"])
  @Post("order-position-start")
  public async start(
    @Body() request: { orderPositionId: number }
  ): Promise<{}> {
    await orderPositionStatusChange(
      request.orderPositionId,
      EOrderPositionStatus.COOKING
    );
    return {};
  }
  @Tags("OrdersService")
  @OperationId("OrderPositionReady")
  @Security("Bearer", ["AuthService"])
  @Post("order-position-ready")
  public async ready(
    @Body() request: { orderPositionId: number }
  ): Promise<{}> {
    await orderPositionStatusChange(
      request.orderPositionId,
      EOrderPositionStatus.READY
    );
    return {};
  }
  @Tags("OrdersService")
  @OperationId("OrderPositionGiven")
  @Security("Bearer", ["AuthService"])
  @Post("order-position-given")
  public async given(
    @Body() request: { orderPositionId: number },
    @Request() { user }: IAuthRequest
  ): Promise<{}> {
    await orderPositionStatusChange(
      request.orderPositionId,
      EOrderPositionStatus.FINISHED
    );
    return {};
  }
  @Tags("OrdersService")
  @OperationId("OrderPositionRestart")
  @Security("Bearer", ["AuthService"])
  @Post("order-position-restart")
  public async restart(
    @Body() request: { orderPositionId: number }
  ): Promise<{}> {
    await orderPositionStatusChange(
      request.orderPositionId,
      EOrderPositionStatus.TO_DO
    );
    return {};
  }
  @Tags("OrdersService")
  @OperationId("Finish")
  @Security("Bearer", ["AuthService"])
  @Post("finish")
  public async finish(
    @Body() request: { id: number; discount: number; total: number }
  ): Promise<{}> {
    await finishOrder(request.id, request.discount, request.total);
    return {};
  }
  @Tags("OrdersService")
  @OperationId("GetPaymentMethods")
  @Security("Bearer", ["AuthService"])
  @Post("get-payment-methods")
  public async getPaymentMethods(
    @Request() { user }: IAuthRequest
  ): Promise<IPaymentMethod[]> {
    return await getPaymentMethods(user.companyId);
  }
  @Tags("OrdersService")
  @OperationId("GetDiscounts")
  @Security("Bearer", ["AuthService"])
  @Post("get-discounts")
  public async getDiscounts(
    @Request() { user }: IAuthRequest
  ): Promise<IDiscount[]> {
    return await getDiscounts(user.companyId);
  }
}
