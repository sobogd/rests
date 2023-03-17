import * as crypto from "crypto";
import * as jose from "jose";
import {
  IUser,
  AuthorizationRequest,
  AuthorizationResponse,
} from "../../interfaces/user";
import userRepository from "../../repositories/users-repository";
import dotenv from "dotenv";
import FieldsError from "../../helpers/fieldsError";
import * as bcrypt from "bcryptjs";

dotenv.config();

const secretKey = crypto.createSecretKey(
  (process.env.TOKEN || "").toString(),
  "utf-8"
);

const authorization = async (
  request: AuthorizationRequest
): Promise<AuthorizationResponse> => {
  const foundedByLogin = await userRepository.findByLogin(request.login);

  if (!foundedByLogin || !foundedByLogin.id) {
    throw new FieldsError("Login is incorrect");
  }

  if (!request.password) {
    throw new FieldsError("Password is empty");
  }

  const match = await bcrypt.compare(request.password, foundedByLogin.password);

  if (!match) {
    throw new FieldsError("Password is incorrect");
  }

  if (!foundedByLogin || !foundedByLogin.id) {
    throw new FieldsError("Password is incorrect");
  }

  const token = await new jose.SignJWT({
    id: foundedByLogin.id,
    name: foundedByLogin.name,
    login: foundedByLogin.login,
    type: foundedByLogin.type,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secretKey);

  return {
    id: foundedByLogin.id,
    name: foundedByLogin.name,
    type: foundedByLogin.type,
    token,
  };
};

export default authorization;
