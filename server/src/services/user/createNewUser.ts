import { IUserForCreate, IUserForUpdate } from "../../interfaces/user";
import { IResponseStatusWithMessage } from "../../interfaces/common";
import * as bcrypt from "bcryptjs";
import pool from "../../db";

const createNewUser = async (
  data: IUserForCreate,
  companyId: number
): Promise<IResponseStatusWithMessage> => {
  const client = await pool.connect();

  if (!data.name || !data.type || !data.password) {
    return { isSuccess: false, message: "Error with request validation" };
  }

  const newHash = await bcrypt.hash(data.password, 13);
  const generatedLogin = (Math.random() + 1).toString(36).substring(2);

  const { rows: createdUser } = await client.query(
    "INSERT INTO users (name, login, password, type, company_id) VALUES ($1, $2, $3, $4, $5)",
    [data.name, generatedLogin, newHash, data.type, companyId]
  );

  if (!createdUser.length) {
    return { isSuccess: false, message: "Error while adding user" };
  }

  client.release();

  return { isSuccess: true };
};

export default createNewUser;
