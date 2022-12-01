import { IUser } from "../../interfaces/user";
import userRepository from "../../repositories/users-repository";

const whoAmI = async (userId: string): Promise<IUser> => {
  const foundedUser = await userRepository.findById(Number(userId));
  return { id: foundedUser.id, name: foundedUser.name, type: foundedUser.type };
};

export default whoAmI;
