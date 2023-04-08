import { Body, OperationId, Post, Request, Route, Security, Tags } from "tsoa";
import { IAuthRequest } from "../mappers/common";
import { updateDailyReport } from "../services/reports/updateDailyReport";

@Route("reports")
export class ReportsController {
  @Tags("ReportsService")
  @OperationId("UpdateDailyReport")
  @Security("Bearer", ["AuthService"])
  @Post("update-daily-report")
  public async updateDailyReport(
    @Body() request: { date: Date },
    @Request() { user }: IAuthRequest
  ): Promise<{}> {
    await updateDailyReport(request.date, user.companyId);
    return {};
  }
}
