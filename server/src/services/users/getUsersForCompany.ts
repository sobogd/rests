import pool from "../../db";
import { EUserStatuses, IUser, mapUsersFromDB } from "../../mappers/users";

const getUsersForCompany = async (companyId: number): Promise<IUser[]> => {
  const client = await pool.connect();

  const { rows: usersDB } = await client.query(
    `SELECT * from users WHERE company_id = $1 AND status = $2`,
    [companyId, EUserStatuses.ACTIVE]
  );
  const users = mapUsersFromDB(usersDB).map((user) => ({
    id: user.id,
    name: user.name,
    type: user.type,
  }));

  await client.release();

  return users;
};

export default getUsersForCompany;
