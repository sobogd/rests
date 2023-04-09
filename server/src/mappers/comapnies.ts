export interface ICompany {
  id: number;
  title: string;
  login: string;
  utcDiff: number;
}

export interface ICompanyDB {
  id: number;
  title: string;
  login: string;
  utc_diff: number;
}

export const mapCompaniesFromDB = (rows: ICompanyDB[]): ICompany[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        title: row.title,
        login: row.login,
        utcDiff: row.utc_diff,
      }))
    : [];

export const mapCompaniesToDB = (rows: ICompany[]): ICompanyDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        title: row.title,
        login: row.login,
        utc_diff: row.utcDiff,
      }))
    : [];
