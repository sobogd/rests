import { IDayReportResponse, IOrder, IOrderCreateRequest } from "../interfaces/orders";
import ordersPositionsRepository from "../repositories/orders-positions-repository";
import ordersRepository from "../repositories/orders-repository";
import { DateTime } from "luxon";
import positionsRepository from "../repositories/positions-repository";
import reportPositionsRepository from "../repositories/report-positions-repository";
import ordersPositionsLogsServices from "./orders-positions-logs-services";
import { EOrderPositionLog } from "../enums.ts/orders-positions-logs-enums";

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
    const additional = position.additional?.map((a) => `${a.count}-${a.id}`).join("/") || "";

    await ordersPositionsRepository.create({
      orderId: createdOrder.id,
      positionId: position.positionId,
      additional,
      comment: position.comment,
    });

    await ordersPositionsLogsServices.create({
      operationType: EOrderPositionLog.CREATE,
      positionId: position.positionId,
      orderId: createdOrder.id,
      positionAdditional: additional,
      positionComment: position.comment,
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

      await ordersPositionsLogsServices.create({
        operationType: EOrderPositionLog.REMOVE,
        orderId: updatedOrder.id,
        positionId: orderPosition.id,
        positionAdditional: orderPosition.additional,
        positionComment: orderPosition.comment,
      });
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

      await ordersPositionsLogsServices.create({
        operationType: EOrderPositionLog.CREATE,
        orderId: updatedOrder.id,
        positionId: position.positionId,
        positionAdditional: position.additional?.map((a) => `${a.count}-${a.id}`).join("/") || "",
        positionComment: position.comment,
      });
    }
  }
};

const remove = async (category: { id: number }): Promise<{}> => {
  category.id && (await ordersRepository.removeById(category.id));
  return {};
};

const finish = async (id: string, discount: number): Promise<{}> => {
  await ordersRepository.updateById(
    {
      status: "finished",
      discount: discount.toString(),
    },
    Number(id)
  );

  return {};
};

