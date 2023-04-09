import { Body, OperationId, Request, Post, Route, Security, Tags } from "tsoa";
import { IUser } from "../mappers/users";
import getUsersByCompanyLogin from "../services/companies/getUsersByCompanyLogin";

@Route("companies")
export class CompaniesController {
  @Tags("CompaniesService")
  @OperationId("GetUsersByCompanyLogin")
  @Post("getUsersByCompanyLogin")
  public async getUsersByCompanyLogin(
    @Body()
    body: {
      companyLogin: string;
    }
  ): Promise<IUser[] | { isSuccess: boolean; message?: string }> {
    return await getUsersByCompanyLogin(body.companyLogin);
  }
}
