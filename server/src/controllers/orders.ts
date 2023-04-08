import { Body, OperationId, Post, Request, Route, Security, Tags } from "tsoa";
import {
  IDayReportResponse,
  IOrder,
  IOrderForCreate,
  IOrderForUpdate,
} from "../interfaces/orders";
import ordersServices from "../services/orders-services";
import { EOrderPositionStatus, IAuthRequest } from "../enums.ts/ordersLogs";
import { searchActiveOrdersByCompanyId } from "../services/orders/searchActiveOrdersByCompanyId";
import { createOrder } from "../services/orders/createOrder";
import { updateOrder } from "../services/orders/updateOrder";
import { archiveOrder } from "../services/orders/archiveOrder";
import { orderPositionStatusChange } from "../services/orders/orderPositionStatusChange";
import { finishOrder } from "../services/orders/finishOrder";

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
    @Body() request: { id: number; discount: number }
  ): Promise<{}> {
    await finishOrder(request.id, request.discount);
    return {};
  }

  @Tags("OrdersService")
  @OperationId("GetDayReport")
  @Security("Bearer", ["AuthService"])
  @Post("get-day-report")
  public async getDayReport(
    @Body() request: { date: Date },
    @Request() { user }: IAuthRequest
  ): Promise<IDayReportResponse> {
    return await ordersServices.getDayReport(request.date);
  }
  @Tags("OrdersService")
  @OperationId("DayReport")
  // @Security("Bearer", ["AuthService"])
  @Post("day-report")
  public async dayReport(@Body() request: { stringDate: string }): Promise<{}> {
    return await ordersServices.dayReport(request.stringDate);
  }
  @Tags("OrdersService")
  @OperationId("GetDayPositionsStatic")
  // @Security("Bearer", ["AuthService"])
  @Post("get-day-positions-report")
  public async getDayPositionsStatic(
    @Body() request: { stringDate: string }
  ): Promise<any> {
    return await ordersServices.getDayPositionsStatic(request.stringDate);
  }
  @Tags("OrdersService")
  @OperationId("GetPeriodPositionsStatic")
  // @Security("Bearer", ["AuthService"])
  @Post("get-period-positions-report")
  public async getPeriodPositionsStatic(
    @Body() request: { stringStartDate: string; stringEndDate: string }
  ): Promise<any> {
    return await ordersServices.getPeriodPositionsStatic(
      request.stringStartDate,
      request.stringEndDate
    );
  }
}
