import { Body, OperationId, Request, Post, Route, Security, Tags } from "tsoa";
import companiesServices from "../services/companies-services";
import { IUser } from "../interfaces/user";

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

  @Tags("CompaniesService")
  @OperationId("GetUsersByCompanyLogin")
  @Post("getUsersByCompanyLogin")
  public async getUsersByCompanyLogin(
    @Body()
    body: {
      companyLogin: string;
    }
  ): Promise<IUser[] | { isSuccess: boolean; message?: string }> {
    return await companiesServices.getUsersByCompanyLogin(body.companyLogin);
  }
}
