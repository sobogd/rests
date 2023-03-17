import { Body, OperationId, Request, Post, Route, Security, Tags } from "tsoa";
import companiesServices from "../services/companies-services";

@Route("companies")
export class CompaniesController {
  @Tags("CompaniesService")
  @OperationId("ChangePassword")
  @Security("Bearer", ["AuthService"])
  @Post("changePassword")
  public async changePassword(
    @Request() request: { user: { id: number } },
    @Body()
    body: { oldPassword: string; newPassword: string }
  ): Promise<{ isSuccess: boolean; message?: string }> {
    return await companiesServices.changePassword({
      ...body,
      userId: request?.user?.id,
    });
  }
}
