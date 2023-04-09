import pool from "../../db";
import { mapCompaniesFromDB } from "../../mappers/comapnies";
import { DateTime } from "luxon";
import { EOrderStatus, IOrder, mapOrdersFromDB } from "../../mappers/orders";
import { EReportType } from "../../controllers/reports";

export const getReport = async (
  startDate: Date,
  endDate: Date,
  type: EReportType,
  companyId: number
): Promise<
  {
    summary: {
      total: number;
      paymentMethodId: number;
    }[];
    ordersCount: number;
    averageReceipt: number;
    date: string;
    totalSummary: number;
  }[]
> => {
  const client = await pool.connect();

  const { rows: companiesDB } = await client.query(
    "SELECT * FROM companies WHERE id = $1",
    [companyId]
  );
  const { utcDiff } = mapCompaniesFromDB(companiesDB)[0];

  let startDateT;
  let endDateT;

  if (utcDiff < 0) {
    startDateT = DateTime.fromJSDate(startDate)
      .toUTC()
      .plus({ hour: utcDiff * -1 });
    endDateT = DateTime.fromJSDate(endDate)
      .toUTC()
      .plus({ day: 1 })
      .plus({ hour: utcDiff * -1 });
  } else if (utcDiff > 0) {
    startDateT = DateTime.fromJSDate(startDate)
      .toUTC()
      .minus({ hour: utcDiff });
    endDateT = DateTime.fromJSDate(endDate)
      .toUTC()
      .plus({ day: 1 })
      .minus({ hour: utcDiff });
  } else {
    startDateT = DateTime.fromJSDate(startDate).toUTC();
    endDateT = DateTime.fromJSDate(endDate).toUTC().plus({ day: 1 });
  }

  startDateT = startDateT.toFormat("yyyy-LL-dd HH:mm:ss");
  endDateT = endDateT.toFormat("yyyy-LL-dd HH:mm:ss");

  const { rows: ordersDB } = await client.query(
    `
    SELECT * FROM orders 
    WHERE created >= timestamp '${startDateT}' AND created <= timestamp '${endDateT}'
    AND status = $1 AND company_id = $2 
    ORDER BY created ASC
  `,
    [EOrderStatus.PAID, companyId]
  );

  const orders = mapOrdersFromDB(ordersDB);

  await client.release();

  if (type === EReportType.DAILY) {
    const daylyObject = orders.reduce((acc: any, c) => {
      let created;

      if (utcDiff < 0) {
        created = DateTime.fromJSDate(c.created as any)
          .toUTC()
          .minus({ hour: utcDiff * -1 });
      } else if (utcDiff > 0) {
        created = DateTime.fromJSDate(c.created as any)
          .toUTC()
          .plus({ hour: utcDiff });
      } else {
        created = DateTime.fromJSDate(c.created as any).toUTC();
      }

      if (!!acc[created.toSQLDate()]?.orders?.length) {
        acc[created.toSQLDate()].orders.push(c);
      } else {
        acc[created.toSQLDate()] = {
          orders: [c],
          date: created.toSQLDate(),
        };
      }
      return acc;
    }, {});

    return Object.values(daylyObject).map((day: any) => {
      const ordersGroupedByPaymentMethod: any = Object.values(
        day.orders.reduce((acc: any, c: IOrder) => {
          if (c.paymentMethodId) {
            if (!!acc[c.paymentMethodId]?.orders?.length) {
              acc[c.paymentMethodId].orders.push(c);
            } else {
              acc[c.paymentMethodId] = {
                paymentMethodId: c.paymentMethodId,
                orders: [c],
              };
            }
          }
          return acc;
        }, {})
      );

      const ordersGroupedByPaymentMethodWithSummary =
        ordersGroupedByPaymentMethod.map((o: any) => {
          const summary = o.orders.reduce((acc: number, c: IOrder) => {
            acc = acc + (c.total || 0);
            return acc;
          }, 0);

          return {
            total: summary,
            paymentMethodId: o.paymentMethodId,
          };
        });

      const ordersCount = day.orders.length;

      const summary = ordersGroupedByPaymentMethodWithSummary.reduce(
        (acc: any, c: any) => {
          acc = acc + (c.total || 0);
          return acc;
        },
        0
      );

      return {
        summary: ordersGroupedByPaymentMethodWithSummary,
        totalSummary: summary,
        ordersCount,
        averageReceipt: Math.round(summary / ordersCount),
        paymentMethod: Math.round(summary / ordersCount),
        date: day.date,
      };
    });
  }

  return [];
};
