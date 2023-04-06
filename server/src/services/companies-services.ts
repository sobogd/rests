import pool from "../db";
import * as bcrypt from "bcryptjs";
import { IUser } from "../interfaces/user";

const changePassword = async ({
  oldPassword,
  newPassword,
  userId,
}: {
  oldPassword: string;
  newPassword: string;
  userId: number;
}): Promise<{ isSuccess: boolean; message?: string }> => {
  const client = await pool.connect();

  const { rows: usersById } = await client.query(
    "SELECT company_id FROM users WHERE id = $1",
    [userId]
  );

  if (!usersById.length) {
    return { isSuccess: false, message: "User not found" };
  }

  const companyId = usersById[0].company_id;

  const { rows } = await client.query("SELECT * FROM companies WHERE id = $1", [
    companyId,
  ]);

  if (!rows.length) {
    return { isSuccess: false, message: "Company not found" };
  }

  const match_old_password = await bcrypt.compare(oldPassword, rows[0].hash);

  if (!match_old_password) {
    return { isSuccess: false, message: "Old password is incorrect" };
  }

  const newHash = await bcrypt.hash(newPassword, 13);

  const { rows: updatedRows } = await client.query(
    "UPDATE companies SET hash = $1 WHERE id = $2 RETURNING *",
    [newHash, companyId]
  );

  if (updatedRows[0].hash !== newHash) {
    return { isSuccess: false, message: "Unexpected error has occurred" };
  }

  client.release();

  return { isSuccess: true };
};

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
    "SELECT name, login FROM users WHERE company_id = $1",
    [companyId]
  );

  if (!rows?.length) {
    return { isSuccess: false, message: "Users not found" };
  }

  return rows;
};

export default { changePassword, getUsersByCompanyLogin };
