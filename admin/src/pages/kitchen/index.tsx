import React from "react";
import { format } from "date-fns";
import { grey, teal } from "@mui/material/colors";
import { Box, Button, Chip, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useAppDispatch, useAppSelector } from "app/store";
import { ordersService } from "shared/api";
import {
  backgroundDefault,
  ButtonStyled,
  Item,
  primaryColor,
  textDefaultWhiteColor,
  TextSpan,
  WrapperScrolled,
} from "app/styles";
import {
  KitchenScrollable,
  KitchenTableBlock,
  KitchenTableBlockBody,
  KitchenTableBlockHeader,
} from "./styles";
import { getTimeInSeconds } from "../../shared/utils/timeInFormat";
import { TimeDifference } from "./timeDifference";

export enum EOrderPositionStatuses {
  TO_DO = "to_do",
  COOKING = "cooking",
  READY = "ready",
  FINISHED = "finished",
  ARCHIVED = "archived",
}

const getStatusPriority = (status: EOrderPositionStatuses) => {
  switch (status) {
    case EOrderPositionStatuses.READY:
      return 2;
    case EOrderPositionStatuses.COOKING:
      return 1;
    case EOrderPositionStatuses.FINISHED:
      return 3;
    default:
      return 0;
  }
};

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

    const interval = setInterval(() => {
      dispatch(ordersService.searchOrders());
    }, 30000);

    return () => clearInterval(interval);
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

  const filterByStatus = (status: EOrderPositionStatuses) => {
    const filterValues = filters
      .filter((f) => f.type === "status")
      .map((f) => f.value);

    if (!filterValues.length) {
      return true;
    }

    let count = 0;

    if (
      filterValues.includes("not_ready") &&
      [EOrderPositionStatuses.TO_DO, EOrderPositionStatuses.COOKING].includes(
        status
      )
    ) {
      count++;
    }

    if (
      filterValues.includes("ready") &&
      status === EOrderPositionStatuses.READY
    ) {
      count++;
    }

    if (
      filterValues.includes("finished") &&
      status === EOrderPositionStatuses.FINISHED
    ) {
      count++;
    }

    return !!count;
  };

  const filterByCategory = (orderPositionId: number) => {
    const filterValues = filters
      .filter((f) => f.type === "category")
      .map((f) => f.value);

    if (!filterValues.length) {
      return true;
    }

    const positionByOrderPosition = positionItems.find(
      (p) => Number(p.id) === Number(orderPositionId)
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

  const positionNamesObject: any = React.useMemo(() => {
    const positionNamesObject: any = {};
    positionItems.forEach((position) => {
      positionNamesObject[position.id] = position.name;
    });
    return positionNamesObject;
  }, [positionItems]);

  const orderPositionsByTables = React.useMemo(
    () =>
      tableItems
        .map((table) => ({
          tableName: table.name,
          tableNumber: table.number,
          orderPositions: items
            .filter((order) => order.tableId === table.id)
            .reduce((acc: any[], order) => {
              return acc.concat(
                order.positions?.map((p) => ({
                  id: p.id,
                  positionId: p.positionId,
                  positionName: positionNamesObject[p.positionId],
                  status: p.status,
                  startTime: p.created,
                  positionComment: p.comment,
                  orderComment: order.comment,
                  additional: p.additional
                    ?.split("/")
                    .map((additionalPosition) => ({
                      count: additionalPosition.split("-")[0],
                      name: positionNamesObject[
                        additionalPosition.split("-")[1]
                      ],
                    })),
                }))
              );
            }, [])
            .filter((orderPosition) => filterByStatus(orderPosition.status))
            .filter((orderPosition) =>
              filterByCategory(orderPosition.positionId)
            )
            .sort((a: any, b: any) => {
              const aTime = getTimeInSeconds(a.startTime);
              const bTime = getTimeInSeconds(b.startTime);
              if (aTime < bTime) {
                return -1;
              }
              if (aTime > bTime) {
                return 1;
              }
              return 0;
            })
            .sort((a: any, b: any) => {
              const aStatusPriority = getStatusPriority(a.status);
              const bStatusPriority = getStatusPriority(b.status);
              if (aStatusPriority < bStatusPriority) {
                return -1;
              }
              if (aStatusPriority > bStatusPriority) {
                return 1;
              }
              return 0;
            }),
        }))
        .filter((table) => table.orderPositions?.length),
    [items, tableItems, positionItems, filters]
  );

  const handleClickOrderPositionButton =
    (status: EOrderPositionStatuses, orderPositionId: number) => () => {
      let methodName:
        | "orderPositionGiven"
        | "orderPositionReady"
        | "orderPositionStart"
        | "orderPositionRestart"
        | undefined = undefined;

      switch (status) {
        case EOrderPositionStatuses.READY:
          methodName = "orderPositionGiven";
          break;
        case EOrderPositionStatuses.COOKING:
          methodName = "orderPositionReady";
          break;
        case EOrderPositionStatuses.FINISHED:
          methodName = "orderPositionRestart";
          break;
        case EOrderPositionStatuses.TO_DO:
          methodName = "orderPositionStart";
          break;
        case EOrderPositionStatuses.ARCHIVED:
          methodName = "orderPositionStart";
          break;
      }

      dispatch(ordersService[methodName]({ orderPositionId })).then(() => {
        dispatch(ordersService.searchOrders());
      });
    };

  const getOrderPositionButtonName = (status: EOrderPositionStatuses) => {
    switch (status) {
      case EOrderPositionStatuses.READY:
        return "Given";
      case EOrderPositionStatuses.COOKING:
        return "Ready";
      case EOrderPositionStatuses.FINISHED:
        return "Restart";
      default:
        return "Start";
    }
  };

  const getOrderPositionButtonBackground = (status: EOrderPositionStatuses) => {
    switch (status) {
      case EOrderPositionStatuses.READY:
        return "#ec0d67";
      case EOrderPositionStatuses.COOKING:
        return "#40aa00";
      case EOrderPositionStatuses.FINISHED:
        return "#ee6b19";
      default:
        return "#fad70e";
    }
  };

  const handleClickWrapper = () => {
    document.querySelector("body")?.requestFullscreen();
  };

  return (
    <WrapperScrolled onClick={handleClickWrapper}>
      <Stack direction="row" spacing={1}>
        {allFilters.map((filter) => (
          <Chip
            style={
              filters.map((f) => f.value).includes(filter.value)
                ? {
                    background: primaryColor,
                    borderColor: primaryColor,
                    color: textDefaultWhiteColor,
                  }
                : {
                    background: backgroundDefault,
                    borderColor: grey[700],
                    color: grey[700],
                  }
            }
            label={filter.label}
            onClick={handleChangeFilter(filter)}
            variant="outlined"
          />
        ))}
      </Stack>
      <KitchenScrollable>
        {orderPositionsByTables.map((table, index) => (
          <KitchenTableBlock key={table.tableNumber + index}>
            <KitchenTableBlockHeader>
              №{table.tableNumber}: {table.tableName}
            </KitchenTableBlockHeader>
            <KitchenTableBlockBody>
              {table.orderPositions?.map((orderPosition) => (
                <Item
                  paddingY={15}
                  paddingX={20}
                  bottom={5}
                  key={orderPosition.id}
                >
                  <TextSpan size={14}> {orderPosition.positionName}</TextSpan>
                  {orderPosition?.additional?.map(
                    (additionalPosition: any, index: number) => (
                      <TextSpan
                        top={!index ? 5 : 0}
                        size={14}
                        color={grey[600]}
                      >
                        {additionalPosition.count}x - {additionalPosition.name}
                      </TextSpan>
                    )
                  )}
                  {orderPosition.positionComment && (
                    <TextSpan size={14} top={5} color={grey[600]}>
                      {orderPosition.positionComment}
                    </TextSpan>
                  )}
                  {orderPosition.orderComment && (
                    <TextSpan size={14} top={5} color={grey[600]}>
                      {orderPosition.orderComment}
                    </TextSpan>
                  )}
                  <ButtonStyled
                    top={10}
                    height={40}
                    size={15}
                    onClick={handleClickOrderPositionButton(
                      orderPosition.status,
                      orderPosition.id
                    )}
                    background={getOrderPositionButtonBackground(
                      orderPosition.status
                    )}
                  >
                    {getOrderPositionButtonName(orderPosition.status)}
                    {[
                      EOrderPositionStatuses.TO_DO,
                      EOrderPositionStatuses.COOKING,
                    ].includes(orderPosition.status) && (
                      <TimeDifference
                        key={orderPosition.id}
                        timeInSeconds={getTimeInSeconds(
                          orderPosition.startTime
                        )}
                      />
                    )}
                  </ButtonStyled>
                </Item>
              ))}
            </KitchenTableBlockBody>
          </KitchenTableBlock>
        ))}
      </KitchenScrollable>
    </WrapperScrolled>
  );
};
