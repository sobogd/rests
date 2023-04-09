export interface AuthorizationResponse {
  id: number;
  name: string;
  type: EUserTypes;
  token: string;
}

export enum EUserTypes {
  ADMIN = "admin",
  PERSONAL = "personal",
  MANAGER = "manager",
  KITCHEN = "kitchen",
}

export enum EUserStatuses {
  ACTIVE = "active",
  ARCHIVED = "archived",
}

export interface AuthorizationRequest {
  companyLogin: string;
  login: string;
  password: string;
}

export interface IUserForUpdate {
  userId: number;
  newPassword?: string;
  name: string;
  type: string;
}

export interface IUserForCreate {
  password: string;
  name: string;
  type: string;
}

export interface IUser {
  id?: number;
  name: string;
  login?: string;
  password?: string;
  type: EUserTypes;
  companyId?: number;
  status?: EUserStatuses;
  companyLogin?: string;
}

export interface IUserDB {
  id?: number;
  name: string;
  login?: string;
  password?: string;
  type: EUserTypes;
  company_id?: number;
  status?: EUserStatuses;
  company_login?: string;
}

export const mapUsersFromDB = (rows: IUserDB[]): IUser[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        name: row.name,
        login: row.login,
        password: row.password,
        type: row.type,
        companyId: row.company_id,
        status: row.status,
        companyLogin: row.company_login,
      }))
    : [];

export const mapUsersToDB = (rows: IUser[]): IUserDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        name: row.name,
        login: row.login,
        password: row.password,
        type: row.type,
        company_id: row.companyId,
        status: row.status,
        company_login: row.companyLogin,
      }))
    : [];
