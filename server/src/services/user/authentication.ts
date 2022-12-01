import * as crypto from "crypto";
import * as jose from "jose";
import { Request } from "express";
import dotenv from "dotenv";
import usersRepository from "../../repositories/users-repository";
import AppError from "../../helpers/app-error";

dotenv.config();

const secretKey = crypto.createSecretKey((process.env.TOKEN || "").toString(), "utf-8");

export const expressAuthentication = async (request: Request, securityName: string, _: string[]) => {
  if (!request?.headers?.authorization) {
    return Promise.reject(new AppError(401, "Unauthorized"));
  }

  if (securityName === "Bearer") {
    const { payload } = await jose.jwtVerify(request.headers.authorization.replace("Bearer ", ""), secretKey);

    if (!payload || !payload.id) {
      return Promise.reject(new AppError(401, "Unauthorized"));
    }
    const user = await usersRepository.findById(Number(payload.id));

    if (
      user.id !== payload.id ||
      user.name !== payload.name ||
      user.type !== payload.type ||
      user.login !== payload.login
    ) {
      return Promise.reject(new AppError(401, "Unauthorized"));
    }

    return Promise.resolve({ id: user.id });
  }
};
