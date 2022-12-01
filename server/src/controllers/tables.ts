import { OperationId, Post, Route, Security, Tags, UploadedFiles, File, Body } from "tsoa";
import { ITable, ITableImageResponse } from "../interfaces/tables";
import tablesServices from "../services/tables-services";

@Route("tables")
export class TablesController {
  @Tags("TablesService")
  @OperationId("uploadImage")
  @Security("Bearer", ["AuthService"])
  @Post("uploadImage")
  public async uploadImage(@UploadedFiles() files: File[]): Promise<{}> {
    return await tablesServices.uploadImage(files[0]);
  }
  @Tags("TablesService")
  @OperationId("findImage")
  @Security("Bearer", ["AuthService"])
  @Post("findImage")
  public async findImage(): Promise<ITableImageResponse> {
    return await tablesServices.findImage();
  }
  @Tags("TablesService")
  @OperationId("Search")
  @Security("Bearer", ["AuthService"])
  @Post("search")
  public async search(): Promise<ITable[]> {
    return await tablesServices.search();
  }
  @Tags("TablesService")
  @OperationId("Create")
  @Security("Bearer", ["AuthService"])
  @Post("create")
  public async create(@Body() request: ITable): Promise<ITable> {
    return await tablesServices.create(request);
  }
  @Tags("TablesService")
  @OperationId("Update")
  @Security("Bearer", ["AuthService"])
  @Post("update")
  public async update(@Body() request: ITable): Promise<ITable> {
    return await tablesServices.update(request);
  }
  @Tags("TablesService")
  @OperationId("Remove")
  @Security("Bearer", ["AuthService"])
  @Post("remove")
  public async remove(@Body() request: ITable): Promise<{}> {
    return await tablesServices.remove(request);
  }
}
