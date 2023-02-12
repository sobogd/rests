import { Body, OperationId, Post, Route, Security, Tags } from "tsoa";
import { IDayReportResponse, IOrder, IOrderCreateRequest } from "../interfaces/orders";
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
  @OperationId("OrerPositionStart")
  @Security("Bearer", ["AuthService"])
  @Post("order-position-start")
  public async orderPositionStart(@Body() request: { orderPositionId: number }): Promise<void> {
    return await ordersServices.orderPositionStart(request.orderPositionId);
  }
  @Tags("OrdersService")
  @OperationId("OrerPositionReady")
  @Security("Bearer", ["AuthService"])
  @Post("order-position-ready")
  public async orderPositionReady(@Body() request: { orderPositionId: number }): Promise<void> {
    return await ordersServices.orderPositionReady(request.orderPositionId);
  }
  @Tags("OrdersService")
  @OperationId("OrerPositionGiven")
  @Security("Bearer", ["AuthService"])
  @Post("order-position-given")
  public async orderPositionGiven(@Body() request: { orderPositionId: number }): Promise<{}> {
    return await ordersServices.orderPositionGiven(request.orderPositionId);
  }
  @Tags("OrdersService")
  @OperationId("OrerPositionRestart")
  @Security("Bearer", ["AuthService"])
  @Post("order-position-restart")
  public async orderPositionRestart(@Body() request: { orderPositionId: number }): Promise<void> {
    return await ordersServices.orderPositionRestart(request.orderPositionId);
  }

  @Tags("OrdersService")
  @OperationId("Finish")
  @Security("Bearer", ["AuthService"])
  @Post("finish")
  public async finish(@Body() request: { id: string; discount: number }): Promise<{}> {
    return await ordersServices.finish(request.id, request.discount);
  }
  @Tags("OrdersService")
  @OperationId("GetDayReport")
  @Security("Bearer", ["AuthService"])
  @Post("get-day-report")
  public async getDayReport(@Body() request: { date: Date }): Promise<IDayReportResponse> {
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
  public async getDayPositionsStatic(@Body() request: { stringDate: string }): Promise<any> {
    return await ordersServices.getDayPositionsStatic(request.stringDate);
  }
  @Tags("OrdersService")
  @OperationId("GetPeriodPositionsStatic")
  // @Security("Bearer", ["AuthService"])
  @Post("get-period-positions-report")
  public async getPeriodPositionsStatic(
    @Body() request: { stringStartDate: string; stringEndDate: string }
  ): Promise<any> {
    return await ordersServices.getPeriodPositionsStatic(request.stringStartDate, request.stringEndDate);
  }
}
