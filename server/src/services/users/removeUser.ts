import { IResponseStatusWithMessage } from "../../types";
import pool from "../../db";
import { EUserStatuses } from "../../mappers/users";

const removeUser = async (
  userId: number
): Promise<IResponseStatusWithMessage> => {
  const client = await pool.connect();

  if (!userId) {
    return { isSuccess: false, message: "Error with request validation" };
  }

  const { rows: removedUser } = await client.query(
    "UPDATE users SET status = $1 WHERE id = $2",
    [EUserStatuses.ARCHIVED, userId]
  );

  if (!removedUser.length) {
    return { isSuccess: false, message: "Error with remove users" };
  }

  client.release();

  return { isSuccess: true };
};

export default removeUser;
