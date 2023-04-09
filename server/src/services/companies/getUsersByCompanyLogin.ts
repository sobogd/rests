import pool from "../../db";
import { EUserStatuses, IUser } from "../../mappers/users";

const getUsersByCompanyLogin = async (
  companyLogin: string
): Promise<IUser[] | { isSuccess: boolean; message?: string }> => {
  const client = await pool.connect();

  const { rows: foundedCompanyByLogin } = await client.query(
    "SELECT id FROM companies WHERE login = $1",
    [companyLogin]
  );

  const companyId = foundedCompanyByLogin[0]?.id;

  if (!companyId) {
    return { isSuccess: false, message: "Login is incorrect" };
  }

  const { rows }: { rows: IUser[] } = await client.query(
    "SELECT name, login FROM users WHERE company_id = $1 AND status = $2",
    [companyId, EUserStatuses.ACTIVE]
  );

  if (!rows?.length) {
    return { isSuccess: false, message: "Users not found" };
  }

  await client.release();

  return rows;
};

export default getUsersByCompanyLogin;
