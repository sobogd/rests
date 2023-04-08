export interface ICompany {
  id: number;
  title: string;
  login: string;
  hash: string;
  utcDiff: number;
}

export interface ICompanyDB {
  id: number;
  title: string;
  login: string;
  hash: string;
  utc_diff: number;
}

export const mapCompaniesFromDB = (rows: ICompanyDB[]): ICompany[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        title: row.title,
        login: row.login,
        hash: row.hash,
        utcDiff: row.utc_diff,
      }))
    : [];

export const mapCompaniesToDB = (rows: ICompany[]): ICompanyDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        title: row.title,
        login: row.login,
        hash: row.hash,
        utc_diff: row.utcDiff,
      }))
    : [];
