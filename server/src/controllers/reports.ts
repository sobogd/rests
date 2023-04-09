import { Body, OperationId, Post, Request, Route, Security, Tags } from "tsoa";
import { IAuthRequest } from "../types";
import { getReport } from "../services/reports/getReport";

export enum EReportType {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}

@Route("reports")
export class ReportsController {
  @Tags("ReportsService")
  @OperationId("GetReport")
  @Security("Bearer", ["AuthService"])
  @Post("get_report")
  public async getReport(
    @Body()
    request: {
      startDate: Date;
      endDate: Date;
      type: EReportType;
    },
    @Request() { user }: IAuthRequest
  ): Promise<
    {
      summary: {
        total: number;
        paymentMethodId: number;
      }[];
      ordersCount: number;
      averageReceipt: number;
      date: string;
      totalSummary: number;
    }[]
  > {
    return await getReport(
      request.startDate,
      request.endDate,
      request.type,
      user.companyId
    );
  }
}
