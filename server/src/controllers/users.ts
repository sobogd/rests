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
import authorization from "../services/users/authorization";
import getUsersForCompany from "../services/users/getUsersForCompany";
import whoAmI from "../services/users/whoAmI";
import updateUserData from "../services/users/updateUserData";
import createNewUser from "../services/users/createNewUser";
import removeUser from "../services/users/removeUser";
import { IResponseStatusWithMessage } from "../types";
import { IAuthRequest } from "../types";
import {
  AuthorizationRequest,
  AuthorizationResponse,
  IUser,
  IUserForCreate,
  IUserForUpdate,
} from "../mappers/users";

export interface ErrorResponse {
  error: string;
}

@Route("users")
export class UsersController {
  @Tags("UsersService")
  @OperationId("Authorization")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Post("authorization")
  public async authorization(
    @Body() request: AuthorizationRequest
  ): Promise<AuthorizationResponse> {
    return await authorization(request);
  }

  @Tags("UsersService")
  @OperationId("WhoAmI")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Get("whoami")
  public async whoami(@Request() { user }: IAuthRequest): Promise<IUser> {
    return await whoAmI(user.id);
  }

  @Tags("UsersService")
  @OperationId("GetUsersForCompany")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Get("get-users-for-company")
  public async getUsersForCompany(
    @Request() { user }: IAuthRequest
  ): Promise<IUser[]> {
    return await getUsersForCompany(user.companyId);
  }

  @Tags("UsersService")
  @OperationId("UpdateUserData")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("update-users-data")
  public async updateUserData(
    @Body() userDataForUpdate: IUserForUpdate
  ): Promise<IResponseStatusWithMessage> {
    return await updateUserData(userDataForUpdate);
  }

  @Tags("UsersService")
  @OperationId("CreateNewUser")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("create-new-users")
  public async createNewUser(
    @Body() userDataForUpdate: IUserForCreate,
    @Request() { user }: { user: { companyId: number } }
  ): Promise<IResponseStatusWithMessage> {
    return await createNewUser(userDataForUpdate, user.companyId);
  }

  @Tags("UsersService")
  @OperationId("RemoveUser")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("remove-users")
  public async removeUser(
    @Body() { userId }: { userId: number }
  ): Promise<IResponseStatusWithMessage> {
    return await removeUser(userId);
  }
}
