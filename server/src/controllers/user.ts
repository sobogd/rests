import { Body, Get, Request, OperationId, Post, Response, Route, Security, Tags } from "tsoa";
import { AuthorizationRequest, AuthorizationResponse, IUser } from "../interfaces/user";
import authorization from "../services/user/authorization";
import getUsersForCompany from "../services/user/getUsersForCompany";
import whoAmI from "../services/user/whoAmI";

export interface ErrorResponse {
  error: string;
}

@Route("user")
export class UserController {
  @Tags("UserService")
  @OperationId("Authorization")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Post("authorization")
  public async authorization(@Body() request: AuthorizationRequest): Promise<AuthorizationResponse> {
    return await authorization(request);
  }

  @Tags("UserService")
  @OperationId("WhoAmI")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Get("whoami")
  public async whoami(@Request() { user }: { user: { id: string } }): Promise<IUser> {
    return await whoAmI(user.id);
  }

  @Tags("UserService")
  @OperationId("GetUsersForCompany")
  @Response<ErrorResponse>(500, "Response with error")
  @Get("get-users-for-company")
  public async getUsersForCompany(): Promise<any> {
    return await getUsersForCompany();
  }
}
