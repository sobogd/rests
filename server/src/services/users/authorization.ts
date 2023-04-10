import * as crypto from "crypto";
import * as jose from "jose";
import dotenv from "dotenv";
import FieldsError from "../../helpers/fieldsError";
import * as bcrypt from "bcryptjs";
import {
  AuthorizationRequest,
  AuthorizationResponse,
  mapUsersFromDB,
} from "../../mappers/users";
import pool from "../../db";

dotenv.config();

const secretKey = crypto.createSecretKey(
  (process.env.TOKEN || "").toString(),
  "utf-8"
);

const authorization = async (
  request: AuthorizationRequest
): Promise<AuthorizationResponse> => {
  const client = await pool.connect();

  const { rows: usersDB } = await client.query(
    'SELECT u.name, u.login, c.login as "company_login", u.id, u.type, u.password, u.company_id FROM users u LEFT JOIN companies c ON c.id = u.company_id WHERE u.login = $1 AND c.login = $2',
    [request.login, request.companyLogin]
  );
  const user = mapUsersFromDB(usersDB)[0];

  await client.release();

  if (!user || !user.id || !user.password) {
    throw new FieldsError("Login is incorrect");
  }

  if (!request.password) {
    throw new FieldsError("Password is empty");
  }

  const match = await bcrypt.compare(request.password, user.password);

  if (!match) {
    throw new FieldsError("Password is incorrect");
  }

  if (!user || !user.id) {
    throw new FieldsError("Password is incorrect");
  }

  const token = await new jose.SignJWT({
    id: user.id,
    name: user.name,
    login: user.login,
    companyLogin: user.companyLogin,
    type: user.type,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secretKey);

  return {
    id: user.id,
    name: user.name,
    type: user.type,
    token,
  };
};

export default authorization;
