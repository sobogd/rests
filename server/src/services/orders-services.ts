import { IDayReportResponse } from "../interfaces/orders";
import ordersPositionsRepository from "../repositories/orders-positions-repository";
import ordersRepository from "../repositories/orders-repository";
import { DateTime } from "luxon";
import positionsRepository from "../repositories/positions-repository";
import reportPositionsRepository from "../repositories/report-positions-repository";

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

    const orderPositions = await ordersPositionsRepository.findAllByOrderId(
      o.id
    );

    for (const op of orderPositions) {
      const primaryPosition = positions.find(
        (p) => Number(p.id) === Number(op.positionId)
      );

      if (primaryPosition?.name && primaryPosition?.price) {
        resultPositions.push(primaryPosition.name);
        total = total + Number(primaryPosition.price);

        if (op.additional?.length) {
          const additionalPositions = op.additional.split("/");
          additionalPositions.forEach((op: any) => {
            const splitted = op.split("-");
            const additionalPosition = positions.find(
              (p) => Number(p.id) === Number(splitted[1])
            );

            if (additionalPosition?.price) {
              resultPositions.push(additionalPosition.name);
              total =
                total + Number(additionalPosition.price) * Number(splitted[0]);
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

  const isHaveReportedPositions = (
    await reportPositionsRepository.findBySpec("create_date", stringDate)
  )?.length;

  if (isHaveReportedPositions) {
    throw new Error("this date is reported");
  }

  let allPositions: any = {};

  for (const o of orders) {
    const orderPositions = await ordersPositionsRepository.findAllByOrderId(
      o.id
    );

    for (const op of orderPositions) {
      const primaryPosition = positions.find(
        (p) => Number(p.id) === Number(op.positionId)
      );

      const finistDate = DateTime.fromJSDate(o.finishTime);
      const startDate = DateTime.fromJSDate(o.createTime);
      const diff = finistDate.diff(startDate, ["minutes"]);

      if (primaryPosition?.name && primaryPosition?.price) {
        if (allPositions[primaryPosition.id]) {
          allPositions[primaryPosition.id] = {
            ...allPositions[primaryPosition.id],
            amount: allPositions[primaryPosition.id].amount + 1,
            times: [
              ...allPositions[primaryPosition.id].times,
              Math.round(Number(diff.toObject().minutes)),
            ],
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
            const additionalPosition = positions.find(
              (p) => Number(p.id) === Number(splitted[1])
            );

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
  const reportedPositions = await reportPositionsRepository.findBySpec(
    "create_date",
    stringDate
  );

  const filteredReportedPositions = reportedPositions.filter(
    (p) => !p.isAdditional && !!p.amount
  );

  const mappedReportedPositions = filteredReportedPositions.map((p) => ({
    title: p.title,
    amount: p.amount,
  }));

  const orderedReportedPositions = mappedReportedPositions.sort(function (
    a: any,
    b: any
  ) {
    if (a.amount > b.amount) return -1;
    if (a.amount < b.amount) return 1;
    return 0;
  });

  return orderedReportedPositions;
};

const getPeriodPositionsStatic = async (
  startStringDate: string,
  endStringDate: string
): Promise<any> => {
  const reportedPositions = await reportPositionsRepository.findByPeriod(
    startStringDate,
    endStringDate
  );

  const filteredReportedPositions = reportedPositions.filter(
    (p) => !p.isAdditional && !!p.amount
  );

  const mappedReportedPositions = filteredReportedPositions.map((p) => ({
    title: p.title,
    amount: p.amount,
  }));

  const objectReportedPositions = mappedReportedPositions.reduce(
    (acc: any, c: any) => {
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
    },
    {}
  );

  const arrayReportedPositions = [];

  for (const key in objectReportedPositions) {
    arrayReportedPositions.push({
      ...objectReportedPositions[key],
    });
  }

  const orderedReportedPositions = arrayReportedPositions.sort(function (
    a: any,
    b: any
  ) {
    if (a.amount > b.amount) return -1;
    if (a.amount < b.amount) return 1;
    return 0;
  });

  return orderedReportedPositions;
};

export default {
  finish,
  getDayReport,
  dayReport,
  getDayPositionsStatic,
  getPeriodPositionsStatic,
};
