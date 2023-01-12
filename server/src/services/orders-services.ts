import { IOrder, IOrderCreateRequest } from "../interfaces/orders";
import ordersPositionsRepository from "../repositories/orders-positions-repository";
import ordersRepository from "../repositories/orders-repository";

const search = async (): Promise<IOrder[]> => {
  const orders = await ordersRepository.findAllActive();
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
    createTime: order.createTime,
    status: "active",
  });

  for (const position of order.positions) {
    await ordersPositionsRepository.create({
      orderId: createdOrder.id,
      positionId: position.positionId,
      additional: position.additional?.map((a) => `${a.count}-${a.id}`).join("/") || "",
      comment: position.comment,
      startTime: new Date().toISOString(),
    });
  }
};

const update = async (order: IOrderCreateRequest): Promise<void> => {
  const updatedOrder = await ordersRepository.updateById(
    {
      tableId: order.tableId,
      comment: order.comment,
      status: "active",
    },
    order.orderId || 0
  );

  const oldOrderPositions = await ordersPositionsRepository.findAllByOrderId(order.orderId || 0);

  for (const orderPosition of oldOrderPositions) {
    const isOldOrderPositionRemoved = !order.positions.find((op) => op.id === orderPosition.id);

    if (isOldOrderPositionRemoved) {
      await ordersPositionsRepository.removeById(orderPosition.id);
    }
  }

  for (const position of order.positions) {
    if (!position.id) {
      await ordersPositionsRepository.create({
        orderId: updatedOrder.id,
        positionId: position.positionId,
        additional: position.additional?.map((a) => `${a.count}-${a.id}`).join("/") || "",
        comment: position.comment,
        startTime: new Date().toISOString(),
      });
    }
  }
};

const remove = async (category: { id: number }): Promise<{}> => {
  category.id && (await ordersRepository.removeById(category.id));
  return {};
};

const orderPositionFinish = async (orderPositionId: number): Promise<{}> => {
  const updatedOrderPosition = await ordersPositionsRepository.updateById(
    {
      finishTime: new Date().toISOString(),
    },
    orderPositionId
  );

  const allPositionInOrder = await ordersPositionsRepository.findAllByOrderId(
    Number(updatedOrderPosition.orderId)
  );

  const unFinishedPositions = allPositionInOrder.filter((op) => !op.finishTime);

  if (!unFinishedPositions?.length) {
    await ordersRepository.updateById(
      {
        finishTime: new Date().toISOString(),
      },
      Number(updatedOrderPosition.orderId)
    );
  }

  return {};
};

const finish = async (id: number): Promise<{}> => {
  await ordersRepository.updateById(
    {
      status: "finished",
    },
    Number(id)
  );

  return {};
};

export default { search, create, update, remove, orderPositionFinish, finish };
