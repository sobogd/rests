import {
  OperationId,
  Post,
  Route,
  Security,
  Tags,
  UploadedFiles,
  File,
  Body,
  Request,
} from "tsoa";
import { uploadImage } from "../services/tables/uploadImage";
import { IAuthRequest } from "../types";
import { ITable, ITableImageResponse } from "../mappers/tables";
import { findImage } from "../services/tables/findImage";
import { searchTables } from "../services/tables/searchTables";
import { createTable } from "../services/tables/createTable";
import { updateTable } from "../services/tables/updateTable";
import { archiveTable } from "../services/tables/archiveTable";

@Route("tables")
export class TablesController {
  @Tags("TablesService")
  @OperationId("uploadImage")
  @Security("Bearer", ["AuthService"])
  @Post("uploadImage")
  public async uploadImage(
    @UploadedFiles() files: File[],
    @Request() { user }: IAuthRequest
  ): Promise<{}> {
    await uploadImage(files[0], user.companyId);
    return {};
  }
  @Tags("TablesService")
  @OperationId("findImage")
  @Security("Bearer", ["AuthService"])
  @Post("findImage")
  public async findImage(
    @Request() { user }: IAuthRequest
  ): Promise<ITableImageResponse> {
    return await findImage(user.companyId);
  }
  @Tags("TablesService")
  @OperationId("Search")
  @Security("Bearer", ["AuthService"])
  @Post("search")
  public async search(@Request() { user }: IAuthRequest): Promise<ITable[]> {
    return await searchTables(user.companyId);
  }
  @Tags("TablesService")
  @OperationId("Create")
  @Security("Bearer", ["AuthService"])
  @Post("create")
  public async create(
    @Body() request: ITable,
    @Request() { user }: IAuthRequest
  ): Promise<{}> {
    await createTable(request, user.companyId);
    return {};
  }
  @Tags("TablesService")
  @OperationId("Update")
  @Security("Bearer", ["AuthService"])
  @Post("update")
  public async update(@Body() request: ITable): Promise<{}> {
    await updateTable(request);
    return {};
  }
  @Tags("TablesService")
  @OperationId("Archive")
  @Security("Bearer", ["AuthService"])
  @Post("archive")
  public async archive(@Body() request: { id: number }): Promise<{}> {
    await archiveTable(request.id);
    return {};
  }
}
