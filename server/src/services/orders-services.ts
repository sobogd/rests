import { IOrder, IOrderCreateRequest } from "../interfaces/orders";
import ordersPositionsRepository from "../repositories/orders-positions-repository";
import ordersRepository from "../repositories/orders-repository";

const search = async (): Promise<IOrder[]> => {
  const orders = await ordersRepository.findAll();
  const result = [];

  for (const order of orders) {
    const ordersPositions = await ordersPositionsRepository.findAllByOrderId(order.id);

    result.push({
      ...order,
      ordersPositions,
    });
  }

  return result;
};

const create = async (order: IOrderCreateRequest): Promise<void> => {
  const createdOrder = await ordersRepository.create({
    tableId: order.tableId,
    comment: order.comment,
    createTime: new Date().toISOString(),
  });

  for (const position of order.positions) {
    await ordersPositionsRepository.create({
      orderId: createdOrder.id,
      positionId: position.positionId,
      additional: position.additional.map((a) => `${a.count}-${a.id}`).join("/"),
      comment: position.comment,
      startTime: new Date().toISOString(),
    });
  }
};

const update = async (category: IOrder): Promise<IOrder> => {
  const updatedCategory = await ordersRepository.updateById(category, category.id || 0);
  return updatedCategory;
};

const remove = async (category: { id: number }): Promise<{}> => {
  category.id && (await ordersRepository.removeById(category.id));
  return {};
};

export default { search, create, update, remove };
