import userRepository from "../../repositories/users-repository";
import { IUserForUpdate } from "../../interfaces/user";
import { IResponseStatusWithMessage } from "../../interfaces/common";
import * as bcrypt from "bcryptjs";
import pool from "../../db";

const removeUser = async (
  userId: number
): Promise<IResponseStatusWithMessage> => {
  const client = await pool.connect();

  if (!userId) {
    return { isSuccess: false, message: "Error with request validation" };
  }

  const { rows: removedUser } = await client.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [userId]
  );

  if (!removedUser.length) {
    return { isSuccess: false, message: "Error with remove user" };
  }

  client.release();

  return { isSuccess: true };
};

export default removeUser;
