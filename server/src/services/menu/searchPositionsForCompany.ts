import pool from "../../db";
import { ECategoryStatus, mapCategoriesFromDB } from "../../mappers/categories";
import { IMenu, IMenuResponse, mapMenuFromDB } from "../../mappers/menu";
import { EPositionStatuses } from "../../mappers/positions";

export const searchPositionsForCompany = async (companyId: number) => {
  const client = await pool.connect();

  const { rows: menuDB } = await client.query(
    `
    SELECT p.id as "position_id", p.name as "position_name", p.price as "price", cc.currency_symbol as "symbol", c.id as "category_id", c.name as "category_name" FROM positions p 
        LEFT JOIN positions_categories pc ON pc.position_id = p.id 
        LEFT JOIN categories c ON c.id = pc.category_id 
        LEFT JOIN companies cc ON cc.id = p.company_id 
        WHERE p.status = $1 AND p.company_id = $2 AND p.is_additional = false AND pc.category_id IS NOT NULL AND p.price <> '0' AND p.price <> ''
        ORDER BY p.sort ASC
  `,
    [EPositionStatuses.ACTIVE, companyId]
  );

  const menu = mapMenuFromDB(menuDB);

  const menuGroupedByCategory: IMenuResponse[] = Object.values(
    menu.reduce((acc: any, c: IMenu) => {
      if (acc[c.categoryId]?.positions?.length) {
        acc[c.categoryId].positions.push({
          id: c.positionId,
          name: c.positionName,
          price: c.price + " " + c.symbol,
        });
      } else {
        acc[c.categoryId] = {
          id: c.categoryId,
          name: c.categoryName,
          positions: [
            {
              id: c.positionId,
              name: c.positionName,
              price: c.price + " " + c.symbol,
            },
          ],
        };
      }
      return acc;
    }, {})
  );

  await client.release();

  return menuGroupedByCategory;
};
