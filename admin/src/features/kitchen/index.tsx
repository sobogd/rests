import styled from "@emotion/styled";
import React from "react";
import { ordersService } from "../../services/orders";
import { positionsService } from "../../services/positions";
import { tablesService } from "../../services/tables";
import Loading from "../../shared/loading";
import { useAppDispatch, useAppSelector } from "../../store";
import { format } from "date-fns";
import { grey } from "@mui/material/colors";
import { IOrderPosition } from "../../interfaces/orders";
import { Typography } from "@mui/material";

const KitchenWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: -15px;

  @media (max-width: 550px) {
    flex-direction: column;
    margin: 0;
    width: 100%;
  }
`;

const KitchenBlock = styled.div`
  position: relative;
  margin: 5px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 550px) {
    margin: 0 0 5px;
    width: 100%;
  }
`;

const KitchenBlockHeader = styled.div`
  width: 100%;
  background: #01695c;
  padding: 10px 15px;
`;

const KitchenBlockPosition = styled.div<{ isFinished: boolean }>`
  width: 100%;
  background: ${({ isFinished }) => (!!isFinished ? grey[800] : grey[600])};
  padding: 10px 15px;
  border-bottom: 1px solid ${({ isFinished }) => (!!isFinished ? grey[600] : grey[800])};
  :last-child {
    border: 0;
  }
`;

export const Kitchen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading: isLoadingOrders, items } = useAppSelector((s) => s.orders);
  const { isLoading: isLoadingTables, items: tableItems } = useAppSelector((s) => s.tables);
  const { isLoading: isLoadingPositions, items: positionItems } = useAppSelector((s) => s.positions);

  React.useEffect(() => {
    dispatch(ordersService.search());
    dispatch(tablesService.search());
    dispatch(positionsService.search());

    const interval = setInterval(() => {
      dispatch(ordersService.search());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    dispatch(ordersService.search());
    dispatch(tablesService.search());
    dispatch(positionsService.search());
  }, []);

  const handleClickFood = (orderPosition: IOrderPosition) => () => {
    console.log({ orderPosition });
    dispatch(ordersService.orderPositionFinish({ orderPositionId: orderPosition.id || 0 })).then(() => {
      dispatch(ordersService.search());
    });
  };

  return (
    <KitchenWrapper>
      <Loading isLoading={isLoadingOrders || isLoadingTables || isLoadingPositions} />
      {items.map((o) => {
        const tableForOrder = tableItems.find((t) => Number(t.id) === Number(o.tableId));
        const createDate = Date.parse(o.createTime);
        const offset = new Date().getTimezoneOffset();
        const dateWithTimeZone = createDate - offset * 60000;
        const date = format(dateWithTimeZone, "H:mm");

        return (
          <KitchenBlock>
            <KitchenBlockHeader>
              <Typography variant="body2" fontWeight={600}>
                {tableForOrder?.number} table from {date}
              </Typography>
              {o?.comment ||
                (tableForOrder?.name && (
                  <Typography variant="body2">
                    {o?.comment ? <p>{o?.comment}</p> : <p>{tableForOrder?.name}</p>}
                  </Typography>
                ))}
            </KitchenBlockHeader>

            {o.ordersPositions?.map((op) => {
              const position = positionItems.find((p) => Number(p.id) === Number(op.positionId));

              return (
                <KitchenBlockPosition isFinished={!!op.finishTime} onClick={handleClickFood(op)}>
                  <Typography variant="body2" color={!!op.finishTime ? grey[500] : grey[50]}>
                    {position?.name}
                  </Typography>

                  {!!op.additional?.length &&
                    op.additional?.split("/").map((opa) => {
                      const splittedValue = opa.split("-");
                      const additional = positionItems.find((p) => Number(p.id) === Number(splittedValue[1]));

                      return (
                        <Typography
                          variant="body2"
                          paddingLeft={2}
                          color={!!op.finishTime ? grey[500] : grey[50]}
                        >
                          {additional?.name} - {splittedValue[0]}
                        </Typography>
                      );
                    })}

                  {!!op.comment && (
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      color={!!op.finishTime ? grey[500] : grey[50]}
                    >
                      {op.comment}
                    </Typography>
                  )}
                </KitchenBlockPosition>
              );
            })}
          </KitchenBlock>
        );
      })}
    </KitchenWrapper>
  );
};
