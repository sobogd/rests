import {
  Body,
  Get,
  Request,
  OperationId,
  Post,
  Response,
  Route,
  Security,
  Tags,
} from "tsoa";
import {
  AuthorizationRequest,
  AuthorizationResponse,
  IUser,
  IUserForCreate,
  IUserForUpdate,
} from "../interfaces/user";
import authorization from "../services/user/authorization";
import getUsersForCompany from "../services/user/getUsersForCompany";
import whoAmI from "../services/user/whoAmI";
import updateUserData from "../services/user/updateUserData";
import createNewUser from "../services/user/createNewUser";
import removeUser from "../services/user/removeUser";
import { IResponseStatusWithMessage } from "../interfaces/common";

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
  public async authorization(
    @Body() request: AuthorizationRequest
  ): Promise<AuthorizationResponse> {
    return await authorization(request);
  }

  @Tags("UserService")
  @OperationId("WhoAmI")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Get("whoami")
  public async whoami(
    @Request() { user }: { user: { id: string } }
  ): Promise<IUser> {
    return await whoAmI(user.id);
  }

  @Tags("UserService")
  @OperationId("GetUsersForCompany")
  @Response<ErrorResponse>(500, "Response with error")
  @Get("get-users-for-company")
  public async getUsersForCompany(): Promise<any> {
    return await getUsersForCompany();
  }

  @Tags("UserService")
  @OperationId("UpdateUserData")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("update-user-data")
  public async updateUserData(
    @Body() userDataForUpdate: IUserForUpdate
  ): Promise<IResponseStatusWithMessage> {
    return await updateUserData(userDataForUpdate);
  }

  @Tags("UserService")
  @OperationId("CreateNewUser")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("create-new-user")
  public async createNewUser(
    @Body() userDataForUpdate: IUserForCreate,
    @Request() { user }: { user: { companyId: number } }
  ): Promise<IResponseStatusWithMessage> {
    return await createNewUser(userDataForUpdate, user.companyId);
  }

  @Tags("UserService")
  @OperationId("RemoveUser")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("remove-user")
  public async removeUser(
    @Body() { userId }: { userId: number }
  ): Promise<IResponseStatusWithMessage> {
    return await removeUser(userId);
  }
}
