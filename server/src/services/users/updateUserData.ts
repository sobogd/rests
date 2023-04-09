import { IResponseStatusWithMessage } from "../../types";
import * as bcrypt from "bcryptjs";
import pool from "../../db";
import { IUserForUpdate } from "../../mappers/users";

const updateUserData = async (
  data: IUserForUpdate
): Promise<IResponseStatusWithMessage> => {
  const client = await pool.connect();

  if (!data.name || !data.userId || !data.type) {
    return { isSuccess: false, message: "Error with request validation" };
  }

  const { rows: updatedUserData } = await client.query(
    "UPDATE users SET name = $1, type = $2 WHERE id = $3 RETURNING *",
    [data.name, data.type, data.userId]
  );

  if (!updatedUserData.length) {
    return { isSuccess: false, message: "Error with update users data" };
  }

  if (data.newPassword && data.newPassword.length) {
    const newHash = await bcrypt.hash(data.newPassword, 13);

    const { rows: updatedUserHash } = await client.query(
      "UPDATE users SET password = $1 WHERE id = $2 RETURNING *",
      [newHash, data.userId]
    );

    if (!updatedUserHash.length) {
      return { isSuccess: false, message: "Error with update users password" };
    }
  }

  client.release();

  return { isSuccess: true };
};

export default updateUserData;
