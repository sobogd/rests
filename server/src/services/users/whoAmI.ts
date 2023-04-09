import pool from "../../db";
import { IUser, mapUsersFromDB } from "../../mappers/users";

const whoAmI = async (userId: number): Promise<IUser> => {
  const client = await pool.connect();

  const { rows: usersDB } = await client.query(
    `SELECT * from users WHERE id = $1`,
    [userId]
  );
  const user = mapUsersFromDB(usersDB)[0];

  await client.release();

  return { id: user.id, name: user.name, type: user.type };
};

export default whoAmI;
