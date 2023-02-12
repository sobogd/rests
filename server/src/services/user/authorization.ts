import * as crypto from "crypto";
import * as jose from "jose";
import { IUser, AuthorizationRequest, AuthorizationResponse } from "../../interfaces/user";
import userRepository from "../../repositories/users-repository";
import dotenv from "dotenv";
import FieldsError from "../../helpers/fieldsError";

dotenv.config();

const secretKey = crypto.createSecretKey((process.env.TOKEN || "").toString(), "utf-8");

const authorization = async (request: AuthorizationRequest): Promise<AuthorizationResponse> => {
  const foundedByLogin = await userRepository.findByLogin(request.login);

  if (!foundedByLogin || !foundedByLogin.id) {
    throw new FieldsError("Login is incorrect");
  }

  if (!request.password) {
    throw new FieldsError("Password is incorrect");
  }

  const foundedUser: IUser = await userRepository.findByLoginAndPassword(request.login, request.password);

  if (!foundedUser || !foundedUser.id) {
    throw new FieldsError("Password is incorrect");
  }

  const token = await new jose.SignJWT({
    id: foundedUser.id,
    name: foundedUser.name,
    login: foundedUser.login,
    type: foundedUser.type,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secretKey);

  return { id: foundedUser.id, name: foundedUser.name, type: foundedUser.type, token };
};

export default authorization;
