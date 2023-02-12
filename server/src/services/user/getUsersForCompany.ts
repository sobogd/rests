import { IUser } from "../../interfaces/user";
import userRepository from "../../repositories/users-repository";

const getUsersForCompany = async (): Promise<any> => {
  const foundedUsers = await userRepository.findAll();
  return foundedUsers;
};

export default getUsersForCompany;
