import React from "react";
import { format } from "date-fns";
import { grey, teal } from "@mui/material/colors";
import { Box, Button, Chip, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useAppDispatch, useAppSelector } from "app/store";
import {
  categoriesService,
  ordersService,
  searchPositions,
  tablesService,
} from "shared/api";
import { IOrderPosition } from "entities/orders/model";

export const Kitchen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.orders);
  const { items: tableItems } = useAppSelector((s) => s.tables);
  const { items: positionItems } = useAppSelector((s) => s.positions);
  const { items: categoryItems } = useAppSelector((s) => s.categories);
  const [filters, setFilters] = React.useState<
    { label: string; value: string; type: string }[]
  >([]);

  React.useEffect(() => {
    dispatch(ordersService.searchOrders());
    dispatch(tablesService.searchTables());
    dispatch(searchPositions());
    dispatch(categoriesService.searchCategories());

    const interval = setInterval(() => {
      dispatch(ordersService.searchOrders());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    dispatch(ordersService.searchOrders());
    dispatch(tablesService.searchTables());
    dispatch(searchPositions());
  }, []);

  const allFilters = [
    { label: "Not ready", value: "not_ready", type: "status" },
    { label: "Ready", value: "ready", type: "status" },
    { label: "Finished", value: "finished", type: "status" },
    ...categoryItems.map((i) => ({
      label: i.name,
      value: i.id.toString(),
      type: "category",
    })),
  ];

  const filterByStatus = (op: IOrderPosition) => {
    const filterValues = filters
      .filter((f) => f.type === "status")
      .map((f) => f.value);

    if (!filterValues.length) {
      return true;
    }

    let count = 0;

    if (filterValues.includes("not_ready") && !op.readyTime && !op.finishTime) {
      count++;
    }

    if (
      filterValues.includes("ready") &&
      !!op.readyTime &&
      !!op.startTime &&
      !op.finishTime
    ) {
      count++;
    }

    if (filterValues.includes("finished") && !!op.finishTime) {
      count++;
    }

    return !!count;
  };

  const filterByCategory = (op: IOrderPosition) => {
    const filterValues = filters
      .filter((f) => f.type === "category")
      .map((f) => f.value);

    if (!filterValues.length) {
      return true;
    }

    const positionByOrderPosition = positionItems.find(
      (p) => Number(p.id) === Number(op.positionId)
    );
    const categoryIdsByOrderPosition = positionByOrderPosition?.categories.map(
      (c) => c.categoryId
    );

    let count = 0;

    categoryIdsByOrderPosition?.forEach((c) => {
      if (filterValues.includes(c)) {
        count++;
      }
    });

    return !!count;
  };

  const handleChangeFilter = (filter: any) => () => {
    if (filters.map((f) => f.value).includes(filter.value)) {
      setFilters(filters.filter((f) => f.value !== filter.value));
    } else {
      setFilters([...filters, filter]);
    }
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
            dispatch(
              ordersService.orderPositionStart({ orderPositionId: op.id || 0 })
            ).then(() => {
              dispatch(ordersService.searchOrders());
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
            dispatch(
              ordersService.orderPositionReady({ orderPositionId: op.id || 0 })
            ).then(() => {
              dispatch(ordersService.searchOrders());
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
            dispatch(
              ordersService.orderPositionGiven({ orderPositionId: op.id || 0 })
            ).then(() => {
              dispatch(ordersService.searchOrders());
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
            dispatch(
              ordersService.orderPositionRestart({
                orderPositionId: op.id || 0,
              })
            ).then(() => {
              dispatch(ordersService.searchOrders());
            })
          }
        >
          Restart
        </Button>
      );
    }
  };

  return (
    <>
      <Stack direction="row" spacing={1} marginBottom={2}>
        {allFilters.map((filter) => (
          <Chip
            style={
              filters.map((f) => f.value).includes(filter.value)
                ? { background: teal[500], borderColor: teal[500] }
                : undefined
            }
            label={filter.label}
            onClick={handleChangeFilter(filter)}
            variant="outlined"
          />
        ))}
      </Stack>
      <Box display="flex" flexDirection="row" overflow="scroll hidden">
        {items
          .filter(({ ordersPositions }) =>
            filters.length
              ? ordersPositions?.filter((op) => filterByStatus(op))?.length
              : true
          )
          .filter(({ ordersPositions }) =>
            filters.length
              ? ordersPositions?.filter((op) => filterByCategory(op))?.length
              : true
          )
          .sort((a, b) => (a.id && b.id && a.id < b.id ? -1 : 1))
          .map((o) => {
            const tableForOrder = tableItems.find(
              (t) => Number(t.id) === Number(o.tableId)
            );
            const createDate = Date.parse(o.createTime);
            const offset = new Date().getTimezoneOffset();
            const dateWithTimeZone = createDate - offset * 60000;
            const date = format(dateWithTimeZone, "H:mm");

            return (
              <Box minWidth={280} marginRight={2}>
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
                    ?.filter((op) =>
                      filters.length ? filterByStatus(op) : true
                    )
                    .filter((op) =>
                      filters.length ? filterByCategory(op) : true
                    )
                    .sort((a, b) => (a.id && b.id && a.id < b.id ? 1 : -1))
                    .map((op) => {
                      const position = positionItems.find(
                        (p) => Number(p.id) === Number(op.positionId)
                      );

                      return (
                        <Box
                          style={{ background: grey[50] }}
                          marginBottom={1}
                          borderRadius={2}
                          overflow="hidden"
                        >
                          <Box padding={2}>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              color={grey[800]}
                            >
                              {position?.name}
                            </Typography>
                            {!!op.additional?.length && (
                              <Box marginTop={1}>
                                <Divider />
                                {op.additional?.split("/").map((opa) => {
                                  const splittedValue = opa.split("-");
                                  const additional = positionItems.find(
                                    (p) =>
                                      Number(p.id) === Number(splittedValue[1])
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
                                <Typography
                                  variant="body2"
                                  fontWeight={600}
                                  color={grey[800]}
                                >
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
    </>
  );
};
