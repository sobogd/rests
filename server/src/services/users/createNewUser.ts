import { IResponseStatusWithMessage } from "../../types";
import * as bcrypt from "bcryptjs";
import pool from "../../db";
import { EUserStatuses, IUserForCreate } from "../../mappers/users";

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
    "INSERT INTO users (name, login, password, type, company_id, status) VALUES ($1, $2, $3, $4, $5, $6)",
    [
      data.name,
      generatedLogin,
      newHash,
      data.type,
      companyId,
      EUserStatuses.ACTIVE,
    ]
  );

  if (!createdUser.length) {
    return { isSuccess: false, message: "Error while adding users" };
  }

  client.release();

  return { isSuccess: true };
};

export default createNewUser;
