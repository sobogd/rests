import * as crypto from "crypto";
import * as jose from "jose";
import { Request } from "express";
import dotenv from "dotenv";
import AppError from "../../helpers/app-error";
import { mapUsersFromDB } from "../../mappers/users";
import pool from "../../db";

dotenv.config();

const secretKey = crypto.createSecretKey(
  (process.env.TOKEN || "").toString(),
  "utf-8"
);

export const expressAuthentication = async (
  request: Request,
  securityName: string,
  _: string[]
) => {
  if (!request?.headers?.authorization) {
    return Promise.reject(new AppError(401, "Unauthorized"));
  }

  if (securityName === "Bearer") {
    const { payload } = await jose.jwtVerify(
      request.headers.authorization.replace("Bearer ", ""),
      secretKey
    );

    if (!payload || !payload.id) {
      return Promise.reject(new AppError(401, "Unauthorized"));
    }

    const client = await pool.connect();

    const { rows: usersDB } = await client.query(
      'SELECT u.name, u.login, c.login as "company_login", u.id, u.type, u.password, u.company_id FROM users u LEFT JOIN companies c ON c.id = u.company_id WHERE u.id = $1 AND c.login = $2',
      [payload.id, payload.companyLogin]
    );

    const user = mapUsersFromDB(usersDB)[0];

    await client.release();

    if (
      user.id !== payload.id ||
      user.name !== payload.name ||
      user.type !== payload.type ||
      user.login !== payload.login ||
      user.companyLogin !== payload.companyLogin
    ) {
      return Promise.reject(new AppError(401, "Unauthorized"));
    }

    return Promise.resolve({ id: user.id, companyId: user.companyId });
  }
};
