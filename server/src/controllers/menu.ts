import { Get, OperationId, Route, Tags, Request, Body, Query } from "tsoa";
import { searchPositionsForCompany } from "../services/menu/searchPositionsForCompany";
import { IMenuResponse } from "../mappers/menu";

@Route("menu")
export class MenuController {
  @Tags("MenuService")
  @OperationId("SearchForCompanyId")
  @Get("{companyId}")
  public async search(@Query() companyId: number): Promise<IMenuResponse[]> {
    return await searchPositionsForCompany(companyId);
  }
}
