import { IOrderResponse } from "../interfaces/orders";
import ordersRepository from "../repositories/orders-repository";

const search = async (): Promise<IOrderResponse[]> => {
  const orders = await ordersRepository.findAll();
  return orders;
};

const create = async (category: IOrderResponse): Promise<IOrderResponse> => {
  const createdCategory = await ordersRepository.create(category);
  return createdCategory;
};

const update = async (category: IOrderResponse): Promise<IOrderResponse> => {
  const updatedCategory = await ordersRepository.updateById(category, category.id || 0);
  return updatedCategory;
};

const remove = async (category: { id: number }): Promise<{}> => {
  category.id && (await ordersRepository.removeById(category.id));
  return {};
};

export default { search, create, update, remove };
