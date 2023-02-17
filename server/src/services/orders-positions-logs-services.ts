import { DateTime } from "luxon";
import { IOrderPositionLog } from "../interfaces/orders-positions-logs";
import ordersPositionsLogsRepository from "../repositories/orders-positions-logs-repository";

const create = async (orderPositionLog: IOrderPositionLog): Promise<void> => {
  await ordersPositionsLogsRepository.create({
    ...orderPositionLog,
    operationDate: DateTime.now().toUTC().toSQL(),
  });
};

export default { create };
