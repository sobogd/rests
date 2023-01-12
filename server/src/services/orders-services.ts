import { IDayReportResponse, IOrder, IOrderCreateRequest } from "../interfaces/orders";
import ordersPositionsRepository from "../repositories/orders-positions-repository";
import ordersRepository from "../repositories/orders-repository";
import { DateTime } from "luxon";
import positionsRepository from "../repositories/positions-repository";

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
    createTime: DateTime.now().toUTC().toSQL(),
    status: "active",
  });

  for (const position of order.positions) {
    await ordersPositionsRepository.create({
      orderId: createdOrder.id,
      positionId: position.positionId,
      additional: position.additional?.map((a) => `${a.count}-${a.id}`).join("/") || "",
      comment: position.comment,
      startTime: DateTime.now().toUTC().toSQL(),
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
        startTime: DateTime.now().toUTC().toSQL(),
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
      finishTime: DateTime.now().toUTC().toSQL(),
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
        finishTime: DateTime.now().toUTC().toSQL(),
      },
      Number(updatedOrderPosition.orderId)
    );
  }

  return {};
};

const finish = async (id: number, type: string): Promise<{}> => {
  await ordersRepository.updateById(
    {
      status: "finished",
      discount: type === "cash" ? "10" : "0",
    },
    Number(id)
  );

  return {};
};

const getDayReport = async (): Promise<IDayReportResponse> => {
  const orders = await ordersRepository.findByDate(DateTime.now().toSQLDate());
  const positions = await positionsRepository.findAll();

  let resultOrders: any = [];

  for (const o of orders) {
    const finistDate = DateTime.fromJSDate(o.finishTime);
    const startDate = DateTime.fromJSDate(o.createTime);
    const diff = finistDate.diff(startDate, ["minutes"]);
    let total = 0;
    const resultPositions: string[] = [];

    const orderPositions = await ordersPositionsRepository.findAllByOrderId(o.id);

    for (const op of orderPositions) {
      const primaryPosition = positions.find((p) => Number(p.id) === Number(op.positionId));

      resultPositions.push(primaryPosition.name);
      total = total + Number(primaryPosition.price);

      if (op.additional?.length) {
        const additionalPositions = op.additional.split("/");
        additionalPositions.forEach((op: any) => {
          const splitted = op.split("-");
          const additionalPosition = positions.find((p) => Number(p.id) === Number(splitted[1]));

          if (additionalPosition?.price) {
            resultPositions.push(additionalPosition.name);
            total = total + Number(additionalPosition.price) * Number(splitted[0]);
          }
        });
      }
    }

    resultOrders.push({
      id: o.id,
      time: Math.round(Number(diff.toObject().minutes)),
      date: o.createTime,
      discount: Number(o.discount),
      total,
      positions: resultPositions,
    });
  }

  return resultOrders;
};

export default { search, create, update, remove, orderPositionFinish, finish, getDayReport };
