import React from "react";
import { ordersService } from "../../services/orders";
import { positionsService } from "../../services/positions";
import { tablesService } from "../../services/tables";
import Loading from "../../shared/loading";
import { useAppDispatch, useAppSelector } from "../../store";
import { format, getMilliseconds } from "date-fns";
import { grey } from "@mui/material/colors";
import { IOrderPosition } from "../../interfaces/orders";
import { Box, Button, Chip, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";

export const Kitchen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading: isLoadingOrders, items } = useAppSelector((s) => s.orders);
  const { isLoading: isLoadingTables, items: tableItems } = useAppSelector((s) => s.tables);
  const { isLoading: isLoadingPositions, items: positionItems } = useAppSelector((s) => s.positions);
  const [filter, setFilter] = React.useState("all");

  React.useEffect(() => {
    dispatch(ordersService.search());
    dispatch(tablesService.search());
    dispatch(positionsService.search());

    const interval = setInterval(() => {
      dispatch(ordersService.search());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    dispatch(ordersService.search());
    dispatch(tablesService.search());
    dispatch(positionsService.search());
  }, []);

  const filters = [
    { label: "All", value: "all" },
    { label: "Not ready", value: "not_ready" },
    { label: "Ready", value: "ready" },
    { label: "Finished", value: "finished" },
    { label: "Drinks and Deserts", value: "drinks_deserts" },
  ];

  const filterByStatus = (op: IOrderPosition, f: string) => {
    if (f === "not_ready") {
      return !op.readyTime && !op.finishTime;
    }

    if (f === "ready") {
      return !!op.readyTime && !!op.startTime && !op.finishTime;
    }

    if (f === "finished") {
      return !!op.finishTime;
    }

    if (f === "drinks_deserts") {
      const position = positionItems.find((p) => Number(p.id) === Number(op.positionId));

      return !!position?.categories?.filter((c) => [2, 3, 4].includes(Number(c.categoryId))).length;
    }

    return true;
  };

  const renderButtonForOrderPosition = (op: IOrderPosition) => {
    if (!op.startTime) {
      return (
        <Button
          fullWidth
          variant="contained"
          style={{ borderRadius: 0 }}
          color="warning"
          onClick={() =>
            dispatch(ordersService.orderPositionStart({ orderPositionId: op.id || 0 })).then(() => {
              dispatch(ordersService.search());
            })
          }
        >
          Start
        </Button>
      );
    }

    if (!!op.startTime && !op.readyTime) {
      return (
        <Button
          fullWidth
          variant="contained"
          style={{ borderRadius: 0 }}
          color="success"
          onClick={() =>
            dispatch(ordersService.orderPositionReady({ orderPositionId: op.id || 0 })).then(() => {
              dispatch(ordersService.search());
            })
          }
        >
          Ready
        </Button>
      );
    }

    if (!!op.readyTime && !op.finishTime) {
      return (
        <Button
          fullWidth
          variant="contained"
          style={{ borderRadius: 0 }}
          color="error"
          onClick={() =>
            dispatch(ordersService.orderPositionGiven({ orderPositionId: op.id || 0 })).then(() => {
              dispatch(ordersService.search());
            })
          }
        >
          Given
        </Button>
      );
    }

    if (!!op.readyTime && !!op.finishTime && !!op.startTime) {
      return (
        <Button
          fullWidth
          variant="contained"
          style={{ borderRadius: 0 }}
          color="warning"
          onClick={() =>
            dispatch(ordersService.orderPositionRestart({ orderPositionId: op.id || 0 })).then(() => {
              dispatch(ordersService.search());
            })
          }
        >
          Restart
        </Button>
      );
    }
  };

  return (
    <Box>
      <Stack direction="row" spacing={1} marginBottom={2}>
        {filters.map(({ label, value }) => (
          <Chip
            label={label}
            variant={filter === value ? "outlined" : undefined}
            onClick={() => setFilter(value)}
          />
        ))}
      </Stack>
      <Loading isLoading={isLoadingOrders || isLoadingTables || isLoadingPositions} />
      <Box display="flex" flexDirection="row" overflow="scroll hidden">
        {items
          .filter(
            ({ ordersPositions }) => ordersPositions?.filter((op) => filterByStatus(op, filter))?.length
          )
          .map((o) => {
            const tableForOrder = tableItems.find((t) => Number(t.id) === Number(o.tableId));
            const createDate = Date.parse(o.createTime);
            const offset = new Date().getTimezoneOffset();
            const dateWithTimeZone = createDate - offset * 60000;
            const date = format(dateWithTimeZone, "H:mm");

            return (
              <Box minWidth={280} marginRight={3}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6" fontWeight={600}>
                    {tableForOrder?.number} table
                  </Typography>
                  <Typography variant="h6">{date}</Typography>
                </Box>
                <Typography variant="body1" marginBottom={2}>
                  {o?.comment || tableForOrder?.name}
                </Typography>
                <Box height="calc(100vh - 220px)" overflow="hidden scroll">
                  {o.ordersPositions
                    ?.filter((op) => filterByStatus(op, filter))
                    .sort((a, b) => {
                      if (a.id && b.id && a.id < b.id) {
                        return 1;
                      }
                      if (a.id && b.id && a.id > b.id) {
                        return -1;
                      }
                      return 0;
                    })
                    .map((op) => {
                      const position = positionItems.find((p) => Number(p.id) === Number(op.positionId));

                      return (
                        <Box
                          style={{ background: grey[50] }}
                          marginBottom={1}
                          borderRadius={2}
                          overflow="hidden"
                        >
                          <Box padding={2}>
                            <Typography variant="body2" fontWeight={600} color={grey[800]}>
                              {position?.name}
                            </Typography>
                            {!!op.additional?.length && (
                              <Box marginTop={1}>
                                <Divider />
                                {op.additional?.split("/").map((opa) => {
                                  const splittedValue = opa.split("-");
                                  const additional = positionItems.find(
                                    (p) => Number(p.id) === Number(splittedValue[1])
                                  );

                                  return (
                                    <Typography
                                      variant="body2"
                                      marginTop={1}
                                      fontWeight={600}
                                      color={grey[800]}
                                    >
                                      {additional?.name} - {splittedValue[0]}
                                    </Typography>
                                  );
                                })}
                              </Box>
                            )}
                            {!!op.comment && (
                              <Box
                                marginTop={1}
                                style={{ background: grey[300] }}
                                paddingLeft={2}
                                paddingRight={2}
                                paddingBottom={1}
                                paddingTop={1}
                                borderRadius={2}
                              >
                                <Typography variant="body2" fontWeight={600} color={grey[800]}>
                                  {op.comment}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                          {renderButtonForOrderPosition(op)}
                        </Box>
                      );
                    })}
                </Box>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};