const getDayReport = async (date: Date): Promise<IDayReportResponse> => {
  const orders = await ordersRepository.findByDate(
    DateTime.fromJSDate(date).toSQLDate() || DateTime.now().toSQLDate()
  );
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

      if (primaryPosition?.name && primaryPosition?.price) {
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

const dayReport = async (stringDate: string): Promise<{}> => {
  const orders = await ordersRepository.findByDate(stringDate);
  const positions = await positionsRepository.findAll();

  const isHaveReportedPositions = (await reportPositionsRepository.findBySpec("create_date", stringDate))
    ?.length;

  if (isHaveReportedPositions) {
    throw new Error("this date is reported");
  }

  let allPositions: any = {};

  for (const o of orders) {
    const orderPositions = await ordersPositionsRepository.findAllByOrderId(o.id);

    for (const op of orderPositions) {
      const primaryPosition = positions.find((p) => Number(p.id) === Number(op.positionId));

      const finistDate = DateTime.fromJSDate(o.finishTime);
      const startDate = DateTime.fromJSDate(o.createTime);
      const diff = finistDate.diff(startDate, ["minutes"]);

      if (primaryPosition?.name && primaryPosition?.price) {
        if (allPositions[primaryPosition.id]) {
          allPositions[primaryPosition.id] = {
            ...allPositions[primaryPosition.id],
            amount: allPositions[primaryPosition.id].amount + 1,
            times: [...allPositions[primaryPosition.id].times, Math.round(Number(diff.toObject().minutes))],
          };
        } else {
          allPositions[primaryPosition.id] = {
            amount: 1,
            title: primaryPosition.name,
            price: primaryPosition.price,
            times: [Math.round(Number(diff.toObject().minutes))],
            isAdditional: false,
          };
        }

        if (op.additional?.length) {
          const additionalPositions = op.additional.split("/");
          additionalPositions.forEach((op: any) => {
            const splitted = op.split("-");
            const additionalPosition = positions.find((p) => Number(p.id) === Number(splitted[1]));

            if (additionalPosition?.price) {
              if (allPositions[additionalPosition.id]) {
                allPositions[additionalPosition.id] = {
                  ...allPositions[additionalPosition.id],
                  amount: allPositions[additionalPosition.id].amount + 1,
                };
              } else {
                allPositions[additionalPosition.id] = {
                  amount: 1,
                  title: additionalPosition.name,
                  price: additionalPosition.price,
                  isAdditional: true,
                };
              }
            }
          });
        }
      }
    }
  }

  for (const key in allPositions) {
    const { price, title, times, amount, isAdditional } = allPositions[key];

    const averageTime = times?.length
      ? Math.round(times.reduce((a: any, b: any) => a + b, 0) / times.length)
      : undefined;
    const minTime = times?.length ? Math.min(...times) : undefined;
    const maxTime = times?.length ? Math.max(...times) : undefined;

    await reportPositionsRepository.create({
      createDate: stringDate,
      title,
      price,
      averageTime,
      maxTime,
      minTime,
      amount,
      isAdditional,
    });
  }

  return {};
};

const getDayPositionsStatic = async (stringDate: string): Promise<any> => {
  const reportedPositions = await reportPositionsRepository.findBySpec("create_date", stringDate);

  const filteredReportedPositions = reportedPositions.filter((p) => !p.isAdditional && !!p.amount);

  const mappedReportedPositions = filteredReportedPositions.map((p) => ({
    title: p.title,
    amount: p.amount,
  }));

  const orderedReportedPositions = mappedReportedPositions.sort(function (a: any, b: any) {
    if (a.amount > b.amount) return -1;
    if (a.amount < b.amount) return 1;
    return 0;
  });

  return orderedReportedPositions;
};

const getPeriodPositionsStatic = async (startStringDate: string, endStringDate: string): Promise<any> => {
  const reportedPositions = await reportPositionsRepository.findByPeriod(startStringDate, endStringDate);

  const filteredReportedPositions = reportedPositions.filter((p) => !p.isAdditional && !!p.amount);

  const mappedReportedPositions = filteredReportedPositions.map((p) => ({
    title: p.title,
    amount: p.amount,
  }));

  const objectReportedPositions = mappedReportedPositions.reduce((acc: any, c: any) => {
    if (!!acc[c.title]?.amount) {
      acc[c.title] = {
        ...acc[c.title],
        amount: acc[c.title].amount + c.amount,
      };
    } else {
      acc[c.title] = {
        ...c,
      };
    }

    return acc;
  }, {});

  const arrayReportedPositions = [];

  for (const key in objectReportedPositions) {
    arrayReportedPositions.push({
      ...objectReportedPositions[key],
    });
  }

  const orderedReportedPositions = arrayReportedPositions.sort(function (a: any, b: any) {
    if (a.amount > b.amount) return -1;
    if (a.amount < b.amount) return 1;
    return 0;
  });

  return orderedReportedPositions;
};

const orderPositionStart = async (orderPositionId: number) => {
  await ordersPositionsRepository.startById(orderPositionId);
};

const orderPositionReady = async (orderPositionId: number) => {
  await ordersPositionsRepository.readyById(orderPositionId);
};

const orderPositionGiven = async (orderPositionId: number): Promise<{}> => {
  const orderPosition = await ordersPositionsRepository.findById(orderPositionId);

  if (!orderPosition.id) {
    return {};
  }

  const updatedOrderPosition = await ordersPositionsRepository.givenById(orderPositionId);

  if (!!orderPosition.finishTime) {
    return {};
  }

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

const orderPositionRestart = async (orderPositionId: number) => {
  await ordersPositionsRepository.restartById(orderPositionId);
};

export default {
  search,
  create,
  update,
  remove,
  finish,
  getDayReport,
  dayReport,
  getDayPositionsStatic,
  getPeriodPositionsStatic,
  orderPositionStart,
  orderPositionReady,
  orderPositionGiven,
  orderPositionRestart,
};
