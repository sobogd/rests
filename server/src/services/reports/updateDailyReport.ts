import pool from "../../db";
import { mapCompaniesFromDB } from "../../mappers/comapnies";
import { DateTime } from "luxon";

export const roundFive = (a: any) => {
  var b = a % 5;
  b && (a = a - b + 5);

  return a;
};

export const updateDailyReport = async (date: Date, companyId: number) => {
  const client = await pool.connect();

  // получаем последнюю даут когда есть отчет

  // если ничего не найдено
  // ищем самый первый заказ по этой компании
  // делаем выборку всех заказов
  // делим заказы по дням
  // считаем каждый день и отдельно добавляем в БД

  // если найден последний отчет
  // берем дату когда он найден и обновляем ее
  // делаем выборку всех заказов больше чем эта дата
  // делим заказы по дням
  // считаем каждый день и отдельно добавляем в БД

  // есть 2023-04-08
  // считаем заказы, где дата меньше равна 2023-04-08

  // const { rows: companies } = await client.query(
  //   "SELECT utc_diff FROM companies WHERE id = $1",
  //   [companyId]
  // );
  //
  // const { utcDiff } = mapCompaniesFromDB(companies)[0];
  // //
  // // const clientDate = new Date(date);
  // // const utcClientDate = DateTime.now().toJSDate();
  //
  // const top = DateTime.fromJSDate(date)
  //   .minus({ hour: utcDiff * -1 })
  //   .toJSDate();
  //
  // console.log(top);

  const { rows: positions } = await client.query(
    "select * from positions order by id asc"
  );

  const { rows: orderPositions } = await client.query(
    "select * from orders_positions where status <> 'archived' order by id asc"
  );

  const { rows: orders } = await client.query(
    "select * from orders where status <> 'archived' and total is null order by id asc"
  );

  const ordersEnrichedWithPositions = orders.map((o) => {
    let total = 0;

    const positionsForOrder = orderPositions
      .filter((op) => Number(op.order_id) === o.id)
      .map((op) => {
        const generalPosition = positions.find(
          (p) => p.id === Number(op.position_id)
        );

        if (!!op?.additional) {
          const additional = op.additional.split("/").map((ad: any) => {
            const additionalPosition = positions.find(
              (p) => p.id === Number(ad.split("-")[1])
            );

            total = total + Number(additionalPosition?.price || 0);

            return {
              price: Number(additionalPosition?.price || 0),
              name: additionalPosition?.name,
              count: Number(ad.split("-")[0]),
            };
          });

          total = total + Number(generalPosition?.price || 0);

          return [
            ...additional,
            {
              price: Number(generalPosition?.price || 0),
              name: generalPosition?.name,
              count: 1,
            },
          ];
        } else {
          total = total + Number(generalPosition?.price || 0);

          return [
            {
              price: Number(generalPosition?.price || 0),
              name: generalPosition?.name,
              count: 1,
            },
          ];
        }
      });

    if (o.discount > 0) {
      total = roundFive(total * 0.9);
    }

    return {
      id: o.id,
      total,
    };
  });

  for (const ordersEnrichedWithPosition of ordersEnrichedWithPositions) {
    if (
      ordersEnrichedWithPosition.id >= 999 &&
      ordersEnrichedWithPosition.id <= 1500
    ) {
      await client.query("update orders set total = $2 where id = $1", [
        ordersEnrichedWithPosition.id,
        ordersEnrichedWithPosition.total,
      ]);
      console.log(ordersEnrichedWithPosition.id);
    }
  }

  await client.release();
};
